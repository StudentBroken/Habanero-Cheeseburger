# Scooter Sous-Marin Électrique (v1)

Un scooter sous-marin électrique fonctionnel gossé en deux jours avec un budget serré. L'objectif principal était de créer un petit scooter motorisé pour moins de 50 $. Avec un boîtier imprimé en 3D sur mesure, il atteint des vitesses allant jusqu'à 3 km/h sous l'eau et privilégie la simplicité brute plutôt que l'électronique complexe.

## Design & Inspiration

Je voulais un moyen rapide de bouger dans l'eau sans dépenser des centaines de dollars pour une unité commerciale. La phase de design s'est concentrée entièrement sur le prototypage rapide. J'ai modélisé les pièces 3D de zéro pour loger les batteries et les moteurs. Le tout a prouvé qu'un véhicule sous-marin fonctionnel pouvait être construit en une seule fin de semaine.

## Quincaillerie & Électronique

Pour garder les coûts strictement entre 25 $ et 50 $, j'ai éliminé le besoin d'un ESC dédié.

- **Source d'Énergie** — Deux packs de batteries lithium 21700 3S fournissent le courant requis pour les propulseurs.
- **Boîtier** — Conçu sur mesure et imprimé en 3D pour loger les composants.
- **Contrôle Direct** — Utilise un interrupteur physique robuste pour fermer le circuit, ce qui rend l'opération extrêmement simple.
- **Monitoring de Voltage** — Un ESP32-C3 est câblé dans le système pour lire la tension du pack de batteries. Il affiche le statut via une LED externe comme indicateur visuel pour prévenir la surcharge des cellules.

## Logiciel & Logique

Comme le propulseur est branché directement sur un interrupteur, il n'y a aucune logique complexe pour le faire avancer. Le logiciel se limite au firmware de l'ESP32-C3, qui sert de simple moniteur de tension en vérifiant les niveaux de batterie pour les afficher sur la LED.

## Défis & Leçons Apprises

- **Entraînement Direct** — Fonctionner sans ESC rend le système simple et solide, mais on ne peut pas régler la vitesse : c'est soit au maximum, soit éteint.
- **Limites de la V1** — Cette première version a prouvé que ça fonctionnait, ouvrant la voie à de meilleurs contrôles et une meilleure étanchéité pour la suite.
