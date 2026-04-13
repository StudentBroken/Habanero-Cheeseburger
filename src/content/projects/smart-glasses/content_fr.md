# Plateforme de Conscience Spatiale Assistive : Lunettes Ultrasoniques

## Objectif Technique

L'objectif était l'ingénierie d'un dispositif assistif à faible latence pour fournir une conscience spatiale en temps réel aux utilisateurs malvoyants. Le système exploite un retour acoustique pour traduire les données de distance en télémétrie environnementale intuitive.

## Spécification Matérielle

La plateforme utilise un groupe de transducteurs ultrasoniques HC-SR04 monté sur un châssis de lunettes standard. Le capteur est interfacé avec un microcontrôleur qui exécute un *polling* de distance haute fréquence, calculant la proximité d'objets basé sur la réflexion acoustique du temps de vol.

- **Suite de Capteurs** : Transducteur de distance ultrasonique.
- **Interface Physique** : Micro-driver acoustique intégré.
- **Protocole de Retour** : Modulation de fréquence d'impulsion (PFM) — la fréquence des bips augmente linéairement à mesure que la distance à l'obstacle principal diminue.

## Intégration du Système

Le package électronique a été ingénié pour un déplacement volumétrique minimal. Le harnais de câblage a transitionné d'un routage câble libre vers un chemin structurel plus rigide le long des branches de la monture pour assurer la fiabilité mécanique à long terme.

## Évaluation Opérationnelle

La boucle de retour PFM a validé avec succès le modèle de transition "acoustique-haptique" pour la navigation spatiale. Bien que la configuration à capteur unique ait fourni une détection axiale fiable, la contrainte principale de la plateforme est un champ de vision limité. Les itérations suivantes nécessiteraient une topologie de capteurs en *phased array* pour fournir une conscience périphérique complète.
