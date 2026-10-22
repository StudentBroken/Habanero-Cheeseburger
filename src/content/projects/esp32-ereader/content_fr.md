# Liseuse ESP32

J'avais récupéré l'écran à encre électronique d'une étiquette de prix et je voulais en faire quelque chose d'utile. Je l'ai transformé en petite liseuse pour ma blonde, avec un format de livre maison qui permet de retrouver facilement un passage dans la version papier. Le projet combine un écran récupéré, un XIAO ESP32-S3, un micrologiciel maison et un boîtier imprimé en 3D.

## Lire sur la liseuse

Le format de livre garde des repères pratiques entre la version numérique et le livre papier. Au lieu de se fier seulement aux numéros de page, il conserve le chapitre et la position dans celui-ci pour retrouver le même passage dans le livre imprimé. Le repère reste le même, peu importe la taille ou l'orientation de l'écran; la liseuse ajuste la mise en page au format choisi.

Le micrologiciel permet de lire en mode paysage ou portrait, de sauvegarder la progression de chaque livre, d'ouvrir la bibliothèque et de mettre l'appareil en veille pour économiser l'énergie. Trois zones tactiles capacitives servent à naviguer : précédent, suivant et menu/sélection. J'ai aussi conçu un autre boîtier avec des boutons physiques, mais je teste d'abord la version tactile avant de décider si je passe aux boutons.

![La liseuse assemblée dans une main](/projects/esp32-ereader/reader-in-hand.webp)
*La liseuse terminée dans son boîtier imprimé*

## Matériel et micrologiciel

La liseuse utilise une étiquette électronique récupérée, achetée 12 $, une carte Seeed Studio XIAO ESP32-S3 et un boîtier maison en PETG. Le micrologiciel pilote l'écran et stocke les livres ainsi que la progression directement sur l'appareil. Il permet aussi de gérer les livres et de mettre à jour le micrologiciel par Bluetooth Low Energy, avec un outil de transfert dans un navigateur disponible dans le dépôt du projet.

L'écran monochrome de 400 × 300 pixels est piloté par un contrôleur SSD1619. L'image reste affichée sans alimentation continue. Le micrologiciel fait des mises à jour partielles quand on tourne les pages, puis un rafraîchissement complet pour effacer les images fantômes accumulées. La liseuse passe aussi en veille profonde quand la lecture est en pause.

Les livres utilisent un format maison `.ebk`. Le format texte actuel stocke le titre, l'auteur, la table des matières et le texte UTF-8; le ESP32-S3 pagine et remet le texte en page selon l'orientation choisie. Un ancien format stocke des pages monochromes déjà rendues. Les livres sont gardés dans la mémoire flash, et la liseuse sauvegarde la position de chacun pour reprendre la lecture là où je l'avais laissée.

Le micrologiciel permet aussi de changer l'orientation, d'utiliser une vue de lecture qui cache une partie de l'interface et de gérer les livres dans un navigateur par Bluetooth Low Energy ou par USB série. Le BLE s'active pendant une courte fenêtre de synchronisation; l'outil peut aussi installer des mises à jour du micrologiciel.

## Conception du boîtier

J'ai conçu le boîtier dans Onshape autour de l'écran récupéré et de la carte XIAO, puis je l'ai imprimé en PETG. La version tactile utilise un boîtier qui s'enclenche. J'ai aussi modélisé un boîtier avec des boutons, mais je vais d'abord tester les commandes tactiles.

Les petits fils de liaison de l'écran sont fragiles. J'ai ajouté de l'époxy à polymérisation UV autour des connexions pour éviter qu'ils se décollent. J'ai fait passer les fils des zones tactiles dans le pavé, puis j'ai utilisé de la colle chaude pour les garder à distance des faces tactiles et des circuits imprimés à proximité. La colle garde les fils en place tout en restant flexible. Pour ce prototype, c'était pratique parce que je peux l'enlever avec de l'alcool isopropylique à 99 % si je dois retravailler le montage.

## Coût

- **Étiquette à encre électronique** — environ 12 $
- **Seeed Studio XIAO ESP32-S3** — environ 8 $
- **Fils, boîtier en PETG et matériel divers** — environ 3 $

**Total : environ 23 $**

## Réparation des pistes et prochaine révision

Le plus difficile a été de déconnecter le microcontrôleur d'origine de l'étiquette sans abîmer le circuit imprimé de l'écran. À mon premier essai, j'ai utilisé un Dremel et coupé trop profondément; les dommages étaient irréversibles. J'ai aussi branché l'alimentation au mauvais endroit et court-circuité une inductance.

Au deuxième essai, j'ai coupé les pistes soigneusement avec une petite lame, puis soudé des fils de liaison en cuivre émaillé de 0,25 mm pour reconnecter l'écran au XIAO. Le panneau fonctionnait alors avec le nouveau contrôleur. Avoir une étiquette de rechange m'a permis de recommencer après avoir endommagé le premier circuit.

Il a aussi fallu ajuster la détection tactile. Le trafic SPI de l'écran et sa pompe de charge pouvaient perturber les lectures capacitives, tandis que la façon de tenir l'appareil et les changements ambiants faisaient bouger la ligne de base tactile. Le micrologiciel met la lecture tactile en pause pendant les transferts vers l'écran, attend après les rafraîchissements, filtre les détections simultanées courantes, suit la ligne de base et réinitialise la détection tactile après le réveil de la veille profonde. Les données série m'ont aidé à comprendre les lectures brutes et le comportement au réveil. J'ai utilisé Antigravity et de l'aide par IA pendant le développement et le débogage de ces fonctions.

![Le circuit imprimé de l'étiquette après réparation](/projects/esp32-ereader/pcb-trace-repair.webp)
*Les pistes de l'écran après une coupe soigneuse et la réparation*

La prochaine fois, j'utiliserais la méthode de la lame et des fils de liaison dès le départ. Je veux aussi réparer le circuit d'origine, construire une autre liseuse avec l'écran de rechange et remplacer les zones capacitives par des boutons physiques.
