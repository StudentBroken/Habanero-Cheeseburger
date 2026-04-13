# Plateforme de Projectile Cinétique : Multirotor 6 Pouces

## Objectif du Système

L'objectif du projet était la modification tactique d'un multirotor FPV analogique 6 pouces pour supporter un système de projectile cinétique à actionnement à distance (gel blaster). La plateforme sert d'étude en intégration de charge utile et d'acquisition de cible cinétique en temps réel via optiques FPV analogiques.

## Intégration Matérielle

Le châssis 6 pouces de base a été équipé d'un assemblage de gel blaster pneumatique. L'actionnement est géré via un circuit interrupteur MOSFET dédié interfacé avec un canal auxiliaire (AUX) de rechange sur le contrôleur de vol. La vidéo analogique a été sélectionnée pour la liaison de ciblage en raison de sa transmission à latence zéro, assurant un retour visuel immédiat lors des déploiements haute dynamique.

- **Architecture Multirotor** : Configuration freestyle haute couple 6 pouces.
- **Optiques** : Liaison FPV analogique descendante (acquisition à latence zéro).
- **Architecture de Charge Utile** : Assemblage de projectile cinétique intégré, déclenché à distance via logique numérique.

## Dynamiques Opérationnelles

L'ajout de la charge utile a induit un déplacement significatif du centre de gravité de la plateforme. Le succès opérationnel a nécessité une session dédiée de tuning PID pour compenser l'aérodynamique décalée et le bruit gyroscopique induit par le recul. La plateforme a validé avec succès l'efficacité des charges utiles à actionnement à distance dans des environnements FPV à faible latence.
