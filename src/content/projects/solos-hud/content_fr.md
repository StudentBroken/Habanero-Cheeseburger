# Interface Électro-Optique : Redesign du Solos HUD

## Aperçu du Projet
L'objectif était la rétro-ingénierie complète et la refonte structurelle d'une plateforme d'affichage tête haute (HUD) grand public. Le projet a progressé de l'analyse protocolaire de bas niveau au démontage physique agressif et à la fabrication d'un boîtier optique personnalisé à haute densité.

## Rétro-ingénierie

J'ai commencé par comprendre comment le Solos HUD communique avec son application d'origine. J'ai analysé le code de l'application Android et utilisé le Bluetooth pour trouver le format exact des messages envoyés à l'écran.

![Interface de l'application compagnon](/projects/solos-hud/20260308_222410.webp)
*J'ai écrit une application personnalisée pour envoyer la vitesse et l'état de la batterie en temps réel au HUD.*

Une fois que j'ai compris le fonctionnement de l'affichage, j'ai écrit mon propre logiciel. Mon application personnalisée lit la vitesse et la puissance en direct de mon skateboard électrique et les envoie aux lunettes.

## Modification du Matériel

Je voulais que le HUD s'adapte à des lunettes normales, alors je l'ai complètement démonté. J'ai extrait la carte de circuit principal et le prisme optique du boîtier d'origine encombrant.

Pour le rendre encore plus petit, j'ai dû couper le câble plat qui reliait les deux côtés. J'ai utilisé un microscope et des pinces de précision pour le faire en toute sécurité, puis j'ai tout scellé avec de la résine UV.

![Installation des composants dans le nouveau boîtier](/projects/solos-hud/20260321_233341.webp)
*Installation de l'électronique extraite dans le nouveau boîtier compact imprimé en 3D.*


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
