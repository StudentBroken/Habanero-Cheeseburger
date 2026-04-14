# Macropad Mécanique Sans Fil (v1)

## L'Objectif
Je voulais construire un macropad sans fil personnalisé qui se connecte en Bluetooth. Le but était d'avoir des touches mécaniques qui répondent rapidement et qui peuvent être remappées facilement sans avoir à réécrire de code.

## Les Composants
J'ai utilisé un ESP32-S3 pour son Bluetooth intégré et j'ai connecté les interrupteurs mécaniques directement à ses broches pour une réponse ultra-rapide. Il fonctionne avec une petite batterie LiPo pour pouvoir l'utiliser n'importe où.

## Logiciel & Remappage
Le macropad agit comme un clavier Bluetooth standard, mais il héberge également un petit serveur Web. Vous pouvez vous connecter à ce site Web pour changer ce que fait chaque touche. Les nouveaux paramètres sont enregistrés directement sur l'appareil pour qu'il s'en souvienne même après avoir été éteint.

## Ce que j'ai appris
Ce macropad était vraiment utile pour le travail en CAO et d'autres applications avec beaucoup de raccourcis. Pouvoir changer les touches via un navigateur a bien fonctionné. Je l'ai utilisé comme clavier principal pendant quelques jours avant de commencer à travailler sur la version 2.
