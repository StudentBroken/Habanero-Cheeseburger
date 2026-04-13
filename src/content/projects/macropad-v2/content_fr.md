# Architecture Périphérique BLE : Macropad v2 (Intégration Visuelle & Analogique)

## Évolution du Design

L'objectif de la deuxième itération était l'intégration d'une interface multi-modale, ajoutant un retour visuel haute fidélité et un contrôle d'entrée analogique. Le projet s'est concentré sur l'expansion de la surface HID tout en maintenant l'architecture sans fil centrale établie dans la v1.

## Spécification Matérielle

Le système utilise le même microprocesseur ESP32-S3 mais étend l'interface I/O pour supporter un écran OLED I2C et un potentiomètre analogique (ADC).

- **Nœud Visuel** : OLED 0.96" (I2C), fournissant le statut de couche en temps réel et la télémétrie de mapping de touches dynamique.
- **Entrée Analogique** : Bouton potentiomètre avec routines de debounce au niveau firmware, mappé à des paramètres HID variables (audio système, indexation de défilement).
- **Nœud de Contrôle** : ESP32-S3 avec stack BLE HID.

## Intégration du Système

Le boîtier structurel a été radicalement re-ingénié pour accommoder le déplacement volumétrique accru du potentiomètre et du module d'affichage. Le moteur de configuration web du firmware a été migré avec succès depuis la v1, assurant la compatibilité ascendante pour le stockage de keymap non-volatile.

## Évaluation Opérationnelle

L'ajout du contrôle analogique a significativement amélioré l'efficacité du flux de travail pour les applications multimédia et basées sur des timelines. L'OLED intégré a réduit la charge cognitive en fournissant une confirmation visuelle immédiate du profil HID actif. Le Macropad v2 a transitionné avec succès d'un prototype à un *daily driver* opérationnel principal.
