# MBS — Outil de Suivi de Notes

MBS (Moyenne, Bilan, Stratégie) est une application web pour les élèves du secondaire québécois pour suivre, analyser et comparer leurs notes. C'est le premier projet que j'ai bâti avec un vrai collaborateur — Howard — et la première fois qu'on utilisait GitHub pour autre chose que lire du code.

Travailler avec quelqu'un à un rythme différent m'a appris à délimiter clairement les responsabilités. Howard a connecté le backend Google Sheets, construit l'outil de projection de notes et aidé à peaufiner le système de tickets. Moi j'ai tout bâti le reste : le formatter de données, le calculateur de moyennes avec pondérations par compétences, le leaderboard, toute la couche frontend et communication backend, le flux d'onboarding, le système d'opt-in, les conditions d'utilisation, la politique de confidentialité, la FAQ, la persistence localStorage, et j'ai dirigé le système de tickets. On a commencé en committant tout via l'interface web de GitHub. En 2026, j'ai commencé à migrer vers un workflow plus moderne.

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

## Onboarding, Légal & Confidentialité

Parce que l'outil manipule de vraies données de notes d'élèves, le travail non-technique était substantiel. J'ai écrit le flux d'onboarding pour amener les nouveaux utilisateurs de zéro à un tableau de bord rempli sans friction, construit le système d'opt-in pour le leaderboard, rédigé les conditions d'utilisation, la politique de confidentialité et la FAQ, et assuré la conformité RGPD pour les données stockées dans la feuille. Le système de tickets — construit avec Howard — permet aux utilisateurs de soumettre une demande formelle de suppression et de la suivre jusqu'à son traitement. Ça a forcé un modèle clair de quelles données existaient exactement, où elles vivaient, et qui pouvait y toucher.
