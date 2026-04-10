# V Plotter: V-Bot

Un robot portable conçu pour s'accrocher sur un tableau et dessiner utilisant un mécanisme de V-plotter avec deux moteures "stepper". Bâti comme une unité compacte et autonome pour amener aux événements pour du dessin automatisé à grande échelle.

## Design et Inspiration

Le concept vient d'un rêve d'enfance de bâtir un V-plotter. L'idée centrale était la portabilité: une petite gondole contenant les moteures, l'électronique et le mécanisme du stylo qui peut juste se clipper sur les côtés d'un tableau et commencer à dessiner.

Le design 3D a été fait au complet dans une seule journée. L'aménagement de la gondole a été humoristiquement inspiré par un crabe, ce qui a directement mené à la décision de lui mettre des "googly eyes"—surtout parce que le bloc dense d'électronique et de moteures ressemblait un peu à une bombe sans ça.

## Architecture Hardware

Le système est alimenté via une connexion 12V USB-C Power Delivery (PD) tirant un maximum de 2A. Un "buck converter" descend le voltage pour la logique.

- **Microcontrôleur** — Un ESP32-S3 héberge le firmware et sert une interface web au complet pour contrôler le robot sans fil.
- **Contrôle de Mouvement** — Deux moteures NEMA 17 gèrent le mouvement Cartésien X/Y, en utilisant la trigonométrie inhérente à la géométrie d'un V-plotter.
- **Actionnement du Stylo** — Un servo moteur 9g standard agit pour l'axe Z, levant et descendant le stylo de la surface.
- **Drivers et Refroidissement** — Les moteures sont contrôlés par deux drivers. Un petit ventilateur est mis directement au-dessus des drivers pour garder la température optimale et éviter que ça saute.

## Développement et Défis

Ce projet a requis l'application du kinématique inverse et de la trigonométrie pour traduire des coordonées standard 2d en rotations des moteures qui vont ensuite faire varier la longeure de la corde du plotter en v. Le montage méchanique et informatique, incluant le logiciel du esp32 et l'application web sont développés rapidement à travers une fin de semaine. 

Meme si c'est un prototype complètement fonctionelle comme un tour de magie, le robot es vraiment lent et desfois dessinne tout croche si pas bien callibrée. Malgré ces problèmes de friction, ça prouve avec succès le concept!
