# Vélo Électrique (v6)

À 17 ans, j'ai construit ce vélo pour qu'il soit la version parfaite de tous mes builds précédents. Au lieu d'utiliser de vieilles cellules recyclées, j'ai acheté 100 cellules **EVE 33V** neuves. J'ai testé chacune d'entre elles pour m'assurer qu'elles étaient toutes identiques en termes de santé et de puissance.

![Cellules de batterie neuves](/projects/ebike-v6/the-box-the-brand-new-cells-came-in-100-to-be-exact.webp)
*J'ai acheté 100 cellules de Grade-A pour garantir que la batterie durerait des années.*

C'est le vélo le plus rapide et le plus fiable que j'aie jamais construit. Il peut atteindre 65 km/h et ne perd pas de puissance, même dans les montées raides.

## Construction de Qualité Professionnelle

J'ai arrêté d'utiliser de la colle et du ruban adhésif pour faire tenir la batterie. À la place, j'ai conçu un support "monocoque" imprimé en 3D en plastique **PETG**. Le PETG est beaucoup plus solide que le PLA que j'utilisais auparavant et peut supporter les vibrations de la route sans se fissurer.


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

## Conclusion

La plus grande leçon de cinq années de construction de vélos électriques est qu'on ne peut pas construire une machine professionnelle avec de mauvais matériaux. L'utilisation de cellules neuves et de calculs d'ingénierie appropriés a rendu ce vélo plus rapide, plus sûr et beaucoup plus agréable à conduire.


## Nomenclature (BOM)

| Composant | Coût |
|---|---|
| 100x cellules EVE 33V Grade-A | ~450,00 $ CAD |
| BMS Daly 72V 40A (même que v5) | ~45,00 $ CAD |
| Filament PETG (support monocoque) | ~10,00 $ CAD |
| Kapton + Fibre de verre + Nickel | ~10,00 $ CAD |
| **Total** | **~515,00 $ CAD** |
