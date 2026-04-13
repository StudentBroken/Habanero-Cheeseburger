# Nœud Réseau Discret : Itération 3 (MQTT & Gestion d'Énergie)

## Évolution du Design

La troisième itération s'est concentrée sur le raffinement structurel interne et l'implémentation de protocoles avancés de gestion d'énergie. L'architecture a abandonné le lien BLE direct en faveur d'un broker MQTT centralisé, permettant la télémétrie multi-client et le traitement asynchrone.

## Optimisation d'Énergie

Cette itération marque la première implémentation de cycles de *deep sleep* entre les transmissions de données. La logique de traitement a été re-ingéniée pour exécuter une séquence *wake-capture-transmit-sleep*, prolongeant significativement la durée de vie opérationnelle pour une capacité batterie fixe.

## Ingénierie Structurelle

Le châssis interne a été redesigné avec des séparateurs rigides de composants pour éliminer les déplacements mécaniques lors de la manipulation. Le port optique et les interrupteurs physiques ont été alignés précisément avec la coque externe.

- **Logique Centralisée** : ESP32-S3 Xiao Sense Cam.
- **Protocole** : MQTT WiFi (publication télémétrique standardisée).
- **Gestion d'Énergie** : Implémentation *deep sleep* duty-cyclé.
- **Interface de Charge** : Mise à niveau vers USB-C standardisé.

## Conclusion d'Ingénierie

L'Itération 3 a transitionné avec succès la plateforme d'un prototype à un outil opérationnel fiable. Le passage à MQTT a fourni une flexibilité supérieure dans la sélection du terminal, et les correctifs structurels internes ont éliminé les défaillances mécaniques des builds précédents.
