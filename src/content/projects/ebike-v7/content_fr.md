# Vélo électrique (v7)

La v7 est la version la plus équilibrée de mon vélo électrique : une motorisation modeste de 350 W qui me laisse encore pédaler, avec plus de contrôle, une allure plus discrète, une bonne autonomie et un moteur qui s'enlève en environ trois minutes. Avec la batterie sur le vélo, il pèse 16 kg; avec la batterie dans un sac à dos, le vélo lui-même pèse 12,3 kg. L'autonomie estimée est d'environ 60 km.

![Vélo de route avec le moteur amovible détaché](/projects/ebike-v7/complete-bike.webp)
*Un vélo qui a l'air ordinaire une fois le moteur retiré*

## Architecture du système

La v6 était axée sur la vitesse. Elle poussait environ 2 200 W en continu, atteignait environ 76 km/h en pointe et roulait à 55–65 km/h. À 28 kg, elle était lourde, difficile à pédaler et assez voyante. La v7 troque cette puissance extrême pour un système de 350 W qui donne un coup de main au pédalage. Elle est plus lente, plus légère, plus facile à contrôler et plus pratique au quotidien. Son autonomie estimée de 60 km est plus courte que les quelque 80 km de la v6, mais le vélo est beaucoup plus agréable à utiliser.

Le module moteur s'enlève en environ trois minutes. Quatre vis et deux écrous à oreilles retiennent le support, alors je peux retirer le moteur sans laisser le vélo avec l'air d'un vélo électrique à temps plein. La batterie peut être dans le cadre ou dans un sac à dos. Le montage sur le cadre est plus pratique, mais je préfère l'allure plus simple du vélo quand je transporte la batterie séparément.

![Vélo avec la batterie transportée à part](/projects/ebike-v7/backpack-battery.webp)
*Avec la batterie dans le sac à dos, le vélo pèse 12,3 kg*

![Vélo avec la batterie dans la sacoche de cadre](/projects/ebike-v7/frame-battery.webp)
*La batterie peut aussi être installée sur le cadre*

## Électricité et micrologiciel

Après le vol de la v6, j'ai réutilisé la batterie de la v5. Je l'ai reconfigurée de 72 V à 48 V, remodelée pour ce montage et équipée d'un BMS de 15 A. La batterie pèse 3,7 kg. La réutiliser m'a évité d'en fabriquer une nouvelle et son coût était donc nul.

J'ai aussi remplacé le gros boîtier d'origine du chargeur par un boîtier compact et facile à transporter. Les deux options de montage de la batterie permettent d'adapter le vélo aux déplacements : je peux mettre la batterie dans mon sac à dos pour garder le vélo plus léger, ou l'installer sur le cadre.

### Gâchette et enregistrement des trajets

La gâchette est un curseur maison à effet Hall. Les gâchettes et commandes au pouce commerciales que j'ai essayées ne convenaient pas à un guidon de vélo de route : elles forçaient mon poignet ou mon pouce dans une position inconfortable. Une tige de métal glisse dans le boîtier imprimé, avec de la graisse mécanique pour que le mouvement soit fluide. Le curseur me permet de choisir une puissance jusqu'aux 350 W du vélo et de changer la position de ma main en roulant. Il reste à la position choisie au lieu de revenir automatiquement à zéro, donc le moteur peut continuer à pousser si je retire ma main.

Ce comportement augmente le risque en cas de chute. Quand la batterie est dans le sac à dos, j'utilise une longe attachée à une ceinture à la taille. En cas d'éjection, elle est censée tirer sur le connecteur de la batterie et couper l'alimentation. J'ai testé le débranchement plusieurs fois en sautant du vélo et en tirant fort sur la longe, sous différents angles; le connecteur s'est débranché pendant ces essais. Ça ne garantit pas qu'il se débranchera dans toutes les vraies chutes, et la longe peut elle-même s'accrocher. Je la considère comme une mesure secondaire, pas comme une garantie de sécurité. Le fichier STL du curseur est disponible ci-dessous.

Un pont BLE ESP32-C3 enregistre les données de trajet du VESC. Le logiciel est basé sur [VescBLEBridge](https://github.com/StudentBroken/VescBLEBridge); le contrôleur et l'électronique ont été testés ensemble avant l'installation.

![Contrôleur, batterie et électronique pendant les essais](/projects/ebike-v7/ride-logging-test.webp)
*Le contrôleur, la batterie et l'électronique sur l'établi*

## Conception mécanique et fabrication

J'ai conçu le support moteur pour qu'il soit remplaçable avec un tournevis : quatre vis et deux écrous à oreilles suffisent pour retirer et réinstaller l'ensemble. Comme ça, si le support casse, je peux le remplacer plutôt que de refaire toute la motorisation.

L'[assemblage complet du moteur et de son support de vélo est disponible dans Onshape](https://cad.onshape.com/documents/43a36b803df7f960ccbf3225/w/f83945b127c58a7edd1f96e2/e/9a1b8c6414a9327d8c2855df?renderMode=0&uiState=6ad95942a941be13c57fe6f1).

![Vue Onshape de l'assemblage du moteur amovible et de son support](/projects/ebike-v7/motor-mount-assembly.webp)
*Assemblage CAO du support moteur*

![La première version du support moteur après sa défaillance](/projects/ebike-v7/failed-motor-mount.webp)
*La section qui a cassé sur le premier support*

![Installation de l'ensemble moteur amovible sur le vélo](/projects/ebike-v7/motor-mount-install.webp)
*Le moteur peut être détaché du vélo*

## Validation et analyse des défaillances

Le premier support moteur a cassé après un impact dans un nid-de-poule. J'ai épaissi ses parois et adouci la transition vers la structure en nid d'abeille. Le support révisé a tenu un mois d'utilisation intensive sans casser.

La conception CAO a pris environ 2 jours, puis la construction a pris 2 autres jours — 4 jours en tout.

## Matériel et coûts

| Composant | Coût |
|---|---:|
| VESC 75100 | 60,00 $ CAD |
| Batterie réutilisée | 0,00 $ CAD |
| Gâchette à effet Hall | 5,00 $ CAD |
| Vis, fils et connecteurs | 20,00 $ CAD |
| Chargeur | 15,00 $ CAD |
| Impression 3D | 6,70 $ CAD |
| **Total** | **106,70 $ CAD** |

![Gâchette coulissante à effet Hall](/projects/ebike-v7/throttle.webp)
*La gâchette coulissante à effet Hall installée sur le guidon*
