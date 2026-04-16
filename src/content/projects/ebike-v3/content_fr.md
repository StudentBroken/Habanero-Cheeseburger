À 15 ans, je voulais que le vélo ait plus de couple. Au lieu que le moteur fasse tourner le pneu directement, j'ai construit un système "mid-drive" qui utilise une chaîne et un pignon. Cela permet au moteur d'aider beaucoup mieux le vélo à monter les collines.

![Build mid-drive terminé](/projects/ebike-v3/the-completed-build.webp)
*Le modèle v3 terminé. On peut voir le gros moteur et le système d'entraînement par chaîne.*


## Transmission & Rapports

J'ai retiré la chaîne de pédalage entièrement et monté un pignon de 10 dents sur le moteur outrunner 6384, entraînant le pignon arrière de 33 dents. Ça donne une réduction de 3,3:1. À 120KV et 6S (environ 22V), le moteur tourne à environ 2640 RPM à vide, ce qui donne une vitesse de roue utilisable autour de 45 km/h une fois la réduction appliquée.

Les pièces étaient des couronnes chinoises bon marché sourced en ligne. Elles fonctionnaient, mais la tension de chaîne n'était jamais stable à cause du support.

![Pignon moteur et couronne arrière d'origine chinoise](/projects/ebike-v3/the-gears-i-bought-chineese.webp)
*Pignon moteur 10T vers pignon arrière 33T — réduction 3,3:1.*

## Support Moteur

Le moteur était fixé au cadre en utilisant les points de montage du porte-bidon comme ancrage, plus des équerres de quincaillerie. Pour serrer les équerres solidement sur les tubes du cadre, j'ai coupé une rainure dans chaque équerre et passé un collier métallique à vis dedans, puis serré autour du tube. Ça tenait, mais ce n'était pas rigide sous un couple dynamique — les équerres se sont quand même déformées avec le temps.

J'ai également utilisé des rivières à insert (rivnuts) pour la première fois. Je n'avais pas d'outil à rivnuts, alors j'ai fabriqué un système à base de ce que j'avais sous la main pour tirer le mandrin et les poser. Ça a fonctionné assez bien pour être une fixation permanente. Les rivnuts m'ont donné des inserts filetés dans le cadre sans soudure, ce qui était le bon choix vu les outils disponibles.

J'ai aussi modélisé un support de batterie en PLA imprimé en 3D à partir de la photo de référence de montage dans le cadre, et monté le VESC à l'avant du cadre.

![Support moteur improvisé avec équerres et plateau batterie PLA](/projects/ebike-v3/the-motor-mount-improvised-and-a-pla-bracket-for-the-battery-and-the-vesc-mounted-in-the-front.webp)
*Support moteur, plateau batterie PLA et VESC visible. Fonctionnel, de justesse.*

![Photo de référence de montage dans le cadre pour le CAD](/projects/ebike-v3/the-fitment-in-the-frame-referance-for-the-3d-model.webp)
*Photo utilisée comme géométrie de référence pour le support imprimé en 3D.*

## Ma Première Soudeuse par Points

J'ai aussi enfin arrêté de souder directement sur les cellules de la batterie. J'ai acheté une soudeuse par points bon marché sur AliExpress. Elle utilise des impulsions à courant élevé pour fusionner une mince bande de nickel sur la cellule sans chauffer toute la batterie.

![Premières soudures par points](/projects/ebike-v3/the-batteries-spot-welding-them-the-first-spotwelds-of-my-life.webp)
*Apprentissage de la soudure par points. C'est beaucoup plus sûr et fiable que la soudure au fer.*

Il a fallu un peu de pratique pour bien faire, mais c'était une étape importante vers la construction de batteries de qualité professionnelle.


![Intérieur du pack batterie avec mousse et ruban adhésif](/projects/ebike-v3/the-battery-pack-with-the-foam-and-ducktape-this-is-the-inside-view.webp)
*Intérieur du pack — mousse et ruban, conforme au standard de build v1/v2.*

## Tableau de Bord

Avant d'ajouter le pont BLE, j'ai construit un tableau de bord local : un OLED de 0,91 pouce câblé à un ESP32, affichant la vitesse, la tension de la batterie et l'état de charge en temps réel. Je savais que la tension seule indique l'état de charge d'une cellule lithium au repos — la tension sous charge est une autre histoire, mais pour une jauge de carburant approximative, c'était suffisant.

L'OLED est la raison pour laquelle le premier VESC est mort. En câblant l'ESP32 de l'OLED au connecteur UART du VESC, j'ai accidentéllement court-circuité une broche de données à la masse. C'est suffisant pour tuer le BEC. Pas une panne de composant — une erreur de câblage. Ce n'est qu'après avoir remplacé le VESC et examiné plus attentivement ce qui s'était passé que j'ai compris la cause réelle.

## Télémétrie BLE

Pour la première fois, j'ai ajouté de la télémétrie en temps réel. J'ai flashé un projet open-source — [VescBLEBridge](https://github.com/A-Emile/VescBLEBridge) — sur un ESP32, qui fait le pont entre la sortie UART du VESC et le Bluetooth Low Energy. Ça me permettait de lire la tension, la vitesse et le courant depuis mon téléphone en roulant. Première utilisation de PlatformIO et VSCode pour un projet ESP32 (j'avais utilisé PlatformIO avant à 13 ans pour flasher Klipper sur un Ender 3, mais c'était différent — là c'était compiler et uploader une vraie logique de firmware).

## Pannes VESC

Ce build a tué deux VESCs :

**VESC #1** — même modèle 75100, acheté pas cher. Le BEC interne a lâché. La vraie cause, c'était ma faute : en câblant l'ESP32 de l'OLED au UART du VESC, j'ai court-circuité une broche de données à la masse et tué le BEC. Je ne l'ai pas réalisé sur le moment et j'ai supposé que c'était une panne de composant.

**VESC #2** — même résultat. Unité différente, même panne. À ce stade, deux contrôleurs identiques ont lâché de façon identique sur du matériel identique, ce qui signifie que le BEC du 75100 d'entrée de gamme est le maillon faible.

**VESC #3** (actuel) — sourcé chez un vendeur plus sérieux à 75$. A un défaut connu : l'ADC lit la tension environ 1V plus haut que réelle. Acceptable à 75$. Dans toutes les autres fonctions, il fonctionne correctement. On a ce pour quoi on paie.

## Nomenclature (BOM)

| Composant | Coût |
|---|---|
| Outrunner 6384 120KV | ~40,00 $ CAD |
| VESC 75100 ×2 (les deux ont lâché) | ~120,00 $ CAD |
| VESC 75100 (vendeur sérieux) | ~75,00 $ CAD |
| Couronne + pignon moteur 10T | ~20,00 $ CAD |
| Équerres + visserie | ~10,00 $ CAD |
| Cellules 18650 (~1$ chacune) | ~50,00 $ CAD |
| ESP32 + divers | ~10,00 $ CAD |
| **Total** | **~325,00 $ CAD** |

## Le Coût de l'Échec

Ce build a été une dure leçon en électronique de puissance. J'ai réussi à griller deux VESCs coûteux. Le deuxième a lâché quand j'ai essayé de monter une pente raide alors que le moteur était encore froid. Le pic soudain de courant était trop pour le contrôleur.

Au final, cette version a atteint 45 km/h, mais elle était souvent en panne. Cela m'a appris qu'il est beaucoup plus difficile de construire un vélo puissant que simplement un vélo rapide.

