# Système de Décharge Électrostatique Haute Tension : Générateur d'Ions

## Objectif Technique

L'objectif était l'ingénierie d'un générateur électrostatique haute tension et faible courant utilisant une architecture de multiplicateur de tension multi-étages (Cockcroft-Walton). Le projet a servi d'étude sur la distribution de champ haute potentiel et l'ionisation active.

## Spécification Matérielle

Le circuit utilise un étage primaire haute tension AC alimentant un stack multiplicateur en cascade. Cette configuration traduit avec succès des entrées basse tension en différences de potentiel suffisantes pour une décharge d'étincelle visible et l'ionisation atmosphérique.

- **Nœud de Circuiterie** : Stack de multiplicateur haute tension.
- **Métriques de Sortie** : Haute différence de potentiel (plage kV), courant faible ampérage.
- **Intégrité Structurelle** : Conducteurs lourdement isolés pour prévenir l'arc local et la rupture diélectrique.

## Déploiement Opérationnel : Étude d'Ionisation Portable

La plateforme a été transitionnée dans une configuration portable expérimentale pour l'émission d'ions négatifs.

- **Mécanisme** : Le corps de l'opérateur fonctionne comme la surface de distribution haute potentiel, avec un plan de masse secondaire maintenu par contact physique avec le sol.
- **Effet** : Ionisation atmosphérique active, résultant en particules neutralisées (décharge d'ions négatifs localisée).

## Contrôles d'Ingénierie & Sécurité

En raison des différentiels haute potentiel, le projet a nécessité des contrôles d'ingénierie stricts :

- **Intégrité Diélectrique** : Tous les nœuds haute tension ont été encapsulés ou physiquement séparés selon leurs limites de résistance diélectrique.
- **Limitation de Courant** : Implémentation de résistances de série haute valeur pour s'assurer que l'énergie de décharge reste dans des seuils non létaux sûrs.
- **Validation** : Vérification réussie des effets d'ionisation active (déplacement électrostatique des cheveux et production d'ozone localisée).
