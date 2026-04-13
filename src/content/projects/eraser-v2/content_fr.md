# Nœud Réseau Discret : Itération 2 (Optimisation BLE)

## Révision Architecturale

L'objectif de la deuxième itération était la simplification radicale de la topologie de communication. La chaîne de relais multi-étages ESP-NOW/Série a été mise hors service en faveur d'un lien Bluetooth Low Energy (BLE) direct entre le nœud principal et l'unité de traitement mobile.

## Améliorations du Système

L'intégration du protocole BLE a éliminé deux nœuds intermédiaires, réduisant significativement la latence du système et augmentant la fiabilité opérationnelle. Le support physique (efface de tableau) a été upgradé vers un modèle avec un profil volumétrique plus optimisé — simultanément plus mince et plus large — ce qui a facilité une manipulation manuelle plus discrète.

- **Nœud Logique** : ESP32-S3 Xiao Sense.
- **Stack de Protocole** : BLE HID/GATT direct pour l'interfaçage mobile.
- **Intégration Physique** : Cavité interne custom pour la fixation rigide des composants.

## Conclusion Opérationnelle

La transition vers une architecture sans fil à nœud unique a réduit la complexité de déploiement d'environ 60%. Le boîtier physique redesigné a adressé avec succès les problèmes ergonomiques identifiés dans l'Itération 1, confirmant la viabilité du BLE comme couche de transport principale pour la télémétrie discrète.
