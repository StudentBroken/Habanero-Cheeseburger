# Plateforme de Dessin Cinématique : V-Bot (Traceur en V)

## Objectif Technique
L'objectif était l'ingénierie rapide d'un robot traceur en V portable et autonome pour le dessin vectoriel automatisé à grande échelle. La plateforme utilise une architecture suspendue à deux moteurs pas à pas pour traduire les coordonnées cartésiennes en mouvements de fils bipolaires de longueur variable basés sur des calculs de cinématique inverse en temps réel.

## Contexte de Développement & Cycle de Vie
Ce projet a été exécuté comme une construction à haute vélocité, progressant de la conception à un prototype fonctionnel en un temps minimal.
- **Conception 3D** : Le châssis et la nacelle ont été modélisés pendant les heures de cours (tâche de fond).
- **Logique Cinématique** : Les algorithmes de cinématique inverse de base ont été planifiés et calculés manuellement au verso d'une page d'examen lors d'une session d'examen formelle.
- **Fabrication** : L'assemblage du matériel et l'intégration logicielle ont été achevés en une seule **session postscolaire de 9 heures**.

## Architecture Matérielle & Distribution de l'Énergie
Le système fonctionne sur un rail à double tension alimenté via une interface **USB-C Power Delivery (PD)**, configurée pour tirer un courant constant de **12V** (pic de 2A) de la source.
- **Topologie DC-DC** : Le rail 12V alimente directement les pilotes de moteurs pas à pas. Un **BEC 5V** (Battery Eliminator Circuit) abaisse la tension du rail pour le contrôleur logique et le servo. Le rail logique est ensuite affiné via le **LDO 3,3V intégré de l'ESP32**.
- **Nœud de Calcul** : **ESP32-C3**, hébergeant un serveur web local pour la télémétrie sans fil du G-code et la surveillance du système.
- **Propulsion** : Deux moteurs pas à pas NEMA 17, suspendus par du fil à haute résistance.
- **Actionnement** : **Servo 9g** intégré pour l'engagement du stylo sur l'axe Z.
- **Gestion Thermique** : Refroidissement par air forcé (micro-ventilateur) positionné sur la rangée de pilotes pour atténuer l'étranglement thermique.

## Théorie Cinématique & Modèle Mathématique
Le mouvement du V-Bot est régi par la cinématique inverse, qui fait correspondre les coordonnées cartésiennes standard $(x, y)$ aux longueurs de câble spécifiques requises pour les deux moteurs de propulsion.

### 1. Analyse de la Géométrie
Le robot opère dans un plan cartésien 2D avec l'ancrage du moteur gauche servant généralement d'origine $(0,0)$.
- **Largeur d'Ancrage ($W$)** : Distance horizontale entre les moteurs.
- **Largeur de la Nacelle ($w$)** : Distance entre les points de fixation des câbles sur le chariot.

```text
(0,0)  Ancre Gauche                 Ancre Droite (W,0)
    ●──────────────────────────────────────●
     \                                    /
      \  L_gauche                L_droite /
       \                                /
        ●──────────────────────────────●
        (x - w/2, y)      |       (x + w/2, y)
                    [ Nacelle ]
```

### 2. Cinématique Inverse (IK)
Pour déplacer le stylo vers une coordonnée spécifique $(x, y)$, le micrologiciel calcule les longueurs de câble requises $L_g$ et $L_d$ en décalant la cible de la moitié de la largeur de la nacelle :

- **Longueur du câble gauche ($L_g$) :** $L_g = \sqrt{(x - w/2)^2 + y^2}$
- **Longueur du câble droit ($L_d$) :** $L_d = \sqrt{(W - (x + w/2))^2 + y^2}$

### 3. Cinématique Directe (FK)
Inverse de la logique de positionnement, la cinématique directe détermine l'emplacement réel $(x, y)$ du stylo en fonction des longueurs de câble actuelles — essentiel pour le calibrage et la validation de l'état.
- **Composante X :** $x = \frac{L_g^2 - L_d^2 - (w/2)^2 + (W - w/2)^2}{2(W - w)}$
- **Composante Y :** $y = \sqrt{L_g^2 - (x - w/2)^2}$

### 4. Logique de Calibrage & Mise à Zéro
Le système utilise une « mise à zéro sans capteur » en utilisant le modèle FK :
1. **Remise à zéro :** Les câbles sont entièrement rétractés ($L_g=0, L_d=0$).
2. **Relâchement défini :** Les moteurs relâchent une longueur précise de fil connue (ex: $2000mm$).
3. **Initialisation de l'état :** Le robot applique la formule de cinématique directe à ses valeurs $W$ et $L$ connues pour déduire sa coordonnée physique de départ $(x, y)$.

### 5. Résolution & Conversion en Pas
Les longueurs linéaires ($mm$) sont converties en pas moteurs discrets :

$$\text{Pas} = \text{Longueur (mm)} \times \text{Pas Par mm}$$

Parce que la géométrie suspendue est non linéaire, le contrôleur exécute ces calculs à haute fréquence pendant le déplacement pour assurer des mouvements vectorisés rectilignes.

## Nomenclature (BOM) & Optimisation Économique
Le projet a privilégié une réduction agressive des coûts grâce à l'achat en gros et à la récupération de composants.

- **Kit de mouvement (4x moteurs pas à pas, 4x A4988, shield type RAMPS, Arduino Uno)** : 20,00 $
- **Nœud logique (ESP32-C3)** : 1,00 $
- **Logique de puissance (Carte USB-C PD, BEC 5V)** : 2,50 $
- **Actionneur (Servo 9g)** : 2,00 $
- **Châssis (PLA imprimé en 3D + frais d'électricité)** : 5,00 $

**Coût Total du Système** : ~30,50 $

## Post-Mortem : Analyse de Défaillance
Le principal mode de défaillance identifié lors des tests a été la **défaillance catastrophique des pilotes de moteurs pas à pas A4988**. L'analyse a déterminé que la cause était la mauvaise qualité du silicium des pilotes inclus dans le kit « entrée de gamme » à 20 $. Bien qu'économiquement efficaces pour le prototype initial, les pilotes présentaient une instabilité thermique élevée et de faibles tolérances de courant, entraînant plusieurs unités grillées lors de mouvements verticaux à couple élevé. Les futures itérations nécessiteront des pilotes Trinamic de haute qualité pour une fiabilité accrue.
