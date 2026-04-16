# Chargeur Intelligent pour Ebike

L'ebike roule sur un pack custom 12S bâti à partir de deux packs LiPo 6S en série. Le seul chargeur disponible était l'unité LiHV 6S qui venait originellement avec un skateboard électrique Leafboard Gen 1 — la même planche dont le moteur a ensuite été récupéré pour l'ebike v1 et le scooter sous-marin v1. Ce chargeur est conçu pour pousser les cellules à 4.35V chacune (26.1V pour un pack 6S) au lieu du maximum LiPo standard de 4.2V par cellule (25.2V). Faire rouler un chargeur LiHV sur des cellules LiPo standard risque la surcharge, le gonflement et éventuellement la défaillance des cellules.

La solution était un contrôleur de coupure à relais qui intercepte la sortie du chargeur et la déconnecte au bon moment.

## Conception de la Coupure

J'ai construit un contrôleur de coupure à relais simple pour un chargeur LiHV en utilisant un ESP32. J'ai ajouté une minuterie pour m'assurer qu'il ne s'éteigne pas trop tôt quand la tension chute sous la charge. Pour une version 2, je concevrais un vrai circuit de charge, car les relais mécaniques ne sont pas l'idéal pour couper de hautes puissances.

## Matériel

Le système utilise un petit ordinateur ESP32-C3 et un relais pour gérer la puissance. J'ai ajouté un écran OLED pour voir la progression de la charge et l'adresse IP de l'appareil d'un coup d'œil.

![Écran OLED affichant le progrès](/projects/smart-charger/oled.webp)
*L'écran OLED affiche la tension de la batterie et une barre de progression.*

## Interface Web

Au démarrage, le chargeur se connecte à votre WiFi. Vous pouvez ouvrir un tableau de bord sur votre téléphone ou votre ordinateur pour voir exactement ce qui se passe. J'ai ajouté des boutons pour allumer ou éteindre manuellement le chargeur, et une page de réglages pour changer des paramètres comme la tension de coupure sans avoir à réécrire le code.

![Tableau de bord web](/projects/smart-charger/webapp-top.webp)
*L'interface web permet de surveiller et de contrôler le chargeur depuis n'importe quel appareil.*


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
