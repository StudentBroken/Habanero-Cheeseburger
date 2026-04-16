# Vélo Électrique (v1)

J'ai construit ce vélo quand j'avais 13 ans. Je n'avais pas beaucoup d'argent, j'ai donc utilisé un système de "friction drive". Cela signifie que le moteur repose directement sur le pneu et le fait tourner à l'aide d'un morceau de ruban de papier de verre.

![Système de friction drive](/projects/ebike-v1/motor-friction.webp)
*Le papier de verre sur le moteur assure l'adhérence contre le pneu en caoutchouc.*

Ce n'était pas très efficace et le ruban s'usait rapidement, mais c'était le moyen le plus simple de faire avancer le vélo sans chaîne ni engrenages.

## Batterie Soudée à la Main

La batterie a été mon premier défi électronique majeur. J'ai utilisé 48 cellules 18650 individuelles que j'ai achetées sur Facebook Marketplace. Comme je n'avais pas de soudeuse par points, j'ai soudé des fils de cuivre épais directement sur les cellules.

![Bus de batterie soudé à la main](/projects/ebike-v1/battery-wiring.webp)
*J'ai utilisé des fils de cuivre épais provenant d'une vieille rallonge pour connecter les cellules.*

C'était une façon dangereuse de construire une batterie car la chaleur du fer à souder peut endommager les cellules. J'ai enveloppé le tout dans de la mousse et du ruban adhésif bleu pour que tout tienne ensemble.

## Conclusion

Le vélo a fonctionné pendant quelques semaines, atteignant environ 20 km/h. Finalement, le contrôleur de moteur bon marché (ESC) a grillé car il n'était pas conçu pour supporter le courant élevé nécessaire pour faire démarrer le vélo à l'arrêt.
