---
sidebar_position: 3
---

# Ranking & Rules

## 4.6 B - Tie-breaker Rules

AceTrack implements standard tennis tie-breaker rules:
- At **6-6** games in a set, a tie-breaker is played.
- The first player to reach **7 points** with a margin of **2 points** wins the set.
- **Score Representation**: The set score is recorded as `7-6` (with the tie-break score often noted in parenthesis).

## Scoring Logic

- **Points**: 0 (Love), 15, 30, 40, Game.
- **Deuce**: At 40-40, a player must win two consecutive points (Advantage -> Game) to win.
- **Sets**: Matches are typically Best of 3 or Best of 5 sets.

## Fair Play & Integrity

Our system ensures data integrity by:
- Validating score inputs (e.g., preventing impossible scores like 50-10).
- Tracking official umpire assignments for accountability.
