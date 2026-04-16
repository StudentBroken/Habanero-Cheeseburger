# V-Plotter : Robot Traceur Suspendu

## Objectif Technique
J'ai construit un traceur en V qui dessine en suspendant un module à stylo à deux moteurs pas à pas via des câbles. Les moteurs ajustent indépendamment la longueur des câbles pour déplacer le stylo sur une surface en fonction de calculs de cinématique inverse.

## Développement
Construit en quelques jours entre l'école et d'autres projets.
- **Conception** : J'ai modélisé le châssis et le chariot pendant les cours.
- **Cinématique** : J'ai résolu les mathématiques pour la cinématique inverse sur papier.
- **Fabrication** : J'ai assemblé le tout et intégré le code lors d'une seule session de 9 heures après l'école.

## Intégration Matérielle
Le système fonctionne sur 12V avec une alimentation USB-C Power Delivery (2A max).
- **Alimentation** : Le 12V alimente directement les pilotes de moteurs. Un régulateur 5V abaisse la tension pour la carte logique et le servo. L'ESP32 utilise son régulateur interne de 3.3V.
- **Contrôleur Principal** : ESP32-C3 exécutant un serveur web pour les commandes de dessin sans fil.
- **Moteurs** : Deux steppers NEMA 17 suspendus par du fil à haute résistance.
- **Contrôle du Stylo** : Un petit servo lève et abaisse le stylo (axe Z).
- **Refroidissement** : Un petit ventilateur refroidit les pilotes pour éviter la surchauffe.

## Cinématique Inverse
J'ai écrit un moteur de firmware ESP32 personnalisé pour calculer la cinématique inverse en temps réel d'un système de câbles suspendus. Les mathématiques traduisent les coordonnées cartésiennes (X,Y) standard en longueurs de ligne requises pour les steppers gauches et droits. J'ai utilisé la cinématique directe pour l'Initialisation d'État Connu (Known-State Initialization) : en rétractant complètement les câbles à zéro, puis en relâchant une longueur connue définie (par exemple 2000 mm), l'algorithme déduit la position de départ (X,Y) physique du robot. Ces mesures linéaires sont converties en pas moteurs et exécutées à haute fréquence pour assurer des mouvements vectoriels fluides.

## Nomenclature (BOM)
Le projet a privilégié une réduction drastique des coûts grâce à l'achat en gros et à la récupération de composants.

- **Kit de mouvement (4x steppers, 4x A4988, shield RAMPS, Arduino Uno)** : 20,00 $
- **Nœud logique (ESP32-C3)** : 1,00 $
- **Logique de puissance (Carte USB-C PD, BEC 5V)** : 2,50 $
- **Actionneur (Servo 9g)** : 2,00 $
- **Châssis (PLA imprimé en 3D)** : 5,00 $

**Coût Total du Système** : ~30,50 $

## Post-Mortem
Les pilotes de steppers du kit bon marché ont lâché pendant les tests. Ils ont surchauffé et grillé sous le couple élevé nécessaire pour les mouvements verticaux. Ces pilotes ne sont pas conçus pour supporter des tirages de courant continus. Les futures versions utiliseront des pilotes de meilleure qualité, type Trinamic, capables de gérer la charge de manière fiable.
