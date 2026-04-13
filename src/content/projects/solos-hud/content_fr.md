# Interface Électro-Optique : Redesign du Solos HUD

## Vue d'Ensemble du Projet

L'objectif était l'ingénierie inverse complète et le redesign structurel d'une plateforme HUD grand public. Le projet a progressé de l'analyse de protocole bas niveau au démontage physique agressif et à la fabrication d'un boîtier optique custom haute densité.

## Phase 1 : Rétro-Ingénierie du Protocole

La phase de recherche initiale s'est concentrée sur l'extraction et l'analyse de la couche de communication propriétaire entre le Solos HUD et son application compagnon.

- **Méthodologie** : Analyse statique de l'APK extrait et *sniffing* Bluetooth GATT en temps réel.
- **Résultat** : Mapping réussi des services HID du périphérique et découverte de UUIDs de caractéristiques non-standard pour la transmission de données d'affichage brutes.
- **Logique d'Application** : Développement d'une suite logicielle custom facilitant le parsing de notifications en temps réel, la visualisation de télémétrie GPS et la récolte de données VESC pour les systèmes de propulsion électrique.

## Phase 2 : Refonte Matérielle & Chirurgie Câble Flex

L'objectif secondaire était la réduction radicale de l'empreinte volumétrique de la plateforme. Le boîtier OEM moulé par injection a été mis hors service, et les composants internes — incluant le PCB logique principal, les assemblages flex et le prisme de guide d'ondes optique — ont été extraits.

Pour atteindre le facteur de forme désiré, des modifications drastiques au routage interne ont été nécessaires. Le câble flex principal reliant les temples gauche et droit a été sectionné manuellement pour réduire sa longueur de moitié. Cela a été exécuté sous grossissement microscopique en utilisant des coupe-précision pour s'assurer que les traces internes du PCB flex multi-couches n'étaient pas court-circuitées. Le bord brut du flex sectionné a été ensuite scellé avec de la résine UV pour prévenir le délaminage.

La section de ce câble a inévitablement déconnecté la thermistance NTC de la batterie OEM et le chemin de charge, nécessitant une architecture d'alimentation entièrement custom.

## Compromis d'Ingénierie & Optimisation du Système

Pour atteindre les cibles de réduction de masse et de longévité du système, plusieurs modifications matérielles intentionnelles ont été exécutées. Le poids total du système a été réduit de 65g à 53g (une diminution de 18.5%).

- **Stockage & Gestion d'Énergie** : La batterie originale de 160mAh — légèrement gonflée suite à une surcharge d'une unité de 8 ans dans un vieux magasin tech — a été remplacée par une cellule lithium-polymère salvagée de 380mAh, délivrant une augmentation de capacité de 137.5%. Un module micro USB-C a été câblé pour contourner le chemin d'alimentation original, avec le BMS intégré de la nouvelle cellule pour la sécurité.
- **Suppression du Sous-Système Acoustique** : Pour atteindre les cibles d'épaisseur agressives, les haut-parleurs intégrés ont été entièrement retirés. La fonctionnalité audio a été maintenue via un setup auxiliaire externe plug-and-play.
- **Boîtier Optique** : Un boîtier uni-face custom a été modélisé en PETG en utilisant des techniques de scan-to-CAD 2D pour un alignement précis des composants. Le redesign priorisait la capacité "fold-flat" et les interfaces de montage universelles pour des montures de lunettes bon marché.

## Analyse des Coûts (BOM)

- **Solos HUD (Unité Donneuse)** : 25 $ CAD
- **Boîtier PETG Custom** : ~3 $ CAD
- **Montures de Lunettes (AliExpress)** : 5 $ CAD
- **Contrôleur de Charge (Module Micro USB-C)** : 1 $ CAD
- **Alimentation (Li-Po 380mAh avec BMS)** : Gratuit (pièce récupérée)

**Coût Total du Système** : ~34 $ CAD

## Évaluation Opérationnelle

Le Solos HUD redesigné a validé avec succès la faisabilité de réutiliser l'électro-optique grand public pour des applications modulaires haute portabilité. La suite logicielle custom a démontré l'efficacité de la télémétrie directe VESC-vers-HUD, créant un moniteur de propulsion en temps réel hautement capable à une fraction du coût des alternatives commerciales.
