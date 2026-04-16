# MBS — Outil de Suivi de Notes

MBS (Moyenne, Bilan, Stratégie) est une application web pour les élèves du secondaire québécois pour suivre, analyser et comparer leurs notes. L'outil a atteint 130 utilisateurs actifs, ce qui représente près de 50 % de l'ensemble du niveau Secondaire 5. C'est le premier projet que j'ai bâti avec un vrai collaborateur — Howard — et la première fois qu'on utilisait GitHub pour autre chose que lire du code.

Travailler avec quelqu'un à un rythme différent m'a appris à gérer un projet. Mon collaborateur Howard a connecté le backend Google Sheets et l'outil de projection. J'ai bâti tout le reste : le formateur de données, le calculateur de moyennes complexe, le classement (leaderboard) et l'interface utilisateur.

![Moyenne de l'élève](/projects/mbs-tool/mbs-main-data.webp)
*La page principale où les étudiants peuvent coller leurs données du portail scolaire.*


## Ingestion de Données

Les élèves collent les données brutes du portail dans la page de données. Le formatter que j'ai écrit normalise tous les formats de notation du système québécois — notes lettrées (A+, B−), pourcentages, décimales, fractions — sur une échelle 0–100 avant qu'un calcul tourne. Les notes sont ensuite pondérées par type d'évaluation et par étape sur les Étapes 1–3 pour le Secondaire 4 et 5.

Chaque snapshot parsé est horodaté et écrit en `localStorage`, pour que le tableau de bord suive l'évolution des notes dans le temps sans connexion ni session serveur persistante.

## Calculateur de Moyennes

Le moteur de moyenne pondérée tient compte des pondérations par compétence dans chaque matière et des pondérations par étape sur l'année. Il reflète le vrai modèle de notation québécois plutôt que de traiter toutes les notes également — c'est la principale raison pour laquelle les chiffres qu'il produit correspondent à la sortie officielle du portail.

## Leaderboard & Classements

Les élèves qui participent partagent leur objet `mbsData`. Le leaderboard filtre ceux avec une moyenne globale ≥ 70 et calcule rang et percentile :

```
percentile = (total − rang + 1) / total × 100
```

Les classements se trient par moyenne globale ou par matière. Un code couleur signale les 10 % du dessus et les 50 % du dessous d'un coup d'œil.

## Projections de Notes

Howard a bâti l'outil de projection : à partir des notes actuelles et des évaluations restantes, il modélise la moyenne finale nécessaire sur chaque prochaine évaluation pour atteindre une cible. Il tourne sur le même moteur de calcul pondéré.

## Le Résultat

L'outil est populaire parce qu'il est rapide et privé. Toutes les données sont traitées localement dans votre navigateur, donc personne d'autre ne voit vos notes à moins que vous ne choisissiez de rejoindre le classement. Ce projet a été une étape cruciale pour apprendre à gérer de vraies données utilisateurs et des systèmes de notation complexes.

![Tableau de bord de performance](/projects/mbs-tool/mbs-performance.webp)
*La page de statistiques montre vos tendances de performance dans différentes matières.*

