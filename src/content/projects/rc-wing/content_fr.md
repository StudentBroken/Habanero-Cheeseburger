# Suite Avionique Autonome : Aile RC

## Objectif de Design

L'objectif était le développement d'un sous-système d'avionique centralisé et de traduction de signal pour une plateforme à voilure fixe haute performance. Le projet s'est concentré sur l'intégration de protocoles de télémétrie disparates (CRSF vers SBUS) sur un PCB custom fabriqué.

## Architecture Avionique

Le système utilise un microprocesseur ESP32 comme nœud de traduction de signal principal, faisant le pont entre le flux CRSF haute vitesse d'un récepteur ELRS vers le protocole SBUS hérité requis par le contrôleur de vol. La configuration dual-axe des élevons est pilotée par des micro-servos 2g, avec toute la télémétrie, la transmission vidéo (VTX) et les optiques intégrées directement dans la carte de contrôle custom routée pour minimiser le déplacement volumétrique.

- **Protocole RF** : ELRS (ExpressLRS) via CRSF.
- **Nœud Logique** : ESP32 (traduction propriétaire CRSF vers SBUS).
- **Actionnement** : Dual micro-servos haute couple 2g.

## Statut & Conclusion

La phase de test *bench* a validé avec succès l'intégrité du signal de la carte fabriquée custom et la fiabilité de la logique de traduction du lien de commande. Bien que la construction de la cellule soit complète, la plateforme reste dans un état "archivé" pré-vol en raison de la priorisation de déploiements multirotor haute dynamique subséquents. Le projet sert de modèle d'ingénierie validé pour l'intégration d'avionique à voilure fixe custom.
