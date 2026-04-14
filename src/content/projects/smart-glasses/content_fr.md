# Lunettes Intelligentes Ultrasoniques

## L'Objectif
Je voulais construire une paire de lunettes qui aide à « voir » les obstacles en utilisant le son. Le but était d'utiliser un capteur ultrasonique pour détecter la distance des objets et donner un retour en temps réel.

## Les Composants
J'ai utilisé un capteur ultrasonique HC-SR04 monté sur une monture de lunettes standard. Un petit ordinateur lit les données du capteur et calcule la distance jusqu'à l'objet le plus proche.
- **Capteur** : Capteur de distance ultrasonique.
- **Haut-parleur** : Petit pilote audio intégré.
- **Comment ça marche** : Les lunettes bipent plus vite à mesure que vous vous approchez de quelque chose, ce qui permet de savoir facilement où se trouvent les obstacles.

## Design
J'ai travaillé pour garder l'électronique petite afin que les lunettes restent confortables à porter. J'ai aussi affiné le câblage le long des branches de la monture pour qu'ils ne s'accrochent pas et ne se cassent pas pendant l'utilisation.

## Ce que j'ai appris
Le système de bips a bien fonctionné pour naviguer autour des objets. Le problème principal était qu'il ne regarde que devant lui — il ne voit pas ce qui est sur les côtés. Pour corriger cela dans une version future, je devrais ajouter plus de capteurs pour un champ de vision plus large.
