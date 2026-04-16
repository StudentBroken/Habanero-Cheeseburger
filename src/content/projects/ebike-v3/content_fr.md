# Vélo Électrique (v3)

Construit à 15 ans, quelques mois après un voyage en Chine — le premier build où j'ai vraiment fait du travail métallique plutôt que d'imprimer des supports en 3D en espérant qu'ils tiendraient. L'objectif central était de passer de l'entraînement par friction des v1/v2 à un système mid-drive avec un vrai avantage mécanique via une chaîne et un pignon de réduction.

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

## Batterie

Même construction générale que les v1/v2 — cellules 18650 de récupération, mousse et ruban adhésif. La différence, c'est que j'avais maintenant un soudeuse par points. C'étaient mes premières soudures par points. Les cellules étaient sourcées à environ 1$ chacune et j'ai sauté le test de capacité, vérifiant uniquement la tension. Je ne savais pas à l'époque que la tension ne dit rien sur la capacité réelle — ces cellules allaient de 2500 à 2900 mAh, ce qui est faible pour de l'18650, et je n'en avais aucune idée.

![Cellules 18650 brutes avant la construction du pack](/projects/ebike-v3/the-batteries-after-i-brought-them-home.webp)
*Cellules fraîches — tension vérifiée, capacité inconnue.*

![Premières soudures par points sur cellules 18650](/projects/ebike-v3/the-batteries-spot-welding-them-the-first-spotwelds-of-my-life.webp)
*Premières soudures par points de ma vie. La technique s'est améliorée au fil du pack.*

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

## Post-Mortem

Le build fonctionnait mais n'était pas bon. Le support en équerres était toujours limite, la tension de chaîne n'était jamais stable, et l'esthétique générale était à moitié professionnelle, à moitié improvisée — parce qu'elle l'était. Les pédales étaient du poids mort inutile puisque la chaîne était retirée ; les pousser ressemblait à pédaler dans l'air.

Les deux pannes de VESC étaient coûteuses. Les ESC bon marché pour des applications mid-drive à fort courant ne sont pas une bonne affaire quand on inclut le coût de remplacement. La leçon — acheter une fois chez un fournisseur sérieux plutôt que deux fois chez un fournisseur cheap — m'a coûté 120$ à apprendre.

Le problème de capacité des cellules était une lacune de connaissance. J'ai seulement testé la tension, pas la capacité. Un vrai test de décharge sous charge aurait révélé les cellules faibles avant la construction du pack. J'ai appris à toujours tester les cellules sous charge après ce build.

La télémétrie BLE était la vraie amélioration. Rouler avec des données réelles — tension, courant, vitesse — sur mon téléphone a changé ma compréhension du système. Voir la chute de tension sous charge en temps réel m'a donné une bien meilleure intuition de ce dont le pack était capable ou non.
