# ESP Eraser : Édition 2026 (Version finale)

## L'Objectif
En 2026, je voulais rendre le système de l'effaceur aussi petit que possible. Le but était de le rendre beaucoup plus mince et de changer la façon dont il envoie les données pour qu'il n'ait pas à attendre de réponse.

## Logiciel & Batterie
Je suis passé de MQTT à Firebase pour gérer les données. Cela signifie que l'effaceur peut envoyer une image et s'endormir immédiatement, ce qui économise beaucoup d'énergie. Cela m'a permis d'utiliser une batterie 70 % plus petite tout en durant aussi longtemps.

- **La plus petite taille à ce jour** : Assez mince pour être caché à la vue de tous.
- **Modèle de Données** : Envoi de données sur le cloud Firebase (*fire-and-forget*).
- **Gestion d'Énergie** : Temps d'activation court pour une durée de vie maximale de la batterie.
- **Surveillance de l'État** : Petite LED pour des vérifications d'état discrètes.

## Meilleur Design
J'ai redessiné l'intérieur pour que tout soit plus serré. J'ai aussi rendu le port de charge USB-C accessible sans avoir à tout démonter. La seule façon de dire que ce n'est pas un vrai effaceur est de regarder de près la texture imprimée en 3D.

## Résumé
La version 2026 prouve qu'on peut fabriquer quelque chose d'aussi petit et le faire fonctionner de manière fiable avec le cloud. C'est ma meilleure version à ce jour.
