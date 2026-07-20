# Changelog — Double Kiss

Dated entries, newest first. Two sections: **App/UI** (site behaviour and
layout) and **Roster/season** (data.js edits — leave, lineups, ratings,
targets, results).

## App/UI

- 2026-07-20 — Added **Finals** to the schedule: Sat 21 & Sun 22 Nov (Vegas
  Showdown, top 16). Two `fixtures` entries (`ha:"Finals"`) shown on Roster
  (gold flat rows) and Home (next-match card + Upcoming, with a FINALS tag).
  New `isMatch()` helper so Finals/Byes are excluded from lineup, sub-alert,
  next-match and target-count logic. Cache-bust to `?v=14`.
- 2026-07-20 — New **Table allocations** page (`tables.html`): shows this
  round's full table draw (which teams are on tables 1–8), Double Kiss's
  table highlighted, plus the bye team. Linked from the Home page under the
  next-match card; subtitle shows the current round. Table data added to
  `data.js` (`tableAlloc`, all 16 weeks, from the Monday schedule PDF).
- 2026-07-20 — Removed the "Captain" label from the Roster page (lineup rows
  and squad list). Captaincy now shows on the Teams page only.
- 2026-07-20 — Cache-bust to `?v=13` across all pages (data.js / styles.css
  changed; new page added).

## Roster/season

- 2026-07-20 — **Lineups re-cut for rotation** (cache v16): even 9 games each
  (Angus 8) with nobody rostered more than 3 weeks in a row (was two 5-week
  runs). W1 (Oscar/Arul/Angus) and W2 (Tony/Kate/Arul) restored as Tony's fixed
  picks. Tony in Wk9 (Cue The Good Times); Wk4/Wk5 leave-forced. October rest
  weeks rotate across the four available players.
- 2026-07-20 — **Angus available all season** (was out Wk10–16); now a Finals
  contender (`finals:true`). Set **lineups rebalanced** to an even spread now
  he's back — Tony/Oscar/Kate/Arul 9 games each, Angus 8 (44 total). **Tony
  now plays Wk9 vs Cue The Good Times** (his request; no clash with his Wk4–5
  leave). Wk4 still only has 2 available (Tony/Kate/Arul all out) — fill-in
  still needed.
