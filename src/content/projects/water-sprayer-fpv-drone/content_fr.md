# Drone FPV à Pulvérisateur d'Eau

## Objectif
Je voulais construire une petite pompe à eau et un système de pulvérisation pour mon drone FPV. Le but était de pouvoir pulvériser de l'eau avec précision tout en volant vite (pour un jeu de Senior Assassin).

## Construction de la Pompe

L'architecture de la pompe utilise un moteur brushed haute RPM entraînant une turbine personnalisée logée dans une seringue médicale modifiée. Les turbines initiales imprimées en 3D n'étaient pas assez précises à cette échelle, j'ai donc dû en fabriquer une à la main en plastique dur. La chambre a été scellée avec des composés étanches et alimentée par gravité pour assurer l'amorçage.

## Électronique & Contrôle

La pompe est alimentée par un petit ESC brushed 1S. Je l'ai connecté à la broche LED du contrôleur de vol et je l'ai remappé dans Betaflight pour qu'il fonctionne comme un servo. J'ai également ajouté un bouton à mon émetteur (LiteRadio 2 SE) pour déclencher la pompe indépendamment des commandes de vol.

## Ce que j'ai appris

- **Construction** : Les composants imprimés en FDM et le pistolet à colle n'étaient pas appropriés pour les contraintes, les vibrations et les facteurs environnementaux (eau, humidité et température) du vol de drone. Une pièce s'est détachée lors d'un crash, montrant que j'ai besoin d'époxy plus solide ou de vis la prochaine fois.
- **Étanchéité** : J'ai recouvert le nouveau contrôleur de vol de silicone (revêtement conforme) pour m'assurer qu'il ne grillerait pas s'il était exposé à l'eau.
- **Tuyauterie** : Les premiers tubes étaient trop rigides et se pinçaient. J'ai besoin d'utiliser des tubes en silicone flexibles la prochaine fois et peut-être un système d'amorçage actif pour ne plus dépendre de la gravité.
