# Étude de Propulsion à Coût Zéro : Skateboard à Propulsion Pneumatique

## Objectif Technique

L'objectif était l'ingénierie d'une plateforme de skateboard motorisée en utilisant un modèle d'approvisionnement à "budget zéro". Le projet a servi d'étude exploratoire sur la propulsion non-mécanique (pneumatique) versus les architectures standard à courroie.

## Architecture de Propulsion

Le système s'écarte des topologies traditionnelles *hub* ou courroie en faveur d'un nœud de propulsion pneumatique monté à l'arrière.

- **Nœud de Puissance** : Batterie Lithium-Polymer (LiPo) 3S.
- **Transmission** : Moteur BLDC haute KV couplé avec une hélice multi-pales.
- **Intégration Aéronautique** : Un carénage FDM custom a été fabriqué pour optimiser les vecteurs d'airflow et contenir l'hélice haute vitesse.

## Spécification Matérielle

- **Moteur/ESC** : Suite de propulsion brushless entrée de gamme.
- **Châssis** : Deck de skateboard standard avec mounts de truck arrière modifiés.
- **Interface de Contrôle** : Lien radio RC 2.4GHz.

## Évaluation Opérationnelle

Les tests initiaux ont validé la viabilité fonctionnelle du modèle de propulsion pneumatique. Bien que le système ait montré une faible efficacité volumétrique et une sortie acoustique élevée comparé aux transmissions mécaniques, il a réussi à atteindre l'auto-propulsion sous charge. Le projet fournit des données conclusives sur les compromis puissance-poids impliqués dans les véhicules terrestres propulsés par ventilateur.
