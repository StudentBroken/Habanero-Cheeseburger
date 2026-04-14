# Aile Volante RC : Électronique Personnalisée

## L'Objectif
Je voulais construire une carte de contrôle personnalisée pour une petite aile volante. Le but principal était de fabriquer un circuit imprimé unique capable de traduire différents signaux radio (CRSF vers SBUS) et de gérer toute l'électronique en même temps.

## Fonctionnement
J'ai utilisé un ESP32 pour faire le pont entre le signal CRSF haute vitesse de mon récepteur et l'ancien protocole SBUS utilisé par le contrôleur de vol. J'ai également intégré les servos, l'émetteur vidéo et la caméra dans un seul PCB personnalisé pour que l'avion reste léger et équilibré.

- **Radio** : ELRS (ExpressLRS) via CRSF.
- **Cerveau** : ESP32 (traduction personnalisée CRSF vers SBUS).
- **Servos** : Dual micro-servos haute couple 2g.

## Résumé & Statut
Tout a parfaitement fonctionné sur le banc d'essai — les signaux étaient propres et la carte personnalisée était solide. Bien que l'avion soit prêt à voler, j'ai mis le projet en pause pour me concentrer sur mes projets de drones plus rapides. Cela reste un test réussi de construction de ma propre électronique de vol personnalisée.
