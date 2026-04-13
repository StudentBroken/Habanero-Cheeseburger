# Nœud Réseau Discret : Itération 1

## Objectif Opérationnel

L'objectif était l'ingénierie d'un nœud réseau optique discret, multi-étages, logé dans un format domestique inerte (efface de tableau blanc). Le système fournit un traitement visuel automatisé via GPT-4o et un retour acoustique quasi-invisible à l'opérateur.

## Architecture du Système

Le nœud utilise un ESP32-S3 Xiao Sense Cam avec PSRAM intégré. Sur déclenchement externe, le système capture un instantané haute résolution et exécute une requête POST RESTful vers l'API de vision d'OpenAI. Le payload texte résultant est transmis via le protocole ESP-NOW à une unité réceptrice secondaire, qui sert de pont série vers une application Android TTS custom.

## Interface Acoustique

Pour maintenir une faible visibilité opérationnelle, la liaison audio est délivrée via un écouteur custom composé d'un driver 8mm lié par du fil de cuivre émaillé de 0.1mm. Le diamètre minimal du fil rend le lien physique quasi-invisible sous éclairage ambiant.

- **Calcul** : ESP32-S3 Xiao Sense (caméra intégrée + PSRAM).
- **Topologie de Communication** : WiFi (sortant) -> ESP-NOW (relais) -> USB Série (pont mobile).
- **Liaison Acoustique** : Fil émaillé 0.1mm vers micro-driver 8mm.

## Analyse de Fiabilité

Le système a validé avec succès la chaîne de traitement de bout en bout. Cependant, le grand nombre de nœuds-ponts a introduit plusieurs points de défaillance. La fragilité du lien acoustique 0.1mm a mis en évidence la nécessité de mécanismes de retour sans fil plus durables dans les itérations suivantes.
