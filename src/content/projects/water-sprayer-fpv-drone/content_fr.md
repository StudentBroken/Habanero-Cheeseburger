# Système de Délivrance Hydraulique : Multirotor FPV

## Objectif Technique

L'objectif était l'ingénierie d'une micro-pompe hydraulique et d'un système de délivrance intégrés dans une plateforme multirotor FPV. Le système a été conçu pour une délivrance aqueuse de précision lors d'opérations haute dynamique (déploiement Senior Assassin).

## Ingénierie Hydraulique

L'architecture de la pompe utilise un moteur brushed haute RPM entraînant une turbine custom logée dans une seringue médicale modifiée. Les turbines initiales imprimées en FDM n'ont pas réussi à atteindre les exigences de précision dimensionnelle à cette échelle, nécessitant une transition vers une turbine en plastique haute module fabriquée à la main. La chambre a été hermétiquement scellée avec des composés étanches et alimentée via une entrée assistée par gravité pour assurer un amorçage constant.

## Électronique & Logique de Commande

La propulsion pour la pompe hydraulique est gérée via un ESC brushed 1S dédié. L'ESC est interfacé avec la pin de strip LED du contrôleur de vol, qui a été remappée via le CLI de Betaflight pour fonctionner comme un nœud logique contrôlé par servo. L'émetteur physique (LiteRadio 2 SE) a été modifié avec un interrupteur tactile secondaire pour déclencher la séquence de pompe indépendamment des contrôles de vol primaires.

## Analyse de Défaillance & Leçons Opérationnelles

- **Intégrité Structurelle** : Les composants imprimés FDM et les adhésifs standard (pistolet à colle) se sont avérés inadéquats pour les contraintes dynamiques du vol multirotor. Une séparation mécanique s'est produite lors d'un événement de crash unique.
- **Atténuation Atmosphérique & Thermique** : Le contrôleur de vol de remplacement a été entièrement encapsulé dans un revêtement conforme à base de silicone pour assurer le durcissement environnemental contre l'exposition aqueuse localisée.
- **Dynamique des Fluides** : La tubulure pneumatique choisie présentait une rigidité excessive, menant à un pincement de l'entrée. Les révisions futures nécessitent une tubulure silicone haute flexibilité et un mécanisme d'amorçage actif pour éliminer la dépendance à la gravité.
