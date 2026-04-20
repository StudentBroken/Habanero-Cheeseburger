## Aperçu
SafeReps est un écosystème de coaching à double flux qui comble le fossé entre le suivi d'une vidéo d'entraînement et la présence d'un entraîneur personnel dans la pièce. En fusionnant la vision par ordinateur sur téléphone avec un capteur portable haute fidélité, SafeReps garantit que chaque répétition est sûre, efficace et comptée avec précision.

Lorsque vous vous entraînez seul à la maison, vous vous entraînez "à l'aveugle". Les vidéos d'entraînement ne peuvent pas vous voir, et les applications statiques ne peuvent pas corriger votre forme. SafeReps résout cela en construisant un **Jumeau Numérique** de votre performance.

Il détecte la physique "invisible" d'une répétition — tremblements musculaires et triche par élan — qu'aucune caméra ne peut capter seule. Dès que votre forme se dégrade, l'entraîneur vocal IA intervient immédiatement pour vous corriger en pleine série.

## Caractéristiques Clés
- **Fusion de Capteurs à Double Flux** : Fusionne les points de repère de vision à 30 FPS avec les données IMU haute fidélité à 100Hz.
- **Détection de Fatigue Invisible** : Capture les tremblements neuromusculaires avant que vous ne les ressentiez pour prévenir les blessures.
- **Détection de Triche** : Distingue la contraction musculaire propre du balancement basé sur l'élan.
- **Entraîneur Vocal IA** : Retour audio hiérarchisé qui fournit des corrections exactement au moment où elles se produisent.
- **Auto-étalonnage T-Pose** : Routine d'une seconde qui aligne le capteur portable sur votre géométrie de membre spécifique.

## Architecture Matérielle
SafeReps est conçu pour une accessibilité extrême. Le prototype coûte moins de 5 $ en composants, prouvant que le matériel de niveau professionnel ne doit pas être un produit de luxe.

- **ESP32-C3** : Logique et connectivité Bluetooth.
- **MPU6050** : Unité de mesure inertielle à 6 axes.
- **LiPo 400mAh** : Alimentation portable pour plus de 12 heures d'entraînement actif.
- **Module USB-C** : Recharge intégrée.

## Intelligence Centrale
### 1. La Machine à États de Répétition
SafeReps gère une machine à états finis (FSM) pour chaque série afin de s'assurer que le mouvement est anatomiquement complet. Les transitions sont déclenchées par les angles articulaires franchissant des seuils étalonnés.

### 2. DSP Haute Vitesse
Le capteur portable ESP32-C3 effectue un traitement numérique du signal (DSP) en temps réel avant que les données n'atteignent l'application :
- **Analyse des Tremblements** : Un filtre passe-haut de 100Hz isole le vacillement neuromusculaire du mouvement intentionnel.
- **Détection de Triche** : Calcule le rapport entre la vitesse angulaire et l'accélération linéaire pour détecter les balancements basés sur l'élan.

### 3. Étalonnage T-Pose
La précision commence par l'alignement. SafeReps nécessite une T-Pose d'une seconde avant chaque série. Cela permet la **Mise à Zéro du Capteur** et l'**Alignement de Scaption** (correction de l'inclinaison de montage).
