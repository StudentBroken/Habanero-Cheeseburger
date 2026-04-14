# Appareils de Farce Télécommandés

## L'Objectif
Je voulais construire un ensemble de petits appareils cachés capables de faire des bruits sur commande. Le but principal était de tester combien de temps je pouvais faire fonctionner un ESP32 sur une minuscule batterie en utilisant le mode « deep sleep ».

## Communication
J'ai utilisé plusieurs cartes ESP32 communiquant entre elles via « ESP-NOW ». Cela leur permet de se coordonner sans avoir besoin de routeur WiFi, ce qui les rend plus faciles à cacher. J'ai imprimé en 3D des boîtiers personnalisés qui ressemblent à des appareils électroniques normaux pour qu'ils ne soient pas remarqués.

## Économie d'Énergie
C'était la première fois que je réussissais vraiment à faire fonctionner le mode deep sleep aussi bien. J'ai réglé les appareils pour qu'ils ne se réveillent que lorsque c'est nécessaire, ce qui leur a permis de fonctionner pendant 24 heures complètes sur une très petite batterie. J'ai choisi ESP-NOW car c'est beaucoup plus rapide et efficace que le WiFi standard.
- **Micro-Sleep** : Les nœuds ne se réveillent que par moments pour économiser de l'énergie.
- **Efficacité** : Le cycle a été réglé pour durer 24 heures sur une batterie minuscule.
- **Protocole** : ESP-NOW a été choisi car il se connecte presque instantanément.

## Ce que j'ai appris
Le projet a parfaitement fonctionné. Il a prouvé que je pouvais fabriquer des appareils fiables, alimentés par batterie, qui restent connectés pendant longtemps. Le code que j'ai écrit pour économiser l'énergie ici est devenu la base de mes projets ultérieurs, comme les ESP Erasers.
