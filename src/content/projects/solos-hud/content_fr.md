# Interface Électro-Optique : Redesign du Solos HUD

## Aperçu du Projet
L'objectif était la rétro-ingénierie complète et la refonte structurelle d'une plateforme d'affichage tête haute (HUD) grand public. Le projet a progressé de l'analyse protocolaire de bas niveau au démontage physique agressif et à la fabrication d'un boîtier optique personnalisé à haute densité.

## Phase 1 : Rétro-ingénierie du Protocole
La phase de recherche initiale s'est concentrée sur l'extraction et l'analyse de la couche de communication propriétaire entre le Solos HUD et son application compagnon.

- **Méthodologie** : Analyse statique de l'APK extrait et écoute (sniffing) GATT Bluetooth en temps réel.
- **Résultat** : Cartographie réussie des services HID du périphérique et découverte d'UUID de caractéristiques non standard pour la transmission de données d'affichage brutes.
- **Logique Applicative** : Développement d'une suite logicielle personnalisée facilitant l'analyse des notifications en temps réel, la visualisation de la télémétrie GPS et la récolte de données VESC (Variable Electronic Speed Controller) pour les systèmes de propulsion électrique.

## Phase 2 : Refonte du Matériel & Chirurgie de Nappe
L'objectif secondaire était la réduction radicale de l'empreinte volumétrique de la plateforme. Le boîtier d'origine moulé par injection a été mis hors service, et les composants internes — y compris le PCB de logique principale, les assemblages de nappes et le prisme du guide d'ondes optique — ont été extraits.

Pour atteindre le format souhaité, des modifications drastiques du routage interne ont été nécessaires. Le câble flexible principal reliant les branches gauche et droite a été sectionné manuellement pour réduire sa longueur de moitié. Cela a été exécuté sous grossissement microscopique à l'aide de pinces de précision pour s'assurer que les pistes internes du PCB flexible multicouche ne soient pas court-circuitées pendant la coupe. Le bord brut de la nappe sectionnée a ensuite été scellé avec de la résine UV pour empêcher la délamination ou les infiltrations environnementales.

Le sectionnement de ce câble a inévitablement déconnecté la thermistance NTC de la batterie d'origine et le circuit de charge, nécessitant une architecture d'alimentation complètement personnalisée.

## Compromis d'Ingénierie & Optimisation du Système
Pour atteindre les objectifs de réduction de masse et de longévité du système, plusieurs modifications matérielles intentionnelles ont été exécutées. Le poids total du système a été réduit avec succès de 65g à 53g (une diminution de 18,5 %).

- **Stockage & Gestion de l'Énergie** : La batterie d'origine de 160mAh — qui était légèrement gonflée en raison d'une décharge excessive après être restée dans une unité donneuse de 8 ans — a été remplacée par une cellule lithium-polymère de 380mAh récupérée, offrant une augmentation massive de 137,5 % de la capacité. Comme les circuits de charge d'origine et la NTC ont été désactivés lors de la chirurgie de la nappe, un module micro-USB-C autonome a été câblé pour contourner le chemin d'alimentation d'origine. La nouvelle cellule utilise son propre BMS intégré pour la sécurité.
- **Suppression du Sous-système Acoustique** : Pour atteindre des objectifs d'épaisseur agressifs, les haut-parleurs intégrés ont été entièrement retirés, transformant la plateforme principale en un nœud exclusivement visuel. La fonctionnalité audio a été maintenue via une configuration auxiliaire externe prête à l'emploi.
- **Boîtier Optique** : Un boîtier personnalisé à un seul côté a été modélisé en PETG en utilisant des techniques de scan-2D-vers-CAD pour un alignement précis des composants. Le redesign a privilégié la capacité de repli à plat et des interfaces de montage universelles pour des montures de lunettes bon marché du commerce.

## Nomenclature (BOM) & Analyse des Coûts
Le redesign a privilégié une efficacité extrême des coûts, s'appuyant fortement sur du matériel récupéré et des micro-composants.

- **Solos HUD (Unité Donneuse)** : 25 $ CAD
- **Boîtier PETG Personnalisé (élec. incluse)** : ~3 $ CAD
- **Montures de Lunettes de Base (AliExpress)** : 5 $ CAD
- **Contrôleur de Charge (Module Micro USB-C)** : 1 $ CAD
- **Alimentation (Li-Po 380mAh avec BMS)** : Gratuit (récupération)

**Coût Total du Système** : ~34 $ CAD

## Évaluation Opérationnelle
Le Solos HUD redessiné a validé avec succès la faisabilité de la réutilisation de composants électro-optiques grand public pour des applications modulaires et hautement portables. L'ossature logicielle personnalisée a démontré l'efficacité de la télémétrie directe VESC-vers-HUD, créant un moniteur de propulsion en temps réel hautement performant pour une fraction du coût des alternatives commerciales.
