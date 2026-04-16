# Vélo Électrique (v6)

Construit à 17 ans, c'est l'état actuel de la série. Après cinq itérations à gérer des cellules recyclées, des déformations physiques des supports et le hack de charge série/parallèle, le v6 est une transition vers une exécution de qualité professionnelle. Les 100 cellules sont neuves, le support est une conception monocoque continue, et chaque composant a été validé par des tests 4 fils avant l'assemblage.

## Sélection & Validation des Cellules

Le pack utilise 100x cellules EVE 33V Grade-A (3200mAh nominal) en configuration 20S5P. Contrairement aux builds précédents où la "santé des cellules" était estimée à l'usage, le v6 a utilisé un processus d'admission rigoureux :

1.  **Test de Capacité** : Chaque groupe a été échantillonné et testé pour sa capacité à 21°C. Une décharge de 1A de 4,15V à 2,95V a mesuré une moyenne de 3165mAh.
2.  **Appairage RI** : J'ai utilisé un testeur de résistance interne AC 4 fils dédié. Chaque cellule a été mesurée à 3,495V. La dispersion du pack était de 29mΩ ±1mΩ avec un écart de tension de ±0,006V. Ce niveau d'appairage est pratiquement une erreur de arrondi, garantissant que le pack reste parfaitement équilibré sous forte charge.

## Ingénierie Mécanique & Monocoque PETG

Le support de batterie est une conception monocoque en une seule pièce imprimée en PETG sur une Ender 5 Plus modifiée sous Klipper. Le passage au PETG était obligatoire ; le v4 et le v5 ont prouvé que le PLA est trop fragile pour des composants structurels de véhicule. Le PETG offre la résistance aux chocs et la tolérance thermique nécessaires pour une masse de 100 cellules se déchargeant à des taux élevés.

![Support de batterie monocoque PETG avec cellules](/projects/ebike-v6/the-battery-pack-all-sorted-and-aligned-in-the-petg-holder-with-painter-tape-covering-both-sides-temporarily.webp)
*Support monocoque PETG — alignement 20S5P. Le PETG a été choisi pour sa résistance aux chocs supérieure au PLA.*

## Architecture Électrique & Calcul de Charge

Le système est conçu pour une puissance de crête de 2500W. Même en poussant l'ESC à 100A lors de fortes accélérations, les cellules n'atteignent que 60 à 85 % de leur taux de décharge continu maximum. Concevoir avec cette marge assure la longévité et prévient les risques d'emballement thermique vus dans les v1-v3.

Pour les bandes de nickel, je suis passé de tailles « estimées » à des calculs explicites. J'ai utilisé des bandes de nickel pur de 8mm x 0,2mm, qui ont une section transversale de 1,6mm² et une capacité nominale de 14A en continu. Chaque pont série (de la cathode du groupe A à l'anode du groupe B) utilise au moins trois de ces ponts, offrant une section totale de 4,8mm² et une capacité de 40–45A en continu. Avec une consommation de pointe réaliste de ~35A, les interconnexions fonctionnent bien en dessous de leurs limites thermiques.

J'ai également tenu compte de la longueur du trajet et des contraintes mécaniques :
- **Compensation RI** : Les connexions à longue portée ont utilisé des doubles bandes de nickel pour minimiser la chute de tension et la résistance interne.
- **Soulagement des Contraintes** : J'ai ajouté une légère marge de mou (slack) dans les ponts de nickel pour compenser la dilatation thermique et les vibrations du cadre, évitant ainsi la rupture des soudures par points avec le temps.

Pour le laçage et la découpe, j'ai utilisé un stencil personnalisé pour m'assurer que chaque pièce soit identique, maintenant une densité de courant uniforme sur tout le pack.

## Isolation & Sécurité

La stratégie d'isolation est multicouche :
-   **Primaire** : Ruban Kapton pour l'isolation électrique haute température.
-   **Secondaire** : Ruban en fibre de verre multiaxial pour le renforcement structurel et une résistance accrue à la perforation.
-   **Final** : Le pack est logé dans une coque rigide en PETG.

## Post-Mortem (État Actuel)

Le v6 est le premier build où je n'attends pas qu'une pièce spécifique lâche. La transmission est silencieuse, la batterie ne chute pas sous une charge complète de 2500W, et le vélo atteint une vitesse de pointe de 65 km/h. L'appairage de la résistance interne signifie que le BMS n'a presque aucun travail à faire lors de l'équilibrage.

La leçon des 5 dernières années est simple : on ne peut pas compenser des matériaux de mauvaise qualité par de l'ingénierie. Recycler des cellules et utiliser des équerres est bien pour apprendre comment les choses échouent, mais la fiabilité de niveau professionnel exige des cellules neuves, une validation 4 fils et des matériaux comme le PETG qui sont réellement adaptés à l'application.

## Nomenclature (BOM)

| Composant | Coût |
|---|---|
| 100x cellules EVE 33V Grade-A | ~450,00 $ CAD |
| BMS Daly 72V 40A (même que v5) | ~45,00 $ CAD |
| Filament PETG (support monocoque) | ~10,00 $ CAD |
| Kapton + Fibre de verre + Nickel | ~10,00 $ CAD |
| **Total** | **~515,00 $ CAD** |
