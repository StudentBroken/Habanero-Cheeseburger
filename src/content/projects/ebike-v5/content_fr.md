Pour cette version, j'ai décidé de corriger une fois pour toutes le système de charge "dangereux". Je suis passé à un système haute tension de 72V (20S) et j'ai acheté un **BMS Daly** professionnel et un vrai chargeur. Plus besoin de brancher et débrancher des fils juste pour charger le vélo.

## Planification du Pack

Avec 120 cellules à organiser, j'ai utilisé **TinkerCAD** pour planifier la disposition. Cela m'a permis de coder les groupes par couleur et de m'assurer que chaque cellule s'intégrait parfaitement dans le cadre.

![Planification de batterie TinkerCAD](/projects/ebike-v5/the-tinkercad-model-where-i-organised-the-cells-adni-was-easily-able-to-sort-them-by-colour-using-tinkercad-coloring-tool.webp)
*J'ai utilisé différentes couleurs pour chaque groupe de cellules afin d'éviter les erreurs lors de l'assemblage.*

![Build v5 terminé](/projects/ebike-v5/the-finished-v5-looks-like-a-pretty-good-looking-bike.webp)
*Le build final est beaucoup plus propre que les versions précédentes. C'est une machine fiable et puissante.*


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

## Leçons Apprises

C'est lors de ce build que j'ai enfin compris la **Résistance Interne (RI)**. J'ai réalisé que la santé d'une batterie n'est pas seulement liée à l'énergie qu'elle peut stocker, mais à la facilité avec laquelle elle peut la libérer. Si une cellule a une RI élevée, elle chauffe et perd de la puissance.

J'ai aussi appris que les habitudes "amateur" comme l'utilisation de ruban adhésif (duct tape) étaient de mauvaises pratiques. Je suis passé au **ruban Kapton**, qui est le standard de l'industrie car il résiste à la chaleur et ne laisse pas de résidus collants.


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
