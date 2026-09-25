# A1 Campaign Learning Path Engine V1.5 — Verification

**Date:** 2026-09-25
**Branch:** `feat/universal-engine-v1`

## Release fixture

The release fixture exercises explicit multi-cycle participation across CONTACT, REFERENCE, ACTION and CONTEXT, with a branched DAG and evidence-gated progression. The canonical 180×7 Cycle Map remains unresolved and is not fabricated by V1.5.

- V1.1: **12 families / 60 capabilities / 180 Micro-capabilities / 7 cycles**.
- V1.2: **12 semantic families / 60 goals / 180 semantic contracts**.
- HNK READY: `EN ZAMI HNK KE`.
- Esperanto remains `UNRESOLVED`; no linguistic payload is fabricated.
- V1.3 Mission SHA-256: `9e7435cf4ccf1d12d2c99e58e12ecf7a91cc7b4bf594c38665a069d1f24922fc`.
- V1.4 Adaptive SHA-256: `4344f0987798182c742732d2481ae986926cb7e46a36728a7f8750cf506a3690`.

## Replay and canonical artifacts

Journal Replay is authoritative; Projection and snapshot cache are disposable derived state. Deleting Projection and replaying the same Journal reproduces the same Projection and SHA-256. A divergent cache is classified `CACHE_STALE` and rebuilt from Journal authority.

Release fixture hashes:

- Campaign Definition SHA-256: `e6b0bc60bd5dabf4e0f5cb6452c594799f71b7caf0eff922f381d12413e3084c`
- Empty-Journal Projection SHA-256: `20f4ac6af27c920f050930a7b2f83fcbf4d5b98ff4299c411a16a8cf35b048f6`

Legal route expansion occurs only after the required explicit accepted-evidence/APPLY events. Campaign scope decides where the learner may legally go; V1.4 chooses the next eligible Mission inside that scope.

## Authority matrix

| Layer | Authority | Non-authority |
| --- | --- | --- |
| Cycle Map / Campaign Definition | declared journey structure and legal graph | linguistic truth, mastery |
| Journal | authoritative observed campaign events | inferred psychology or proficiency |
| Projection | deterministic replay-derived journey state | persistence authority |
| Evidence Gates | explicit route eligibility | automatic learner verdicts |
| V1.4 Adaptive Planner | next eligible Mission within legal scope | graph legality |
| Gamification | derived XP/badges/streak presentation | gates, evidence, Journal, Mission authority |

## Static release scan

`packages/campaign/a1` was scanned for TODO/FIXME markers, implicit random/time APIs, language-name branching, automatic 180×7 allocation and forbidden learner verdicts (`mastered`, intelligence/psychological labels, CEFR certification). The release scan returned no matches.

The unresolved boundary is intentional: V1.5 accepts explicit Cycle Map participation but does not invent the canonical allocation of all 180 Micro-capabilities across seven cycles.

## Verification gate

Task 10 requires the dedicated V1.5 E2E test, complete `npm test`, `git diff --check`, static scan and clean release diff before commit. Exact final test counts are recorded from the fresh release run rather than inferred from prior tasks.
