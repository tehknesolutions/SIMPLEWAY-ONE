# A1 Adaptive Mission Engine V1.4 — Verification

**Date:** 2026-09-24  
**Branch:** `feat/universal-engine-v1`

## Release evidence

- V1.1 preserved: **12 families / 60 capabilities / 180 Micro-capabilities / 7 cycles**.
- V1.2 preserved: **12 semantic families / 60 goals / 180 semantic contracts**, zero semantic audit blockers.
- V1.3 READY/BLOCKED authority remains the Mission eligibility source.
- HNK READY retains canonical `EN ZAMI HNK KE`; Esperanto remains `UNRESOLVED` and produces no fabricated linguistic payload.
- V1.3 canonical Mission SHA-256 remains `9e7435cf4ccf1d12d2c99e58e12ecf7a91cc7b4bf594c38665a069d1f24922fc`.

## Adaptive READY selection

For the release HNK fixture with structural `1.1`, semantic `1.2`, experience `1.3`, adaptive `1.4`:

- Adaptive selection SHA-256: `4344f0987798182c742732d2481ae986926cb7e46a36728a7f8750cf506a3690`
- Canonical serialized UTF-8 bytes: `3717`
- Initial signal: `NEW`
- Result: `SELECTED`

## Campaign behavior

The verified adaptive path includes `NEW`, bounded `RETRY`, `REINFORCE` after retry exhaustion, `ADVANCE` after accepted evidence, and `REVIEW` only when explicitly due. A checkpointed target with no explicit review due input is not actionable.

`BLOCKED` is diagnostic and never selectable. Candidate ranking is lexicographic and explainable: READY before BLOCKED, then declared signal priority, structural order and stable target ID.

## Determinism and version boundary

No random source or implicit system clock participates in V1.4 planning. Review timing requires supplied data. Equivalent planner inputs serialize recursively by sorted keys and hash identically with SHA-256.

The adaptive `1.4` version belongs to the adaptive selection boundary and is deliberately stripped before invoking the V1.3 Mission composer. This preserves the V1.3 Mission's canonical provenance and hash rather than contaminating an older-layer artifact with a newer-layer version.

## Authority boundary

Adaptive priority is not learner mastery, linguistic authority or semantic authority. The planner sequences observable evidence; it does not generate language, rank learner intelligence, infer psychological traits, diagnose learning conditions or certify CEFR proficiency.
