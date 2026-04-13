# Système de Gestion Thermique Active : Batterie FPV

## Objectif Technique

Ingénier une solution de gestion thermique active et régulée pour les batteries Lithium-Polymer (LiPo) opérant dans des environnements sous-zéro (-30°C). Le système vise à atténuer l'augmentation de résistance interne et l'affaissement de tension subséquent associés à la cinétique chimique à basse température.

## Architecture du Système

Le hardware utilise des régulateurs *buck* 5V doubles pour la gestion d'énergie. Un régulateur primaire alimente le microcontrôleur ESP32-C3, tandis qu'un régulateur secondaire commuté drive un élément chauffant résistif en nichrome discret capable d'une sortie thermique de 5 watts. Le retour thermique est fourni par une thermistance NTC salvagée montée en contact direct avec les cellules.

## Résultats Opérationnels

Le déploiement initial a validé l'algorithme de régulation *bang-bang*. Dans des conditions statiques à -30°C et 0% de charge, le système a démontré une décroissance thermique de seulement 0.1°C/min (depuis une baseline de 21°C). Pendant les opérations de vol, la combinaison du chauffage résistif et de la chaleur induite par la résistance interne a stabilisé la température de la batterie à un setpoint opérationnel précis de 30°C.

## Analyse de Défaillance & Contrôles d'Ingénierie

Le système a subi une défaillance logique catastrophique due à un événement d'inversion de polarité lors de la maintenance sur le terrain.

- **Cause Racine** : Erreur humaine lors de la connexion de la batterie, facilitée par l'absence de connecteurs physiques polarisés et verrouillés.
- **Résultat** : Défaillance instantanée par surtension de l'étage de régulation *buck*.
- **Contrôles Futurs** : Implémentation de connecteurs polarisés standard (XT30/XT60) et circuits de protection contre l'inversion de polarité intégrés sont obligatoires pour les révisions suivantes.
