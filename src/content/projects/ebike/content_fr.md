# Module de Conversion de Tension Haute Puissance : 48V vers USB-C PD

## Objectif de Design

L'objectif était d'ingénier un module d'interface haute tension pour tirer sur une architecture de batterie LEV nominale de 48V, fournissant une alimentation USB-C Power Delivery régulée pour les électroniques auxiliaires de terrain.

## Architecture du Système

Le convertisseur utilise un étage de régulation *buck* haute efficacité adapté aux transitoires d'entrée 48V+. Un IC contrôleur USB-C PD dédié gère le protocole de négociation, permettant au système de communiquer avec les appareils connectés et de délivrer la puissance selon leurs profils de tension et ampérage spécifiques (plage 5V-20V).

## Résultat Opérationnel

Le module valide avec succès la batterie du vélo comme nœud de stockage d'énergie mobile haute capacité. Le système assure une charge pleine vitesse pour les appareils mobiles en transit, facilitant l'utilisation d'électroniques auxiliaires à haute consommation (GPS/télémétrie) sans compromettre significativement l'état de charge de la batterie de propulsion principale.
