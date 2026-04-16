# Vélo Électrique (v4)

Construit à 16 ans, début d'année. L'expérience mid-drive du v3 a été abandonnée — le saut de chaîne, la déformation des équerres et la re-tension constante le rendaient impraticable. Le v4 est passé à un moteur dans le moyeu de 2000W, le plus grand investissement en composant unique de la série à 300$, et a monté la tension à 12S pour pousser la vitesse maximale vers 50 km/h.

## Montage de la Roue

Les moteurs dans le moyeu sont livrés sans jante — on les lace soi-même. Je n'avais jamais fait ça. J'ai appris le laçage de roue de zéro en moins d'une journée avec une jante de 26 pouces, avec quelques tentatives ratées avant d'obtenir une tension de rayon uniforme, et je l'ai trué à la main. Le process est entièrement manuel : schématiser les rayons, les passer dans le flasque, tensionner, vérifier le dish, recommencer.

## Batterie : Le Hack Série/Parallèle

Je n'avais qu'un chargeur LiPo 6S. Le moteur avait besoin de 12S. La solution : construire deux packs 6S identiques et basculer entre les topologies selon le mode :

- **Rouler** : Les deux packs câblés en série — 12S, 44,4V nominal, 50,4V peak.
- **Charger** : Les mêmes deux packs câblés en parallèle — effectivement un seul pack 6S que mon chargeur existant pouvait gérer.

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

## Post-Mortem

Vitesse de pointe autour de 50 km/h en 12S. Le moteur dans le moyeu était une amélioration massive par rapport aux systèmes friction et mid-drive — silencieux, direct, pas de chaîne à entretenir, pas de glissement sous charge. Le laçage de la roue était une vraie compétence acquise et utilisée immédiatement.

Le hack série/parallèle fonctionnait mais demandait une charge cognitive pour fonctionner en sécurité. Le court-circuit qui a détruit les deux BMS a prouvé que tout système nécessitant que l'opérateur maintienne manuellement un invariant de sécurité finira par échouer. L'étiquette remove-before-flight était un palliatif, pas une solution.

La chute de tension sous forte accélération était perceptible. Les cellules n'étaient pas à fort taux de décharge et la résistance interne du pack limitait la délivrance de courant crête.

Le PLA pour les supports structurels est une question réglée. Il cède sous vibration et impact. Plus jamais.

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
