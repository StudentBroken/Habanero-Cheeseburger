# Architecture Périphérique BLE : Macropad v1

## Objectif Technique

L'objectif était l'ingénierie d'un périphérique HID custom utilisant le Bluetooth Low Energy (BLE). Le projet s'est concentré sur l'intégration d'entrées tactiles mécaniques avec un stack de protocole sans fil à faible latence et des capacités de remapping en temps réel.

## Spécification Matérielle

Le système est bâti sur un microprocesseur ESP32-S3, exploitant son radio BLE intégré. La matrice HID est interfacée directement avec les pins GPIO, permettant une capture d'entrée sans tampon et à faible latence. La plateforme est entièrement autonome avec une cellule LiPo intégrée pour le déploiement mobile.

## Logique de Contrôle & Interface

Le firmware gère deux stacks de protocoles : un stack BLE HID primaire pour l'émulation clavier standard et un serveur web 802.11 auxiliaire pour la configuration asynchrone. Les utilisateurs peuvent accéder à une interface web localisée pour remapper la matrice de touches; ces configurations sont commitées dans le stockage non-volatile (NVS), assurant la persistance à travers les cycles d'alimentation sans nécessiter de recompilation firmware.

## Évaluation Opérationnelle

Le prototype a démontré une utilité significative dans les flux de travail multi-applications (logiciels CAD/DCC). La couche de reconfiguration web a validé avec succès le modèle "hardware-as-a-service" pour les périphériques HID. Le système est resté en statut *daily driver* actif jusqu'à son évolution architecturale en plateforme v2 environ 96 heures après le déploiement.
