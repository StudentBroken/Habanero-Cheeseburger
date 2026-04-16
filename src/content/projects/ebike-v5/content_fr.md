# Vélo Électrique (v5)

Construit à 16 ans, octobre 2025. Chaque build précédent avait une variation des mêmes problèmes fondamentaux : cellules bon marché avec une résistance interne inconnue, bypass du BMS comme contournement d'un mauvais chargeur, ruban adhésif et mousse en guise de gestion thermique, et chemins de bandes de nickel tracés à l'œil. Le v5 a été construit pour fermer tous ces problèmes en même temps.

## Sourcing des Cellules : Recycler le Pack v4

Les cellules venaient du pack v4 — les mêmes 18650 qui avaient tourné sous le hack série/parallèle en 12S. J'ai retiré le ruban adhésif, la mousse et les deux BMS de l'ancien pack, puis désassemblé les cellules une par une.

## Planification du Layout en TinkerCAD

Avant de toucher la soudeuse par points, j'ai modélisé le layout complet des cellules dans TinkerCAD. La configuration 20S6P — 120 cellules, 20 groupes en série, 6 en parallèle — a été divisée en deux moitiés 10S6P pour la maniabilité physique. L'outil de couleur de TinkerCAD m'a permis d'assigner une couleur distincte à chaque groupe série, rendant la séquence de soudage non ambiguë et éliminant le système sharpie-sur-ruban du v4.

![Modèle TinkerCAD du layout des cellules codé par couleur](/projects/ebike-v5/the-tinkercad-model-where-i-organised-the-cells-adni-was-easily-able-to-sort-them-by-colour-using-tinkercad-coloring-tool.webp)
*Layout TinkerCAD — chaque couleur est un groupe série. Utilisé pour planifier la séquence de soudage avant de toucher les cellules.*

## Layout des Bandes de Nickel & Densité de Courant

C'était la deuxième fois que j'utilisais CAD pour planifier les chemins de bandes de nickel, et la première fois que j'ai calculé explicitement la densité de courant. Les builds précédents utilisaient des bandes de nickel choisies à l'intuition. Ici j'ai calculé la section transversale requise pour conduire le courant de crête attendu sans que les bandes se comportent comme des fusibles.

Les deux moitiés 10S6P ont été connectées entre elles avec du fil silicone 12AWG plutôt qu'un long passage de bande de nickel. Les connexions inter-packs en bande de nickel longue ont une résistance plus élevée et sont mécaniquement fragiles ; le 12AWG est plus faible en résistance, dimensionné pour le courant, et flexible.

![Câblage inter-packs en 12AWG](/projects/ebike-v5/wirering-the-positive-side-of-one-half-where-the-battery-pack-is-basically-2x-12s-bstteries-in-series-but-pernemantly-and-connected-together-with-12awg-wires-instead-of-long-fragile-strips-of-nickel-strips.webp)
*Connexions inter-packs en fil silicone 12AWG — résistance plus faible et robustesse mécanique.*

## Gestion Thermique

Les builds précédents enveloppaient le pack de mousse. La mousse est un isolant — elle piège la chaleur générée par les cellules pendant la décharge. Le v5 n'utilise que du ruban noir, sans mousse. Les cellules peuvent dissiper la chaleur directement à travers l'enroulement vers l'air.

## BMS & Charge : Fin du Hack

Le contournement série/parallèle du v4 existait parce que le chargeur ne gérait que le 6S. Le v5 tourne en 20S — 72V nominal, 84V peak — qu'aucun chargeur 6S ne peut gérer quelle que soit la topologie.

J'ai acheté un BMS Daly passif 40A homologué 72V et un chargeur 72V 2A correspondant. Le BMS gère correctement la coupure de charge et la protection contre les surintensités. Le connecteur de bypass de décharge a enfin disparu — la cote 40A continus du Daly est suffisante pour le tirage du moteur dans le moyeu sans contourner la protection.

Balance leads sur un pack 72V sont sous tension potentiellement mortelle sur toute la chaîne. J'ai porté des gants adaptés mais assez fins pour conserver le retour tactile pour souder les fils fins des nappes d'équilibrage.

## La Réalisation sur la Résistance Interne

Chaque build précédent avait le même symptôme : chute de tension sous charge, mauvaise accélération en pointe, cellules qui lisent plein au repos mais meurent rapidement sous tirage. Le diagnostic était toujours « mauvaises cellules » sans comprendre précisément pourquoi.

Le v5 est là où la résistance interne a cliqué. La tension d'une cellule au repos indique son état de charge. La tension d'une cellule sous charge indique sa résistance interne — la différence entre la tension au repos et la tension en charge, divisée par le courant, donne directement la RI. Les cellules à RI élevée chutent fortement sous courant. Elles peuvent être complètement chargées et livrer quand même de mauvaises performances parce qu'elles dissipent l'énergie en chaleur interne plutôt que de l'émettre en courant.

Les cellules recyclées du v4 avaient un écart de RI mesurable. Certaines étaient saines ; d'autres non. À 6P par groupe, les cellules à RI élevée tirent vers le bas leurs voisines parallèles et limitent la capacité en courant de tout le groupe. Comprendre ça a directement guidé la sélection des cellules pour les packs futurs — la tension est juste l'état de charge, la RI est la vraie métrique de qualité.

De plus, le v5 a mis en évidence le caractère amateur de mes premières méthodes d'isolation. Appliquer du ruban adhésif (duct tape) directement sur le pack batterie sans couche intermédiaire est une mauvaise pratique. Le duct tape n'a pas de couche résistante à la température et a tendance à se dégrader sous les cycles de chaleur d'une batterie à fort courant. Passer au ruban Kapton — le standard de l'industrie pour la résistance électrique et thermique — est devenu une exigence obligatoire pour tous les builds futurs.

## Nomenclature (BOM)

| Composant | Coût |
|---|---|
| BMS Daly 40A 72V | ~45,00 $ CAD |
| Chargeur 72V 2A | ~35,00 $ CAD |
| Bandes de nickel + fil 12AWG | ~20,00 $ CAD |
| Ruban noir + quincaillerie | ~10,00 $ CAD |
| Cellules (recyclées du v4) | — |
| Moteur + VESC (venu du v4) | — |
| **Total nouvelles dépenses** | **~110,00 $ CAD** |
