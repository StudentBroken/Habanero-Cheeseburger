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

Les mathématiques pour ce robot ont été la partie la plus difficile. J'ai dû écrire un logiciel personnalisé qui calcule exactement la longueur nécessaire pour chaque fil afin d'atteindre un point précis sur le tableau.

![Alimenté via USB-C PD](/projects/v-plotter/on-whiteboard-front.webp)
*Le robot suspendu sur un tableau blanc. Il utilise deux fils pour déplacer le stylo.*

Au lieu de simples coordonnées X et Y, le robot pense en longueurs de fils. Je l'ai programmé pour qu'il se réinitialise en tirant les deux fils au maximum, ce qui lui donne un point de départ connu avant de commencer à dessiner.


## Nomenclature (BOM)
J'ai essayé de rendre ce projet aussi peu coûteux que possible en utilisant des pièces communes.

- **Kit de mouvement** : 20,00 $
- **Cerveau (ESP32-C3)** : 1,00 $
- **Pièces de puissance** : 2,50 $
- **Servomoteur** : 2,00 $
- **Châssis imprimé en 3D** : 5,00 $

**Coût Total** : ~30,50 $


## Post-Mortem

Un échec important est survenu pendant les tests : les pilotes de moteur bon marché que j'ai achetés ne pouvaient pas supporter la puissance nécessaire pour soulever le stylo. Ils ont surchauffé et ont littéralement grillé.

![Pilote de moteur grillé](/projects/v-plotter/blown-a4988-driver.webp)
*L'un des pilotes de moteur qui a lâché pendant les tests. La prochaine fois, j'utiliserai des pièces de meilleure qualité.*

