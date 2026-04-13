# Système de Livraison d'Énergie Intelligent : LEV 24V

## Philosophie de Design

L'objectif était d'ingénier une solution de charge intelligente pour une architecture de batterie LEV 24V avec un focus principal sur la longévité cyclique. Le système adopte une stratégie de terminaison conservative à 4.15V/cellule, échangeant un nominal 3% de capacité d'énergie de pointe pour une augmentation projetée substantielle de la durée de vie totale du pack de batteries.

## Logique de Contrôle Matérielle

La gestion d'énergie et l'exécution du cycle de charge sont gérées par un microcontrôleur ESP32. Le système monitore la tension cumulative du pack via un diviseur de tension haute précision et actionne un relais haute ampérage pour physiquement découpler le chargeur lors de l'atteinte du seuil cible. La gestion thermique pour le régulateur LDO de l'étage logique est assurée via un dissipateur thermique en aluminium intégré pour dissiper la chaleur résiduelle pendant l'opération prolongée.

- **MCU** : ESP32
- **Seuil de Terminaison** : 4.15V par cellule
- **Télémétrie Active** : Matrice de progression de charge OLED intégrée WiFi
- **Design Thermique** : Dissipateur thermique passif sur l'étage de régulation LDO

## Statut Opérationnel

Le système est en opération nocturne continue. Les données longitudinales suggèrent une meilleure rétention de capacité dans la matrice lithium-ion comparé aux protocoles de charge standard à 4.2V/cellule.
