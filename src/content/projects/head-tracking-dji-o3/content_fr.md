# Système de Suivi de Tête pour DJI O3 Air Unit

Ce projet est un système de suivi de tête (head tracking) à deux axes, fait sur mesure pour les lunettes DJI Goggles 3 et une unité O3 Air. L'idée est partie du fait que j'avais cet équipement DJI à ma disposition et je voulais faire un gimbal de head tracking complètement fonctionnel de A à Z.

## Quincaillerie Électronique

La base matérielle repose sur un système de mouvement à deux axes avec un boîtier que j'ai modélisé et imprimé en 3D moi-même pour ce build.

- **Suivi de Mouvement** — Un module MPU capte tous les mouvements de la tête de l'utilisateur en temps réel.
- **Microcontrôleurs** — Deux ESP32 C3 Superminis s'occupent de la logique. L'un est monté sur les lunettes comme transmetteur, et l'autre est sur la bébelle téléguidée comme receveur.
- **Moteurs** — Deux servomoteurs gèrent les axes de *pan* et *tilt* du gimbal.
- **Alimentation** — Un petit *buck converter* (régulateur de tension) permet de rouler le système sur des batteries allant de 2S à 6S sans tout faire sauter.
- **Système Vidéo** — L'unité DJI O3 Air Unit agit comme caméra principale et transmetteur vidéo.

## Logiciel Informatique

Le logiciel informatique utilise le protocole ESP-NOW pour faire jaser les deux ESP32 C3 Superminis ensemble. Ça donne un délai super bas (low latency), ce qui est crissement important pour qu'un système de suivi de tête réponde de façon naturelle et ne donne pas mal au cœur.

Le transmetteur lit les données du MPU, calcule les angles nécessaires pour le *pan* et le *tilt*, puis pitche ces coordonées-là via ESP-NOW. L'autre ESP32 C3 prend ces commandes et les transforme en signaux PWM ultra précis pour driver les deux servomoteurs du mouvement à deux axes.
