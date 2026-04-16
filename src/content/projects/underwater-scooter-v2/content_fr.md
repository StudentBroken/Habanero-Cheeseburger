# Scooter Sous-Marin Électrique (v2)

Un redesign brushless du scooter v1. L'objectif était simple : plus de vitesse, plus de poussée, et un système électrique plus propre — sans dépenser beaucoup plus que le build original. Le résultat est environ le double de la vitesse et plus du double de la puissance, en utilisant principalement des pièces récupérées.

## Pourquoi le Brushless

La première version utilisait des moteurs simples qui n'étaient pas très puissants. Cette nouvelle version utilise un moteur brushless récupéré d'un vieux skateboard électrique. Il a beaucoup plus de couple et de puissance, ce qui rend le scooter deux fois plus rapide.

![Moteur brushless et ESC](/projects/underwater-scooter-v2/scooter-motor.webp)
*J'ai utilisé un moteur 5065 de skateboard et un contrôleur de vitesse (ESC) étanche.*

Une leçon apprise : les pièces de drone ne fonctionnent pas bien sous l'eau. Les drones ont besoin de vitesse, mais les hélices sous-marines ont besoin de couple. J'ai dû trouver un ESC spécifiquement conçu pour l'eau.

## Électronique & Potting

Le cerveau du scooter est un ESP32-C3. Il mesure la tension de la batterie et change la couleur d'une LED pour montrer l'énergie restante (vert pour plein, rouge pour vide). On peut aussi double-cliquer sur le bouton principal pour basculer entre les modes de puissance bas, moyen et haut.

![Électronique scellée](/projects/underwater-scooter-v2/scooter-esp32.webp)
*La carte de circuit est recouverte de ruban électrique liquide pour être 100 % étanche.*

Comme la carte est définitivement scellée, j'ai dû écrire un logiciel spécial qui me permet de mettre à jour le code sans fil. Si je n'avais pas ça, je devrais briser le sceau chaque fois que je voudrais changer quelque chose.


Cette technique de potting caoutchoutée scelle efficacement la carte contre les infiltrations d'eau sans l'encombrement d'un boîtier traditionnel, ramenant le coût de l'unité centrale à environ 5 $, matériel inclus.

## Logique du Firmware

Le firmware a été développé selon une approche hybride : j'ai utilisé l'IA pour générer les classes C++ de base et les implémentations standards, me permettant de concentrer mon attention entièrement sur l'architecture système de haut niveau.

L'effort principal d'ingénierie a été consacré à la définition d'une machine à états robuste pour gérer la transition entre les modes de puissance et les verrouillages de sécurité. J'ai établi des exigences strictes pour une classe de *debounce* personnalisée afin de filtrer le bruit de l'interrupteur sous-marin et conçu le chemin de démarrage OTA pour garantir la fiabilité dans un environnement scellé. La phase finale a consisté en un audit manuel du code généré pour identifier les failles logiques et les cas limites qui pourraient entraîner un emballement du moteur ou des problèmes thermiques.


## Design Mécanique

Le châssis est en PLA, conçu en CAD et imprimé sur une Ender 3. Faire rentrer tout ensemble a nécessité de nombreuses révisions — le moteur brushless est physiquement plus grand que les unités brushed de la v1, et l'ESC étanche ajoute du volume qui devait être routé soigneusement. Le design final est compact et tient bien ensemble.

Le coût du plastique pour le châssis était d'environ 10 $ en filament à travers toutes les itérations.

## Bill of Materials (BOM) & Optimisation Économique

Le redesign a privilégié une sortie de couple élevée tout en maintenant un profil de coût bas en exploitant du matériel de skateboard électrique récupéré et des techniques d'étanchéité économiques.

- **Propulsion Principale (Outrunner Brushless Leafboard 5065)** : Gratuit (Récupéré)
- **Contrôleur de Vitesse (ESC Étanche 60A)** : 25.00 $
- **Unité de Calcul (ESP32-C3 Super Mini + LED RGB)** : 4.00 $
- **Châssis (PLA Imprimé en 3D)** : 10.00 $
- **Stockage d'Énergie (2x Packs Li-Ion 21700 3S)** : 15.00 $ (Achat en Vrac)
- **Étanchéité Environnementale (Ruban Électrique Liquide)** : 5.00 $

**Coût Total Réel (Out-of-Pocket)** : ~59.00 $

## Leçons Apprises

- **Les ESC de drone lâchent sous l'eau.** Les caractéristiques de couple sont mauvaises pour les charges d'hélice à basse RPM. Utiliser un ESC adapté à l'application, pas du hardware de quadcopter recyclé.
- **Le KV est mal documenté sur les moteurs bon marché.** Si le KV n'est pas listé, s'attendre à tester empiriquement plutôt que de calculer les rapports de réduction ou le pas d'hélice à l'avance.
- **Le *potting* fonctionne.** Le tape électrique liquide est bon marché, facile à appliquer et efficace pour sceller les cartes basse hauteur. C'est maintenant l'approche par défaut pour tout l'électronique proche de l'eau.
