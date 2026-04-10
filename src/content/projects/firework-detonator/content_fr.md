# Détonateur de Feu d'Artifice à Distance

Ce projet est un détonateur à distance avec minuterie pour une fusée de feu d'artifice, complètement gossé en 30 minutes à la course juste avant l'heure du lancement. L'idée c'était de pouvoir allumer la fusée en étant loin et safe sans avoir besoin d'y aller avec un lighter.

## Quincaillerie Électronique

Le hardware a été patenté super vite avec des pièces de spare que j'avais de lousse.

- **Microcontrôleur** — Un ESP32-C3 Supermini s'occupe de la logique, du *timing* pi d'activer le relais.
- **Contrôle à Distance** — C'est juste un petit module de manette ben basic pour recevoir le signal.
- **Alimentation** — Le système est pluggé sur une grosse batterie LiPo 3S. Vue que c'est trop fort pour l'électronique, y'a un ti *buck converter* de type LM ben commun pour baisser le voltage.
- **Circuit de Déclenchement** — Un relais normal switch le courant pour l'allumeur quand l'ESP dit go.
- **L'Allumeur** — L'allumeur *custom* a été fait au plus crisse: c'est juste une allumette entourée de fil de cuivre ben fin, avec un peu de tape. Quand le circuit s'ouvre, le courant fait chauffer le fil de cuivre ce qui allume le boute enflammable de l'allumette.

## Challenges & Lessons Learned

Le principe était bon sur papier, mais sur le terrain ça a été une autre histoire.

- **L'Échec sous la Pluie** — J'avais fait un test juste avant qui a marché numéro un, mais une fois dehors, la patente a jamais réusi à allumer la fusée. Le gros problème c'était qu'il mouillait. Vu que je l'ai fait à la hâte en 30 minutes, mon allumeur a probablement juste pris l'humidité à cause de la pluie, ou bedon mon tape a tout rendu l'âme dans l'eau.
