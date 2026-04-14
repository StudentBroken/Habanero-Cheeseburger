# Boîtier de Batterie FPV Chauffant

## L'Objectif
Je voulais garder mes batteries FPV au chaud pour pouvoir voler par temps glacial (jusqu'à -30°C). Quand les batteries LiPo deviennent trop froides, elles perdent de la puissance et la tension chute sous charge, j'ai donc construit un boîtier avec un chauffage intégré pour les maintenir à une bonne température.

## L'Électronique
J'ai utilisé deux régulateurs 5V : un pour le cerveau ESP32-C3 et un autre pour alimenter un fil chauffant en nichrome qui produit 5 watts de chaleur. J'ai utilisé une ancienne thermistance (capteur de température) pour surveiller la température de la batterie.

## Performance
Cela a très bien fonctionné. Même à -30°C, la température n'a chuté que de 0,1°C par minute lorsqu'elle n'était pas utilisée. Pendant le vol, le chauffage et la propre chaleur de la batterie ont tout maintenu à un stable 30°C, ce qui est parfait pour la performance.

## Pourquoi ça a cassé & Comment réparer
J'ai accidentellement branché la batterie à l'envers sur le terrain et j'ai grillé l'électronique.
- **Erreur** : Je n'ai pas utilisé de connecteur qui ne se branche que dans un seul sens.
- **Résultat** : Les régulateurs ont sauté immédiatement.
- **La prochaine fois** : Je dois utiliser des connecteurs polarisés appropriés (comme XT30 ou XT60) et ajouter un circuit pour protéger contre l'inversion de polarité.
