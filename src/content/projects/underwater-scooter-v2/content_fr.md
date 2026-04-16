# Scooter Sous-Marin Électrique (v2)

Un redesign brushless du scooter v1. L'objectif était simple : plus de vitesse, plus de poussée, et un système électrique plus propre — sans dépenser beaucoup plus que le build original. Le résultat est environ le double de la vitesse et plus du double de la puissance, en utilisant principalement des pièces récupérées.

## Pourquoi Brushless

La v1 utilisait des moteurs brushed pilotés directement par un interrupteur. Ça fonctionnait, mais la courbe de couple était plate et la vitesse maximale était limitée. Passer à un *outrunner* brushless déverrouille substantiellement plus de puissance de la même chimie de batterie, au coût d'avoir besoin d'un ESC et d'un firmware.

Le moteur est un *outrunner* 5065 récupéré d'un skateboard électrique Leafboard Gen 1. Les équivalents génériques se vendent environ 40 $ neufs. L'ESC est une unité étanche adaptée pour le tirage de courant, sourçée pour 25 $.

Une dure leçon de ce build : les ESC de drone ne sont pas adaptés pour la propulsion sous-marine. Ils sont optimisés pour des charges à haute RPM et faible couple. Les propulseurs sous-marins ont besoin de l'opposé — haute couple à basse RPM. Le rating KV sur les moteurs disponibles est aussi souvent non listé ou inconsistant, ce qui rend la sélection du bon moteur plus d'une expérience qu'un calcul.

## Électronique & Potting

L'unité centrale est un ESP32-C3 Super Mini. Un diviseur de tension résistif ramène la tension du pack 11.1 V (3S) à la plage ADC; le firmware lit ceci sur la pin 0 avec un facteur d'échelle de 8.78 et mappe la tension à un pourcentage de batterie. Une LED RGB (trois GPIOs séparés) affiche le résultat sous forme de dégradé de couleur — vert au-dessus de 80%, cyan à 60-80%, jaune-vert à 40-60%, jaune à 20-40%, et rouge en dessous.

Le câblage du bouton utilise le pull-up interne. Un *hold* déclenche le moteur au niveau de puissance actuel; relâcher l'arrête. Un double-appui (dans un délai de 300 ms) cycle à travers trois modes de puissance : HIGH (impulsion *forward* complète), MEDIUM (66% de la plage de *throttle*), et LOW (33%). Pendant la sélection de mode, la LED RGB affiche le mode sélectionné — rouge pour high, bleu pour medium, vert pour low — avant de retourner à l'affichage de batterie.

Maintenir le bouton au démarrage saute l'armement de l'ESC et entre en mode OTA (Over-The-Air), indiqué par une LED bleue qui pulse. C'était un impératif d'ingénierie, pas une fonctionnalité de confort : comme l'ESP32 est définitivement scellé dans du ruban électrique liquide, il y a zéro accès physique aux ports de debug ou série. Architecturer une sécurité OTA sans fil était le seul moyen de garantir que le matériel ne deviendrait pas une "brique" au moment où un cas limite logiciel serait découvert.

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
