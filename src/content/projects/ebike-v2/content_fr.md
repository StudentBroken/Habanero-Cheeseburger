# Vélo Électrique (v2)

Construit deux semaines après le v1, toujours à 13 ans. L'ESC RC venait de mourir, et mon père m'a offert un VESC 6.7 Pro — la première fois que je dépensais vraiment de l'argent sur une seule pièce, environ 120$ CAD. J'ai passé une journée entière à lire la documentation du VESC Tool et les forums pour comprendre comment le configurer. J'ai mis le courant moteur à 40A sur le même pack 6S8P en 18650 — 48 cellules au total, environ 5A par cellule. Gérable, mais la batterie était toujours le bricolage dangereux soudé au fer à souder du v1.

## Le Problème du BMS

Le BMS du v1 était limité à 12A en continu. Je tirais manifestement bien plus que ça, et il a grillé. J'ai reconstruit le pack avec un deuxième connecteur de sortie qui bypass entièrement le BMS pour la décharge. Un connecteur passe par le BMS pour charger ; l'autre va directement au VESC.

Ce n'est pas la bonne solution. Bypasser le BMS supprime la seule protection contre les surintensités et les courts-circuits sur un pack construit avec des barres en cuivre et un fer à souder à 10$. Mais c'était soit ça, soit rester lent. Je connaissais le risque et j'ai roulé quand même.

![Pack batterie avec deux connecteurs de sortie](/projects/ebike-v2/battery-dual-output.webp)
*Connecteur gauche : via BMS, limite 12A. Connecteur droit : direct aux cellules, sans protection.*

![Vue du dessus de la batterie montrant les marques de brûlure sur le BMS v1](/projects/ebike-v2/battery-burned-bms.webp)
*Le BMS v1 grillé — marques de brûlure visibles là où il a lâché sous charge.*

## Configuration du VESC

Première utilisation d'un VESC. J'ai mis le courant batterie max à 40A, le courant moteur à 40A, et j'ai laissé la plupart des autres réglages par défaut après avoir lu ce que chaque paramètre faisait réellement. Le VESC gérait le moteur proprement et offrait le freinage par récupération — un énorme bond comparé à l'ESC RC, qui coupait simplement la puissance.

J'ai passé une journée là-dessus. À la fin de la journée, je comprenais les limites de courant, le contrôle du rapport cyclique, les modes d'entrée ADC, et pourquoi les ESC RC échouent dans cette application.

## Accélérateur

L'ancien montage potentiomètre-plus-Arduino était abandonné. Le VESC a une entrée ADC native pour les signaux d'accélérateur analogiques. J'ai câblé directement la sortie analogique du module joystick à l'entrée ADC du VESC.

Le joystick lui-même était un module de télécommande de skateboard filaire nu, sans boîtier. J'ai collé à chaud des aimants dessous et époxylé des aimants correspondants sur le guidon. Il se détache et se rattache par simple contact. Pousser le stick en avant entraînait le moteur ; le tirer en arrière activait le freinage regen. Je pouvais lâcher le guidon et diriger avec le poids du corps tout en gardant un pouce sur le joystick.

![Connecteur d'entrée ADC VESC câblé au module joystick](/projects/ebike-v2/vesc-throttle.webp)
*Connecteur ADC VESC — câblage analogique direct, pas de microcontrôleur dans la boucle.*

![Module joystick avec aimants collés à chaud](/projects/ebike-v2/joystick.webp)
*Module joystick nu — aimants collés à chaud en dessous, colle aux supports époxy sur le guidon.*

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
