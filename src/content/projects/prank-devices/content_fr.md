# Réseau Acoustique Distribué : Tests Opérationnels

## Objectif Tactique

L'objectif était le déploiement d'un réseau distribué de nœuds basse consommation pour exécuter des perturbations acoustiques synchronisées. L'opération a servi de validation principale pour les implémentations de *deep sleep* ultra-basse consommation sur la plateforme ESP32.

## Architecture Réseau

L'opération utilisait plusieurs nœuds ESP32 communiquant via le protocole peer-to-peer ESP-NOW. Cette architecture permettait une coordination complexe à faible latence sans besoin d'infrastructure WiFi, assurant une haute discrétion opérationnelle. Pour maintenir la non-attribution visuelle, les électroniques étaient dissimulées dans des boîtiers 3D imprimés trompe-l'œil (imitant l'électronique grand public).

## Système de Gestion d'Énergie

Ce projet marquait la première implémentation réussie du duty-cycling avancé sur la plateforme ESP32.

- **Intégration Micro-Sleep** : Les nœuds utilisaient des minuteries de réveil *deep sleep* pour minimiser le courant quiescent.
- **Optimisation du Cycle de Travail** : Le duty cycle a été ajusté pour maintenir l'efficacité acoustique tout en prolongeant la durée opérationnelle à un cycle complet de 24 heures sur capacité LiPo minimale.
- **Sélection de Protocole** : ESP-NOW a été sélectionné pour sa surcharge de *handshake* minimale comparé aux stacks 802.11 standard.

## Résultats Opérationnels

Le déploiement a été un succès complet, validant la fiabilité de communication ESP-NOW et la viabilité des nœuds ESP32 alimentés par batterie à long terme. La logique de duty-cycling développée pour cette opération est devenue la fondation télémétrique pour les itérations suivantes de la série de nœuds réseau discrets (Eraser v3+).
