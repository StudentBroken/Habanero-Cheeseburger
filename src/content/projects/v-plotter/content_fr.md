# Plateforme de Dessin Cinématique : V-Bot (V-Plotter)

## Objectif Technique
L'objectif était l'ingénierie rapide d'un robot V-plotter portable et autonome pour le dessin vectoriel à grande échelle. La plateforme utilise une architecture suspendue à deux moteurs pas à pas pour traduire des coordonnées cartésiennes en mouvements de cordes bipolaires à longueur variable, basés sur des calculs de cinématique inverse en temps réel.

## Contexte de Développement et Cycle de Vie
Ce projet a été exécuté comme une construction à haute vélocité, passant de la conception à un prototype fonctionnel en un temps minimal.
- **Design 3D** : Le châssis et la nacelle (gondola) ont été modélisés durant les heures de cours (en tâche de fond).
- **Logique Cinématique** : Les algorithmes de cinématique inverse ont été planifiés et calculés manuellement au dos d'une feuille d'examen pendant une session d'examen officielle.
- **Fabrication** : L'assemblage du matériel et l'intégration logicielle ont été complétés en une seule **session de 9 heures après l'école**.

## Architecture Matérielle et Distribution d'Énergie
Le système fonctionne sur un rail à double tension alimenté via une interface **USB-C Power Delivery (PD)**, configurée pour tirer un **12V** constant (pic de 2A) de la source.
- **Topologie DC-DC** : Le rail 12V alimente directement les drivers de moteurs pas à pas. Un **BEC 5V** (Battery Eliminator Circuit) abaisse la tension pour le contrôleur logique et le servo. Le rail logique est ensuite affiné par le **LDO 3.3V intégré de l'ESP32**.
- **Nœud de Calcul** : **ESP32-C3**, hébergeant un serveur web local pour la télémétrie G-code sans fil et la surveillance du système.
- **Propulsion** : Deux moteurs pas à pas NEMA 17, suspendus par de la corde haute résistance.
- **Actionnement** : **Servo 9g** intégré pour l'engagement du stylo sur l'axe Z.
- **Gestion Thermique** : Refroidissement par air forcé (micro-ventilateur) positionné au-dessus de la rangée de drivers pour atténuer l'instabilité thermique.

## Théorie Cinématique & Modèle Mathématique
Le mouvement du V-Bot est régi par la Cinématique Inverse, qui traduit les coordonnées cartésiennes $(x, y)$ standards en longueurs de câbles spécifiques requises pour les deux moteurs de propulsion.

### 1. Analyse Géométrique
Le robot opère dans un plan cartésien 2D avec l'ancrage du moteur gauche servant généralement d'origine $(0,0)$.
- **Largeur d'Ancrage ($W$)** : Distance horizontale entre les moteurs.
- **Largeur de la Nacelle ($w$)** : Distance entre les points d'attache des câbles sur le chariot.

```text
(0,0)  Ancrage Gauche             Ancrage Droit (W,0)
    ●──────────────────────────────────────●
     \                                    /
      \  L_gauche                L_droit /
       \                                /
        ●──────────────────────────────●
        (x - w/2, y)      |       (x + w/2, y)
                    [ Nacelle ]
```

### 2. Cinématique Inverse (IK)
Pour positionner le stylo à une coordonnée $(x, y)$ précise, le firmware calcule les longueurs de câble requises $L_g$ et $L_d$ en appliquant un décalage correspondant à la moitié de la largeur de la nacelle :

- **Longueur Câble Gauche ($L_g$) :** $L_g = \sqrt{(x - w/2)^2 + y^2}$
- **Longueur Câble Droit ($L_d$) :** $L_d = \sqrt{(W - (x + w/2))^2 + y^2}$

### 3. Cinématique Directe (FK)
Inversement, la Cinématique Directe détermine la position $(x, y)$ réelle du stylo basée sur les longueurs de câbles actuelles — essentiel pour la calibration et la validation d'état.
- **Composante X :** $x = \frac{L_g^2 - L_d^2 - (w/2)^2 + (W - w/2)^2}{2(W - w)}$
- **Composante Y :** $y = \sqrt{L_g^2 - (x - w/2)^2}$

### 4. Logique de Calibration & Homing
Le système utilise un "Homing Sans Capteur" en exploitant le modèle FK :
1. **Remise à zéro :** Les câbles sont entièrement rétractés ($L_g=0, L_d=0$).
2. **Relâchement Défini :** Les moteurs relâchent une longueur de fil précise et connue (ex: $2000mm$).
3. **Initialisation d'État :** Le robot applique la formule de Cinématique Directe à ses valeurs $W$ et $L$ connues pour dériver sa coordonnée physique de départ $(x, y)$.

### 5. Résolution & Conversion en Pas
Les longueurs linéaires ($mm$) sont converties en pas moteurs discrets :
$$\text{Pas} = \text{Longueur (mm)} \times \text{Pas Par mm}$$
La géométrie suspendue étant non linéaire, le contrôleur exécute ces calculs à haute fréquence pendant le déplacement pour garantir des mouvements rectilignes vectorisés.

## Liste des Composants (BOM) et Optimisation Économique
Le projet a privilégié une réduction agressive des coûts via l'achat en gros et la récupération de composants.

- **Kit de Mouvement (4x Steppers, 4x A4988, shield type RAMPS, Arduino Uno)** : 20,00 $
- **Nœud Logique (ESP32-C3)** : 1,00 $
- **Logique de Puissance (Carte USB-C PD, BEC 5V)** : 2,50 $
- **Actionneur (Servo 9g)** : 2,00 $
- **Structure (Impression 3D PLA + frais d'électricité et temps machine)** : 5,00 $

**Coût Total du Système** : ~30,50 $

## Post-Mortem : Analyse de Défaillance
Le principal mode de défaillance identifié lors des tests a été la **défaillance catastrophique des drivers de moteurs A4988**. L'analyse a déterminé que la cause était la mauvaise qualité du silicium des drivers inclus dans le kit "entrée de gamme" à 20 $. Bien qu'économiquement efficace pour le prototype initial, les drivers ont montré une grande instabilité thermique et des tolérances de courant faibles, menant à plusieurs unités brûlées lors de mouvements verticaux à couple élevé. Les futures itérations nécessiteront des drivers Trinamic de haute qualité pour une fiabilité accrue.

