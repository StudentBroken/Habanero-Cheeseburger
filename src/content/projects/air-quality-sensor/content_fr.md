# Station de Surveillance Atmosphérique

## Objectif

L'objectif était d'ingénier une station de monitoring environnemental local pour la télémétrie en temps réel des particules PM2.5, des concentrations de COV et des métriques atmosphériques (température/humidité).

## Architecture Matérielle

Le système est bâti sur un microcontrôleur ESP32-C3, choisi pour son WiFi intégré et son empreinte volumétrique minimale. La suite de capteurs utilise un module atmosphérique multimodal pour les COV/eCO2 et un capteur laser dédié pour la détection des particules PM2.5. L'ensemble est logé dans un boîtier hybride : une structure commerciale modifiée avec un couvercle imprimé en 3D.

## Télémétrie & Données

Le firmware exécute une séquence de *polling* périodique, transmettant des paquets de télémétrie à un broker MQTT Adafruit centralisé. Cette architecture permet la visualisation locale en temps réel via un écran OLED intégré et l'analyse long terme via un tableau de bord cloud.

## Observations

Le déploiement continu a fourni des données claires sur la volatilité de la qualité de l'air intérieur. Des pics visibles en PM2.5 ont été directement corrélés avec l'impression 3D, les aérosols et la cuisine, ce qui valide la sensibilité du système.
