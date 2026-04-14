# Drone FPV avec Gel Blaster

## L'Objectif
Je voulais monter un gel blaster sur un drone FPV de 6 pouces que je pourrais actionner à distance. Le but était de voir si je pouvais utiliser la caméra du drone pour viser et tirer tout en volant.

## La Construction
J'ai ajouté un gel blaster au châssis du drone et j'ai utilisé un petit circuit interrupteur (MOSFET) pour me permettre de déclencher le tir depuis ma radiocommande. J'ai utilisé la vidéo analogique car elle n'a aucun délai, ce qui est critique pour viser tout en bougeant.

- **Drone** : Configuration freestyle 6 pouces.
- **Caméra** : Système FPV analogique (zéro délai).
- **Blaster** : Pistolet à billes de gel intégré, déclenché à distance.

## Comportement en Vol
L'ajout du blaster a rendu le drone plus lourd et a changé son équilibre. J'ai dû recalibrer le contrôleur de vol (tuning PID) pour qu'il vole à nouveau en douceur et gère les vibrations causées par le tir. Au final, ça a super bien fonctionné et c'était vraiment amusant à piloter.
