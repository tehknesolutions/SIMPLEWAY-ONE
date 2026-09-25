# Player ↔ Campaign Integration Verification

Date: 2026-09-25
Branch: `feat/player-campaign-integration`

## Fresh release evidence

- E2E: `node --test tests/player-campaign-e2e.test.mjs` → 4/4 PASS, 0 FAIL.
- Full suite: `npm test` → 558/558 PASS, 0 FAIL.
- Static boundary scan → 0 prohibited matches.
- HNK first vertical pins `EN ZAMI HNK KE` byte-for-byte.
- Esperanto remains `NO_ELIGIBLE_MISSION`; Player fabricates no content.
- Explicit Player evidence appends to Journal and reloads deterministically by replay.
- Repeated-target evidence remains node-scoped.

## Integration commits

- `3552380` — Campaign Player Session boundary.
- `e4c0107` — Player actions replay through Journal.
- `7bc4ba6` — Campaign Mission Player view model.
- `7eacaab` — A1 Campaign first vertical.
- `8ce7fef` — Web Player driven by Campaign Sessions.

## Authority boundaries

Journal Replay remains authoritative. Projection and Player View Model are derived state. Mission selection remains Adaptive-owned inside legal Campaign state. UI does not promote snapshots or local navigation into authority.

## Explicitly unresolved

- The canonical A1 `180 × 7` allocation is not defined by this integration and was not invented.
- Esperanto realization for this first vertical remains unresolved.
- Legacy Lesson Runtime/View Model remains available; removal requires a separate cleanup decision.
- The first vertical proves one explicit `CONTACT / INTRODUCE` participation only; it does not claim the complete curriculum map.

## Static scan scope

`packages/app` and `apps/web` were scanned for language-ID branches, `Math.random`, implicit `Date.now/new Date`, mastery/proficiency verdicts, TODO/FIXME markers, and automatic `180 × 7` allocation. Result: 0 prohibited matches.
