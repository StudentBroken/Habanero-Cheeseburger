# Scooter Sous-Marin Électrique (v1)

Un scooter sous-marin électrique fonctionnel gossé en deux jours avec un budget serré. L'objectif principal était de créer un dispositif de propulsion motorisé qui coûte moins de 50 $. Avec un boîtier imprimé en 3D sur mesure, il atteint des vitesses allant jusqu'à 3 km/h sous l'eau et priorise la simplicité absolue sur l'électronique complexe.

## Design & Inspiration

Je voulais un dispositif de propulsion rapide pour l'eau sans dépenser des centaines de dollars sur une unité commerciale. La phase de design s'est concentrée entièrement sur le prototypage rapide. J'ai modélisé les pièces 3D de zéro pour loger les batteries nécessaires et accommoder les moteurs. Le tout a prouvé qu'un véhicule sous-marin fonctionnel pouvait être ingénié en une seule fin de semaine.

## Quincaillerie & Électronique

Pour garder les coûts strictement entre 25 $ et 50 $, j'ai éliminé le besoin d'un ESC dédié.

- **Source d'Énergie** — Deux packs de batteries lithium 21700 3S fournissent le courant requis pour les propulseurs.
- **Boîtier** — Conçu sur mesure et imprimé en 3D pour loger les composants.
- **Contrôle Direct** — Utilise un interrupteur physique robuste pour fermer le circuit, ce qui rend l'opération extrêmement simple.
- **Monitoring de Voltage** — Un ESP32-C3 est câblé dans le système pour lire la tension du pack de batteries. Il affiche le statut via une LED externe comme indicateur visuel pour prévenir la surcharge des cellules.

## Logiciel & Logique

Comme le propulseur est piloté directement via un interrupteur matériel, il n'y a pratiquement aucune logique complexe requise pour la propulsion. Le logiciel se limite entièrement au firmware de l'ESP32-C3. Il agit comme un moniteur de tension rudimentaire, *polling* les niveaux de batterie et mappant la lecture à l'affichage LED externe.

## Défis & Leçons Apprises

Construire un submersible fonctionnel en 48 heures venait avec des compromis attendus.

- **Opération en Entraînement Direct** — Rouler sans ESC rend le système robuste et simple, mais manque de contrôle de vitesse proportionnel. C'est une courbe de puissance tout-ou-rien.
- **Contraintes de la Version 1** — Cette première itération a prouvé le concept et la délivrance de puissance, ouvrant la voie à de futures améliorations dans les contrôles et l'étanchéité.
