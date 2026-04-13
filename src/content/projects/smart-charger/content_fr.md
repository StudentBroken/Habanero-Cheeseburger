# Chargeur Intelligent pour Ebike

L'ebike roule sur un pack custom 12S bâti à partir de deux packs LiPo 6S en série. Le seul chargeur disponible était l'unité LiHV 6S qui venait originellement avec un skateboard électrique Leafboard Gen 1 — la même planche dont le moteur a ensuite été récupéré pour l'ebike v1 et le scooter sous-marin v1. Ce chargeur est conçu pour pousser les cellules à 4.35V chacune (26.1V pour un pack 6S) au lieu du maximum LiPo standard de 4.2V par cellule (25.2V). Faire rouler un chargeur LiHV sur des cellules LiPo standard risque la surcharge, le gonflement et éventuellement la défaillance des cellules.

La solution était un contrôleur de coupure à relais qui intercepte la sortie du chargeur et la déconnecte au bon moment.

## Le Problème de la Coupure

Couper exactement à 25.2V (4.2V/cellule) sur la tension mesurée n'est pas assez précis. Pendant que le chargeur est actif, le courant qui circule à travers la résistance interne de la batterie gonfle la tension terminale mesurée au-dessus de la vraie tension des cellules. Si on coupe à 25.2V sous charge, les cellules n'ont atteint que ~4.0–4.1V — pas assez rechargées. Si on attend que la tension terminale descende à 25.2V, le chargeur a déjà dépassé.

L'approche ici est un **seuil de tension plus une minuterie de maintien**. Le relais reste activé jusqu'à ce que le pack atteigne 24.6V, puis maintient pendant 60 secondes. Pendant le maintien, le chargeur continue la phase d'absorption finale, complétant le remplissage des cellules. Quand la minuterie expire, le relais s'ouvre. Après la déconnexion du chargeur et la chute du courant à zéro, les cellules se stabilisent à environ 4.2V — juste à la limite sécuritaire. Le temps de maintien et la tension de coupure sont tous deux ajustables via l'interface web pour accommoder différentes résistances internes de cellules et courants de chargeur.

## Quincaillerie

Le diviseur de tension utilise R1 = 467 kΩ et R2 = 47.25 kΩ pour ramener la tension du pack à la plage ADC de l'ESP32-C3. La tension est calculée à partir de 50 échantillons ADC moyennés avec des coefficients de calibration linéaires (pente et décalage) pour corriger la non-linéarité de l'ADC. Un relais sur la pin 7 connecte et déconnecte la sortie du chargeur.

L'écran OLED (128×64, SSD1306 via I2C) affiche une barre de progression de charge, la tension du pack, le pourcentage de charge, le statut actuel, le compte à rebours de la minuterie de maintien quand active, et l'adresse IP du dispositif sur la dernière ligne.

## Interface Web

Au démarrage, le dispositif se connecte au WiFi et démarre un serveur HTTP. L'OLED affiche l'IP pour que tu puisses y naviguer depuis n'importe quel appareil sur le réseau. Le tableau de bord se met à jour toutes les 2 secondes avec la tension en direct, le pourcentage, l'état du relais et la progression de la minuterie de maintien. Des boutons manuels ON/OFF du relais permettent de bypasser la logique automatique. Tous les paramètres — tension de coupure, tension minimale, seuil sans charge, temps de maintien, coefficients de calibration, valeurs R1/R2, nombre d'échantillons et nombre de cellules — sont configurables depuis le formulaire de paramètres et persistés dans la NVS pour survivre aux redémarrages.

## Liste des Composants (BOM)

Les prix sont des estimations AliExpress; l'ESP32-C3 a été acheté pour 1 $.

| Composant | Coût Unitaire |
|---|---|
| ESP32-C3 Super Mini | 1.00 $ |
| Module OLED 0.96" SSD1306 (I2C) | 1.10 $ |
| Régulateur LDO 5V L7805CV | 0.45 $ |
| Module relais 5V monocanal | 1.00 $ |
| Transistor NPN (2N5551) | 0.05 $ |
| Résistances — 3× (2× diviseur de tension, 1× base transistor) | 0.02 $ |
| Condensateurs électrolytiques — 2× | 1.00 $ |
| Fil 22AWG (courtes longueurs) | 0.50 $ |
| Paire de connecteurs XT60 | 0.75 $ |
| **Total** | **~5.00 $** |

## Machine à États

La logique exécute quatre vérifications dans l'ordre à chaque cycle de mesure :

1. **Détection sans charge** — si la tension est au-dessus de 26.0V, la batterie n'est pas connectée (circuit ouvert). Relais off, pas de charge.
2. **Protection sous-tension** — en dessous de 18.0V, le pack est trop déchargé pour charger en sécurité. Relais off.
3. **Charge complète** — si la minuterie de maintien a déjà expiré cette session, le relais reste off.
4. **Charge normale** — relais on. Une fois que la tension atteint la coupure de 24.6V, la minuterie de maintien démarre. Quand elle expire, la charge est marquée complète et le relais s'ouvre.

Si la tension redescend sous la coupure pendant la période de maintien, la minuterie se réinitialise, empêchant une coupure prématurée lors des ondulations de sortie du chargeur.
