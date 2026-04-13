# Nœud de Fabrication Cartésien : Ender 3 Modifié

## Vue d'Ensemble

C'est un overhaul complet d'une imprimante 3D cartésienne standard, optimisée pour un uptime élevé et une exécution cinématique précise. C'est le nœud de fabrication principal pour toutes les pièces structurelles et boîtiers électroniques de ce portfolio depuis le premier quart de 2023.

## Cinématique & Extrusion

Le système d'extrusion Bowden original a été remplacé par un *direct drive*, ce qui élimine l'hystérésis du filament et améliore le contrôle volumétrique, surtout pour les élastomères comme le TPU. Le contrôleur de mouvement a été upgradé vers le firmware Klipper, qui permet la compensation de résonance (*input shaping*) et le *pressure advance*.

## Architecture de Calcul

Les tests initiaux avec un Raspberry Pi Zero 2W donnaient des crashes aléatoires pendant l'exécution de G-code dense. Le CPU du Zero 2W manquait de ressources pour gérer simultanément les mouvements à haute vitesse et le *pressure advance* en temps réel. La migration vers un Raspberry Pi 4 (4GB) a réglé tous ces problèmes.

## Métriques de Performance

- **Vitesse Cinématique** : Jusqu'à 500 mm/s en déplacement.
- **Accélération** : 600% de la baseline OEM.
- **Surface d'Impression** : Plaque flex en acier PEI pour une adhérence constante sans adhésif.
- **Fiabilité** : Validée par des cycles d'impression multi-jours continus depuis 2023.
