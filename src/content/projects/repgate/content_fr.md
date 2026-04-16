# RepGate — Exercice contre Temps d'Écran

RepGate est une application de contrôle parental multiplateforme développée en Flutter. Le principe est simple : un enfant complète une séance d'exercice vérifiée, et l'application déverrouille un certain temps d'écran. Les parents configurent les règles — type d'exercice, durée, ratio de crédit — et RepGate les applique via les API natives du système sur les deux plateformes. En développement actif depuis novembre 2025, l'application est actuellement en attente d'approbation de l'App Store Apple.

## Vérification de l'Exercice

Le flux de séance d'exercice utilise la détection de pose de ML Kit pour confirmer que l'enfant bouge vraiment. Chaque image est passée dans le modèle de points de repère de pose ; les répétitions sont comptées en suivant les angles articulaires entre les images — un squat est enregistré quand l'angle hanche-genou descend sous un seuil et remonte, un push-up par la flexion du coude, un burpee en séquençant les phases sol et debout. L'inférence ML tourne entièrement sur l'appareil ; aucune vidéo, image ou donnée biométrique ne quitte l'appareil pendant la détection de pose.

Pour prévenir la triche, l'application capture un snapshot d'exercice à un moment aléatoire pendant chaque série et stocke un frame compressé avec le compte de répétitions. Les parents peuvent consulter les snapshots dans le Coach Dashboard pour vérifier que la séance était légitime. Le snapshot est traité localement avant l'envoi — seule une image basse résolution est transmise, pas le flux vidéo complet.

L'application supporte aussi l'intégration Strava. Les utilisateurs avec un compte Strava connecté peuvent importer des activités complétées directement, et le backend valide l'horodatage, la durée et le type de l'activité avant d'émettre des crédits. Les deux chemins — détection en direct et importation Strava — écrivent dans le même schéma de snapshot dans Firestore, donc le calcul de crédit est identique dans les deux cas.

L'application supporte aussi le Grease the Groove : de courtes mini-séances fréquentes réparties dans la journée plutôt qu'un long bloc. Un Coach peut les programmer à intervalles fixes, et chaque mini-séance attribue un crédit partiel qui s'accumule vers un déverrouillage du temps d'écran.

## Intégration Native du Temps d'Écran

L'application du temps d'écran nécessite d'accéder à des API propres à chaque plateforme que Flutter ne peut pas atteindre seul. Le côté iOS est la partie la plus techniquement complexe de tout le projet — j'ai esquissé l'architecture complète au dos d'une feuille d'examen en plein milieu d'un exam, parce que je n'arrivais pas à m'arrêter de travailler sur comment les pièces devaient s'assembler.

Il y a deux processus séparés qui doivent coopérer. L'application Flutter RepGate parle à une couche Swift native via un method channel. L'extension DeviceActivityMonitor est un processus sandboxé Apple distinct que l'OS lance indépendamment et qui continue de tourner même quand l'application principale est tuée. Ils partagent l'état exclusivement via `UserDefaults(suiteName: "group.com.isnotabot.repgate")` — un conteneur App Group que les deux côtés peuvent lire et écrire.

### Trois Modes de Blocage

Les applications ne sont débloquées que quand trois flags indépendants sont tous à faux. Ils s'empilent :

- **Limite d'utilisation** (`isBlockActive`) — activé par l'extension et ScreenTimeManager quand le crédit de temps gagné est épuisé.
- **Mode nuit** (`isSleepBlocked`) — activé par l'extension quand un horaire de nuit se déclenche.
- **Strict calendrier** (`isStrictBlocked` / `calendarStrictConfig`) — se déclenche pour des activités planifiées (course, natation, vélo). La couleur du shield varie selon le type d'activité : Cramoisi, Océan ou Forêt.
- **Strict tâche** (`isStrictBlocked` / `strictActivityLabel`) — se déclenche quand un Coach assigne une tâche à distance. Couleur du shield : Violet profond.

La raison d'avoir trois flags séparés plutôt qu'un seul est que chaque mode a un déclencheur différent et un propriétaire différent. Si le mode nuit s'active pendant que l'enfant a encore des crédits, les crédits restent dans la banque — ils ne sont pas consommés. Quand la fenêtre de nuit se termine, l'extension efface `isSleepBlocked`, vérifie si les deux autres flags sont aussi à faux, et seulement alors retire les shields.

### La Banque et l'Échelle

L'API DeviceActivity suit l'utilisation cumulative des applications dans une fenêtre de planification journalière — elle n'a pas de notion de compte à rebours. Pour en construire un, je découpe les sessions en blocs de 30 minutes, chacun avec des événements de seuil par minute. Quand un bloc expire, l'extension se réveille, vérifie le solde de la banque, et planifie le bloc suivant sans que l'application principale tourne.

Quand un enfant gagne du temps — disons 90 minutes après une séance de push-ups — Dart appelle `addToBankBalance(5400)`, qui écrit `next_session_bank = 5400` dans les UserDefaults partagés. Quand `startMonitoring` est appelé, ScreenTimeManager vérifie si le total dépasse 30 minutes. Si c'est le cas, il programme le premier chunk de 30 minutes et écrit les 60 minutes restantes dans `next_session_bank`. Les shields sont retirés et l'enfant peut utiliser les applications librement.

À l'intérieur de chaque chunk de 30 minutes, le système enregistre un événement DeviceActivity par minute : `min_1` à 60 secondes, `min_2` à 120 secondes, jusqu'à `final_rung` à 1800 secondes. À chaque minute, l'extension se réveille, met à jour `currentSessionDuration` dans le conteneur partagé (pour que le compte à rebours de l'UI reste précis), et envoie des notifications d'avertissement à 10, 5 et 1 minute restante.

Quand `final_rung` se déclenche, l'extension vérifie la banque. S'il reste du temps, elle programme immédiatement le prochain chunk de 30 minutes et retire les shields — sans besoin du processus de l'application. Si la banque est vide, elle applique les shields via ManagedSettingsStore, met `isBlockActive = true`, et envoie une notification "Temps écoulé". Quand l'enfant fait un nouvel exercice, `extendCurrentSession()` crédite de nouvelles secondes et redémarre l'échelle depuis la position actuelle.

![Esquisse d'architecture dessinée au dos d'une feuille d'examen, 19 décembre](/projects/repgate/repgate-exam-sketch.webp)
*Le flux complet de communication entre extensions, esquissé au dos d'une feuille d'examen de mi-session — 19 décembre, juste après l'examen.*

### Mode Nuit

Le mode nuit tourne sur un DeviceActivitySchedule complètement séparé (`repgate.sleep`) sans échelle par minute — juste `intervalDidStart` et `intervalDidEnd`. Quand la nuit commence, l'extension met `isSleepBlocked = true` et applique les shields. Le matin, elle met `isSleepBlocked = false` et lève les shields si aucun des deux autres flags n'est actif. Les deux se déclenchent sans que l'application tourne.

Sur Android, le temps d'écran est suivi via UsageStats. L'application lit le temps au premier plan par application depuis le système et le compare avec le solde de crédits. Quand le temps est épuisé, l'application se ramène au premier plan avec un écran de blocage. C'est une intégration moins fluide que le chemin iOS — Android ne donne pas aux applications tierces l'équivalent de FamilyControls — mais elle fonctionne sans propriété de l'appareil ni MDM.

Au-delà des crédits par séance, les Coaches peuvent configurer des horaires de nuit (une fenêtre nocturne où toutes les applications restreintes sont verrouillées peu importe les crédits) et bannir définitivement certaines applications.

## Équipes : Modes Famille et Pairs

RepGate supporte deux structures d'équipe. En mode Famille, un parent est le Coach et un ou plusieurs enfants sont des Players. Le Coach définit toutes les règles — quelles applications sont restreintes, combien de reps déverrouillent combien de temps, les horaires de nuit — et surveille l'activité via le tableau de bord. Les Players ne peuvent pas modifier leurs propres règles.

Le mode Pairs supprime la hiérarchie. Tous les membres sont égaux : n'importe qui peut fixer un objectif commun, et tout le monde est responsable devant le groupe. Conçu pour les groupes d'amis ou les collègues qui veulent une responsabilité mutuelle plutôt qu'un contrôle parental. Le leaderboard en mode Pairs est compétitif, classant les membres par répétitions totales complétées.

## Backend

Le backend tourne entièrement sur Firebase. Les collections Firestore de premier niveau sont `users`, `families`, `pairing_codes` et `strava_tokens`. Les ledgers de crédits et l'historique des séances vivent dans des sous-collections sous chaque document utilisateur. Les familles lient un compte parent à un ou plusieurs comptes enfants.

Il y a 30 Cloud Functions qui gèrent : la validation des séances, l'émission de crédits, l'ingestion des webhooks Strava, le traitement des webhooks RevenueCat, les remises à zéro quotidiennes programmées, la suppression de données conformes COPPA, et un flux d'invitation familiale. Les fonctions qui touchent des données financières ou sensibles tournent avec un scoping IAM plus strict que les autres.

## Abonnements

La monétisation passe par RevenueCat avec deux produits : `pro_repgate` (abonnement famille unique) et `family_repgate` (plan famille étendu). Les webhooks RevenueCat atteignent une Cloud Function qui met à jour l'enregistrement d'entitlement de l'utilisateur dans Firestore. L'application lit l'état d'entitlement au démarrage et bloque les fonctionnalités en conséquence — le support multi-enfants, l'importation Strava et la planification avancée sont derrière le paywall.

## Conformité

Parce que RepGate traite des données d'enfants de moins de 13 ans, la COPPA s'applique. L'application passe les comptes enfants par un flux de consentement parental avant toute collecte de données. Le schéma Firestore garde les données enfants sous le document famille, et la fonction de suppression efface tous les enregistrements enfants quand un parent supprime le compte. Les demandes de suppression RGPD suivent le même chemin. La politique de confidentialité et les conditions d'utilisation ont été rédigées pour refléter exactement quelles données sont collectées, où elles vont, et combien de temps elles sont conservées.

L'application est localisée en quatre langues : anglais, français, espagnol et chinois simplifié.

## Statut

En avril 2026, l'application est en révision App Store. La version Android est fonctionnelle et en test interne. La structure légale et fiscale est finalisée en parallèle. repgate.app est en ligne avec une liste d'attente et un formulaire d'accès anticipé.
