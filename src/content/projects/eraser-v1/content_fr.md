# ESP Eraser : Itération 1

## L'Objectif
Je voulais cacher un système de caméra dans un effaceur de tableau blanc. L'idée était de prendre une photo d'un tableau, de la faire traiter par GPT-4o, et d'envoyer le résultat à mon oreille via un fil minuscule, presque invisible.

## Électronique

Le nœud utilise un ESP32-S3 Xiao Sense Cam avec PSRAM intégré. Sur déclenchement externe, le système capture un instantané haute résolution et exécute une requête POST RESTful vers l'API de vision d'OpenAI. Le payload texte résultant est transmis via le protocole ESP-NOW à une unité réceptrice secondaire, qui sert de pont série vers une application Android TTS custom.

## Retour Audio
Pour garder le système secret, l'audio est envoyé à un petit écouteur via un fil de 0,1 mm. Comme le fil est si fin, il est presque impossible de le voir à moins de le chercher.

- **Calcul** : ESP32-S3 Xiao Sense (caméra intégrée + PSRAM).
- **Topologie de Communication** : WiFi (sortant) -> ESP-NOW (relais) -> USB Série (pont mobile).
- **Liaison Acoustique** : Fil émaillé 0.1mm vers micro-driver 8mm.

## Ce que j'ai appris
Le système a fonctionné de bout en bout. Cependant, avoir autant d'étapes (Effaceur vers relais, relais vers téléphone, téléphone vers audio) l'a rendu instable. Le fil minuscule était aussi beaucoup trop fragile, ce qui m'a poussé à passer à l'audio sans fil pour la version suivante.
