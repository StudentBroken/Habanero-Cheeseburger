# MBS — Student Grade Tracker

MBS (Moyenne, Bilan, Stratégie) is a web app for Quebec secondary school students to track, analyze, and rank their grades. The tool has reached 130 active users, representing nearly 50% of the entire Secondary 5 grade level. It was my first project with a real collaborator — Howard — and the first time either of us used GitHub beyond reading code.

Working with someone at a different pace taught me to scope cleanly. Howard connected the Google Sheets backend, built the grade projection tool, and helped refine the ticket system. I built everything else: the data formatter, the average calculator with competency weights, the leaderboard, the frontend and backend communication layer, the onboarding flow, the opt-in system, the terms and conditions, privacy policy, FAQ, the localStorage persistence, and a basic ticket system. We started by committing through GitHub's web interface, then moved to a more modern workflow.

## Data Ingestion

Students paste raw portal output into the data page. The formatter I wrote normalizes every grading format the Quebec system uses — letter grades (A+, B−), percentages, decimals, fractions — to a 0–100 scale before any calculation runs. Grades are then weighted by assessment type and term across Étapes 1–3 for both Secondaire 4 and 5.

Each parsed snapshot is timestamped and written to `localStorage`, so the dashboard tracks grade changes over time without requiring a login or a persistent server session.

## Average Calculator

The weighted average engine accounts for competency weights within each subject and term weights across the year. It mirrors the actual Quebec grading model rather than treating all grades equally — which is the main reason the numbers it produces match the official portal output.

## Leaderboard & Rankings

Students who opt in share their `mbsData` object. The leaderboard filters to anyone with a global average ≥ 70 and computes rank and percentile:

```
percentile = (total − rank + 1) / total × 100
```

Rankings can be sorted by overall average or by subject. Color coding flags the top 10% and bottom 50% at a glance.

## Grade Projections

Howard built the projection tool: given current grades and remaining assessments, it models the final average needed on each upcoming evaluation to hit a target. It runs on the same weighted calculation engine.

## Onboarding, Legal & Privacy

Because the tool handles real student grade data, the non-technical work was significant. I wrote the onboarding flow to get new users from zero to a populated dashboard without friction, built the opt-in system for the leaderboard, drafted the terms and conditions, privacy policy, and FAQ, and ensured GDPR compliance for data stored on the sheet. The ticket system — built together with Howard — lets users submit a formal deletion request and tracks it through to completion. That forced a clear model of exactly what data existed, where it lived, and who could touch it.
