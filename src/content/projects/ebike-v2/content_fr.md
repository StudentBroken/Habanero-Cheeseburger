Après la panne du premier contrôleur de moteur, j'ai acheté un **VESC 6.7 Pro**. C'était la première fois que je dépensais une somme importante pour une seule pièce (120 $). Cela a rendu le moteur beaucoup plus fluide et a même permis au vélo de se recharger légèrement lors du freinage (freinage régénératif).

## Le Bypass du BMS

Dans la première version, la carte de sécurité de la batterie (BMS) brûlait constamment parce que je tirais trop de puissance. Pour corriger cela, j'ai reconstruit la batterie avec deux prises. Une prise passait par le BMS pour une charge sécurisée, mais l'autre prise allait directement au moteur, évitant toute sécurité.

![Installation de batterie à double sortie](/projects/ebike-v2/battery-dual-output.webp)
*Une prise est pour la charge, l'autre fournit une puissance brute directement au moteur.*

Ce n'était pas une bonne idée. Cela signifiait qu'il n'y avait aucune protection en cas de court-circuit. Je savais que c'était risqué, mais je voulais que le vélo soit rapide. J'ai aussi remarqué que le BMS d'origine avait des traces de brûlure là où il avait échoué.

![Marques de brûlure sur le BMS d'origine](/projects/ebike-v2/battery-burned-bms.webp)
*Le premier BMS ne pouvait pas supporter le courant et a commencé à fondre.*


## Configuration du VESC

Première utilisation d'un VESC. J'ai mis le courant batterie max à 40A, le courant moteur à 40A, et j'ai laissé la plupart des autres réglages par défaut après avoir lu ce que chaque paramètre faisait réellement. Le VESC gérait le moteur proprement et offrait le freinage par récupération — un énorme bond comparé à l'ESC RC, qui coupait simplement la puissance.

J'ai passé une journée là-dessus. À la fin de la journée, je comprenais les limites de courant, le contrôle du rapport cyclique, les modes d'entrée ADC, et pourquoi les ESC RC échouent dans cette application.

## Accélérateur Magnétique

J'ai aussi redessiné l'accélérateur. J'ai utilisé un petit module joystick et j'ai collé des aimants au bas. J'ai ensuite collé des aimants sur le guidon pour que le joystick puisse se fixer et s'enlever instantanément.

![Joystick magnétique](/projects/ebike-v2/joystick.webp)
*Le support magnétique permettait de retirer facilement l'accélérateur quand je stationnais le vélo.*


## Performance et l'Expo McGill

Vitesse de pointe autour de 40 km/h. Je n'avais ni écran ni wattmètre, donc je portais un multimètre dans mon sac sur le porte-bagages arrière et vérifiaient manuellement la tension de repos des cellules à chaque arrêt.

J'ai fait le trajet jusqu'à l'Expo d'Ingénierie de McGill cet été-là — 20 km depuis la Rive-Sud, en traversant le pont. Je suis arrivé avec le pack à environ 3,5V par cellule — suffisamment proche du seuil de coupure basse tension de 3,0V pour que je m'arrête. À l'expo, j'ai essayé de demander à l'équipe d'ingénierie si je pouvais emprunter une alimentation DC de banc pour charger mon pack à exactement 25,2V (4,2V/cellule × 6S). Personne ne m'a pris au sérieux. J'avais 13 ans.

## Nomenclature (BOM)

Le seul nouveau coût sur ce build était le VESC — tout le reste venait du v1.

| Composant | Coût |
|---|---|
| VESC 6.7 Pro | ~120,00 $ CAD |
| Module joystick | ~10,00 $ CAD (récupéré) |
| Aimants + époxy | ~5,00 $ CAD |
| **Total nouvelles dépenses** | **~135,00 $ CAD** |

## Post-Mortem

L'entraînement par friction était le point mécanique faible. Je retendais constamment le moteur contre le pneu. Cela a été aggravé par le **fluage du PLA** : le support principal du moteur était imprimé en 3D en PLA et maintenu sous tension constante pour garder le moteur pressé contre la roue. Le PLA se déforme sous une charge soutenue avec le temps. Je l'ai réalisé trop tard, et cela a servi de leçon permanente : ne jamais utiliser de plastique pour des supports de moteur structurels sous haute tension. Je suis passé au métal et je ne suis plus jamais revenu en arrière.

Vers la même époque, le VESC a lâché—spécifiquement le BEC (Battery Eliminator Circuit) interne. Je n'ai jamais découvert pourquoi il a cassé. À 13 ans, avec un fer à souder à 10$, j'ai essayé de le réparer moi-même après avoir été ignoré par un gars spécialisé en micro-soudure sur Facebook Marketplace. Comme on pouvait s'y attendre, essayer de faire de la micro-soudure sur un PCB haute densité avec un fer bon marché n'a fait que ruiner les pistes. Le VESC a fini par être mis au rebut.

La batterie restait le risque principal — et avec le recul, le bypass du BMS était une vraie mauvaise idée. À l'époque, toute mon expérience avec les batteries venait des packs LiPo avec nappe d'équilibrage. Sur un pack LiPo équilibré et chargé, on peut décharger jusqu'à environ 10% sans dérive significative entre les cellules — elles se suivent de près quand elles partent à la même tension. C'était mon modèle mental ici : si le pack était chargé et équilibré, il suffisait d'éviter un court-circuit franc et de ne pas trop décharger. Je n'avais pas encore compris qu'un pack fait de cellules de récupération avec des barres en cuivre soudées à la main et sans surveillance individuelle des cellules était une catégorie de risque fondamentalement différente. Je n'ai vraiment intégrié pourquoi ça importait qu'autour du v4-v5.

Le câblage aggravait les choses. J'avais acheté du fil à gaine PVC bon marché dans un magasin local. La gaine PVC commence à ramollir et fondre autour de 60–70°C, et à 40A le fil était clairement chaud. La gaine se déformait visiblement sur les longues sorties. Le fil silicone gère la chaleur correctement ; le PVC, non. C'était un risque d'incendie que je ne savais même pas que je portais.
