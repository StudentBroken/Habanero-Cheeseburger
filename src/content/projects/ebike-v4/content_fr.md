## Construction de la Roue

Pour cette version, je suis passé à un système de "moteur dans le moyeu" (hub motor). Cela signifie que le moteur fait partie intégrante de la roue arrière. Comme j'ai acheté le moteur seul, j'ai dû apprendre à le "lacer" dans une jante à l'aide de rayons métalliques.

![Laçage du moteur](/projects/ebike-v4/lacing-my-own-2000w-hub-motor-using-a-26-inch-rim-by-myself-all-learning-from-scratch-how-to-lace-a-wheel-in-under-a-day-with-couple-failed-attempts.webp)
*Apprentissage du laçage d'une roue. Il a fallu une journée entière et plusieurs essais pour obtenir la bonne tension.*

C'était un processus lent et frustrant, mais finalement, j'ai obtenu une roue de 2000W fonctionnelle qui pouvait propulser le vélo beaucoup plus vite.

## Le "Hack" de la Double Batterie

J'ai construit deux packs de batterie 22V (6S) séparés. Pour rouler, je les branchais ensemble en "série" pour obtenir 44V (12S). Pour charger, je les débranchais et les branchais en "parallèle" afin de pouvoir utiliser un chargeur 22V moins cher.

![Vélo v4 terminé](/projects/ebike-v4/the-finished-battle-tested-ebike-with-better-support-and-a-remove-before-flifht-after-i-have-accidentally-shorted-the-bms-twice-and-i-conformal-coated-the-bms-to-be-water-resistant.webp)
*Remarquez l'étiquette "Remove Before Flight" — je l'ai ajoutée après qu'une erreur de câblage ait presque causé un incendie pendant la charge.*

Un jour, j'ai accidentellement branché les batteries dans le mauvais sens et j'ai vu de vraies étincelles. J'ai détruit deux cartes de sécurité (BMS) avant d'apprendre à être plus prudent.


Cela nécessitait une étape de commutation manuelle entre les modes. Chaque pack avait son propre BMS à 6$ pour la protection de charge. Pour la décharge, j'ai utilisé le bypass du v2 : un deuxième connecteur de sortie qui court-circuite le BMS entièrement pour que le courant complet atteigne le VESC sans restriction.

J'ai utilisé un Sharpie sur du ruban de peintre vert pour schématiser les connexions des cellules avant de souder par points — un système qui a bien fonctionné pour garder la trace de la topologie série/parallèle pendant la séquence de soudage.

![Soudage par points avec schéma au sharpie sur le ruban de peintre](/projects/ebike-v4/spot-welded-the-first-series-i-used-a-sharpie-to-draw-the-connections-i-was-supposed-to-make-on-green-painters-tape.webp)
*Sharpie sur ruban de peintre — schéma de câblage dessiné directement sur le pack avant soudage.*

## Le Court-Circuit

J'ai branché le connecteur de charge parallèle alors que la clé de série était encore connectée. Ça a créé un court-circuit franc sur les deux BMS simultanément — assez de courant pour les détruire tous les deux instantanément. Deux BMS à 6$, détruits en une erreur.

La cause racine est un problème de logique : les états série et parallèle sont mutuellement exclusifs, mais il n'y avait pas de contrainte physique pour l'imposer. Les deux connecteurs étaient accessibles en même temps. Pour le v5, un interlock serait nécessaire — soit un détrompeur mécanique, soit un relais qui déconnecte physiquement le série avant que le chargement parallèle soit possible.

Après avoir remplacé les BMS, j'ai appliqué un revêtement conforme sur les deux cartes pour la résistance à l'eau et j'ai ajouté une étiquette "remove before flight" sur le connecteur de clé série pour ne pas pouvoir le rater avant de brancher le chargeur.

## Supports 3D Imprimés

J'ai imprimé des itérations de test de tolérance du support de batterie avant de valider la pièce finale. Le support a tenu mécaniquement mais le PLA est fragile — il a fissuré sous les vibrations et les impacts avec le temps. Ce build a confirmé définitivement que le PLA est le mauvais matériau pour tout composant structurel sur un véhicule. PETG ou ASA pour tout ce qui prend des charges ou des vibrations ; PLA uniquement pour les supports statiques.

## Boîtier VESC

Le VESC a commencé dans un sac souple fixé au cadre. J'ai ensuite conçu et imprimé un couvercle avec des passages d'air pour le garder plus frais sous charge soutenue.

## Conclusion

Ce vélo était très rapide mais le système de charge était trop compliqué. Chaque fois que je voulais charger, je devais manipuler de nombreux fils. C'était une excellente expérience d'apprentissage, mais cela a prouvé que j'avais besoin d'un meilleur moyen de gérer les batteries haute tension.


## Nomenclature (BOM)

| Composant | Coût |
|---|---|
| Moteur dans le moyeu 2000W | ~300,00 $ CAD |
| Jante 26 pouces (pour le laçage) | ~30,00 $ CAD |
| Cellules 18650 | ~50,00 $ CAD |
| 2× BMS (détruits + remplacés) | ~24,00 $ CAD |
| VESC (venu du v3) | — |
| Filament 3D + divers | ~15,00 $ CAD |
| **Total nouvelles dépenses** | **~419,00 $ CAD** |
