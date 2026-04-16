# Système de Suivi de Tête pour DJI O3 Air Unit

Ce projet est un système de suivi de tête à deux axes bâti pour les DJI Goggles 3 et l'O3 Air Unit. Deux ESP32-C3 communiquent via ESP-NOW — un sur les lunettes qui lit l'orientation de la tête, et un sur le drone qui pilote les servos.

Le design mécanique a été esquissé pendant un examen de maths. Le prof n'était pas content.

## Matériel

Le gimbal est conçu sur mesure et imprimé en 3D. Il utilise deux micro-servos pour déplacer la caméra vers le haut, le bas, la gauche et la droite. Il peut fonctionner avec presque n'importe quelle batterie de drone (2S à 6S) grâce à un régulateur de puissance intégré.

![Mécanisme à 2 axes terminé](/projects/head-tracking-dji-o3/close-up.webp)
*Le gimbal terminé avec la caméra DJI O3 montée.*

- **Sur les lunettes** : Un ESP32 et un capteur gyro pour suivre les mouvements de votre tête.
- **Sur le drone** : Un ESP32 et deux servos pour déplacer la caméra.

![Test sur banc et assemblage](/projects/head-tracking-dji-o3/close-up-table.webp)
*Test des servos et de l'électronique sur l'établi avant le montage.*


## Liste des Composants (BOM)

L'O3 Air Unit DJI n'est pas inclus — il est partagé avec les builds de drones FPV.

| Composant | Coût |
|---|---|
| ESP32-C3 Super Mini × 2 | 2.00 $ |
| Module gyro/accéléromètre MPU6050 | 3.00 $ |
| Micro-servos × 2 (pan + tilt) | 5.00 $ |
| Buck converter à découpage | 1.00 $ |
| Petit ventilateur de refroidissement | 2.00 $ |
| Pièces imprimées en 3D (PLA) | 3.00 $ |
| Divers (fils, connecteurs, visserie) | 1.00 $ |
| **Total** | **17.00 $** |

## Firmware du Transmetteur

L'ESP32 côté lunettes utilise le DMP (Digital Motion Processor) intégré du MPU6050 pour calculer les angles yaw/pitch/roll à partir de quaternions, ce qui évite la dérive qui vient de l'intégration des données brutes du gyroscope. Au démarrage, il exécute une routine d'auto-calibration : il collecte 200 paquets DMP au repos et fait la moyenne du yaw et du pitch pour calculer des offsets, ce qui permet au gimbal de se centrer automatiquement peu importe la position des lunettes à l'allumage.

Seulement le yaw et le pitch sont transmis — le roll est ignoré puisque le gimbal n'a pas d'axe de roll. Chaque paquet est une structure `secure_message` qui transporte les deux angles, un numéro de séquence incrémentiel et un *checksum*. Le receveur utilise les deux pour rejeter les paquets dupliqués, hors séquence ou corrompus.

## Firmware du Receveur

L'ESP32 côté drone reçoit les paquets ESP-NOW, valide le *checksum* et le numéro de séquence, puis mappe les angles en largeurs d'impulsion servo. Le yaw mappe vers ±90° de *pan*, le pitch mappe vers ±45° de *tilt*. Une zone morte d'entrée de 0.5° empêche les servos de chasser autour du centre quand la tête est immobile.

Le mouvement des servos est lissé avec un filtre exponentiel (α = 0.07), ce qui élimine les à-coups qui viennent des paliers d'angles discrets et rend le mouvement du gimbal proportionnel à la vitesse de mouvement de la tête. Si aucun paquet valide n'arrive pendant 1.5 seconde, les servos retournent automatiquement au centre — ce qui fait qu'une perte de lien ne laisse pas la caméra pointer vers le sol.

Le receveur pilote les servos directement sans passer par le contrôleur de vol ni le protocole MSP, ce qui garde le chemin de contrôle court et la latence basse.

## Dérive du Gyroscope & Calibration

Le plus gros défi était la "dérive". Tous les gyroscopes ont tendance à dériver avec le temps, ce qui fait que la caméra bouge lentement même si vous gardez la tête immobile. Pour corriger cela, j'utilise un processeur de mouvement qui combine les données du gyro avec un accéléromètre. L'accéléromètre utilise la gravité comme référence fixe pour garder le gimbal centré.

J'ai aussi ajouté une étape de calibration qui s'exécute à chaque démarrage. Elle mesure la position de repos de vos lunettes pour que la caméra commence toujours parfaitement centrée.
