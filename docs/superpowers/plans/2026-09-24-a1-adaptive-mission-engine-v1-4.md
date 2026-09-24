# A1 Adaptive Mission Engine V1.4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deterministic, explainable adaptive planner that chooses the next eligible A1 Mission from observable learner evidence without inventing language or inferring mastery.

**Architecture:** Add `packages/adaptive/a1` above the V1.3 experience layer. Immutable policy + event-derived snapshot produce signals and candidates; existing V1.3 Mission composition remains the eligibility authority; lexicographic ranking selects a READY Mission and emits reason codes.

**Tech Stack:** Node.js ESM, built-in `node:test`, V1.1 curriculum, V1.2 semantics/readiness, V1.3 experience runtime/composer, deterministic JSON/SHA-256.

**Spec:** `docs/superpowers/specs/2026-09-24-a1-adaptive-mission-engine-v1-4-design.md`

## Global Constraints

- Default signal priority: `RETRY → REINFORCE → ADVANCE → REVIEW → NEW`.
- `BLOCKED` is diagnostic and never selectable.
- No hidden numeric learner/intelligence score, random selection, implicit wall-clock time, linguistic generation or mastery verdict.
- Preserve V1.1 `12/60/180/7`, V1.2 `12/60/180`, V1.3 READY/BLOCKED semantics, HNK `EN ZAMI HNK KE`, Esperanto unresolved coverage and V1.3 canonical Mission hash.
- Identical structural/semantic data, events, readiness, Language Pack, Blueprint, policy, `asOf` and version vector MUST produce byte-identical adaptive output.

## Review Focus

- Malformed/duplicate policy priorities fail closed rather than producing unstable ranking.
- Unknown/duplicate target IDs or invalid event references fail as schema/programmer errors.
- Missing `asOf` never silently reads system time for review eligibility.
- A higher-priority candidate that V1.3 blocks cannot leak linguistic payload or be selected.
- Retry exhaustion must move through declared policy behavior without fabricating evidence or trapping the campaign forever.

---### Task 1: Adaptive Policy Contract

**Files:** Create `packages/adaptive/a1/policy.mjs`; Test `tests/a1-adaptive-policy.test.mjs`.

**Interfaces:** Produces `createAdaptivePolicy(input)`, `validateAdaptivePolicy(policy)`, `A1_DEFAULT_ADAPTIVE_POLICY`.

- [ ] Write failing tests for immutable stable `id/version`, exact signal-priority permutation, retry/reinforcement limits, review rule, candidate limit, target-count bounds and deterministic tie-break declaration. Include duplicate/missing priority, negative limits, impossible bounds and language-specific literal fields.
- [ ] Run `node --test tests/a1-adaptive-policy.test.mjs`; require RED because the module does not exist.
- [ ] Implement minimal language-neutral validation and default policy with priority `['RETRY','REINFORCE','ADVANCE','REVIEW','NEW']`, bounded retry/reinforcement values and structural-order/stable-ID tie break.
- [ ] Run focused test, `npm test`, `git diff --check`.
- [ ] Commit `feat(a1): add adaptive mission policy contract`.

### Task 2: Evidence Snapshot Projection

**Files:** Create `packages/adaptive/a1/snapshot.mjs`; Test `tests/a1-adaptive-snapshot.test.mjs`.

**Interfaces:** Consumes `projectProgression({targetIds,events})`; produces `createAdaptiveSnapshot({targetIds,events,asOf})` with progression, attempts-since-evidence and supplied timestamps.

- [ ] Write failing tests for deterministic projection of `UNSEEN/EXPOSED/EVIDENCED/CHECKPOINTED`, retry counters reset by accepted evidence, explicit `asOf`, unknown target/event rejection and malformed timestamp rejection.
- [ ] Prove omitted `asOf` remains `null` and does not call/serialize current system time.
- [ ] Implement a pure immutable projection over append-only V1.3 events; never mutate events or synthesize history.
- [ ] Run focused/full suites and commit `feat(a1): derive adaptive evidence snapshot`.### Task 3: Adaptive Signal Derivation

**Files:** Create `packages/adaptive/a1/signals.mjs`; Test `tests/a1-adaptive-signals.test.mjs`.

**Interfaces:** Consumes one target snapshot + policy; produces `deriveAdaptiveSignal(input)` returning `{signal,reasonCodes}`.

- [ ] Write failing cases: `UNSEEN→NEW`, insufficient recent attempt within retry bound→`RETRY`, exhausted retry on unfinished target→`REINFORCE`, `EXPOSED→REINFORCE`, `EVIDENCED→ADVANCE`, checkpointed + explicit due review→`REVIEW`, checkpointed without due review→no actionable signal.
- [ ] Add tests proving no signal contains `mastered`, intelligence/psychological labels or linguistic authority.
- [ ] Implement closed signal derivation using snapshot/policy only; no language branching or current time.
- [ ] Run focused/full suites and commit `feat(a1): derive adaptive mission signals`.

### Task 4: Candidate Generation and Cycle Gates

**Files:** Create `packages/adaptive/a1/candidate-generator.mjs`; Test `tests/a1-adaptive-candidates.test.mjs`.

**Interfaces:** Consumes semantic view, snapshot, policy and Blueprint; produces immutable target candidate descriptors in V1.1 structural order before Mission eligibility.

- [ ] Write failing tests for all actionable signals, deterministic structural order, candidate limit, Blueprint target-count bounds and seven-cycle gating.
- [ ] Add malformed unknown/duplicate target tests and prove later-cycle targets remain unavailable until the explicit current-cycle prerequisite is satisfied.
- [ ] Implement candidate generation without linguistic surfaces; candidates carry target IDs, cycle, signal and reason codes only.
- [ ] Run focused/full suites and commit `feat(a1): generate adaptive mission candidates`.

### Task 5: Mission Eligibility Adapter

**Files:** Create `packages/adaptive/a1/mission-eligibility.mjs`; Test `tests/a1-adaptive-eligibility.test.mjs`.

**Interfaces:** Consumes candidate + existing `composeA1Mission()` inputs; produces `{eligibility:'READY',mission}` or `{eligibility:'BLOCKED',reasons}`.

- [ ] Write failing READY HNK and BLOCKED Esperanto fixtures using existing V1.3 composer/readiness/Language Pack contracts.
- [ ] Assert blocked candidates expose diagnostic reason codes but no `bundle`, primary surface or target-language payload; blocked candidates cannot be marked selectable.
- [ ] Implement a thin adapter calling V1.3 composition rather than duplicating its gates.
- [ ] Run focused/full suites and commit `feat(a1): gate adaptive candidates through missions`.### Task 6: Explainable Candidate Ranking

**Files:** Create `packages/adaptive/a1/candidate-ranker.mjs`; Test `tests/a1-adaptive-ranking.test.mjs`.

**Interfaces:** Consumes policy + eligible candidate descriptors; produces `rankAdaptiveCandidates(input)` ordered lexicographically with selection trace data.

- [ ] Write failing tests proving signal priority precedes structural order, structural order precedes stable target ID, input order does not affect output, and BLOCKED candidates never outrank/select over READY candidates.
- [ ] Add duplicate policy-priority rejection and exact reason-code assertions explaining pairwise ordering without hidden scores.
- [ ] Implement stable lexicographic ranking; do not add random values or opaque numeric learner scores.
- [ ] Run focused/full suites and commit `feat(a1): rank adaptive candidates deterministically`.

### Task 7: Adaptive Planner

**Files:** Create `packages/adaptive/a1/adaptive-planner.mjs`; Test `tests/a1-adaptive-planner.test.mjs`.

**Interfaces:** Consumes semantic view, events, readiness, Language Pack, Blueprint, policy, optional `asOf`, version vector; produces `selectNextMission(input)` with `SELECTED`, `NO_ELIGIBLE_MISSION`, or `CAMPAIGN_COMPLETE`.

- [ ] Write failing `SELECTED` test proving the highest-ranked READY Mission is returned with policy/signal/provenance/reason trace.
- [ ] Write `NO_ELIGIBLE_MISSION` where actionable candidates exist but all V1.3 gates block; ensure no linguistic payload leaks from blocked results.
- [ ] Write `CAMPAIGN_COMPLETE` where policy finds no actionable target, plus retry-exhaustion flow proving eventual reinforcement instead of infinite retry.
- [ ] Implement orchestration strictly from Tasks 1–6 and V1.3 composer; no duplicated readiness or language logic.
- [ ] Run focused/full suites and commit `feat(a1): select next adaptive mission`.

### Task 8: Canonical Adaptive Serialization

**Files:** Create `packages/adaptive/a1/adaptive-serialization.mjs`; Test `tests/a1-adaptive-serialization.test.mjs`.

**Interfaces:** Produces `serializeAdaptiveSelection(selection)`, `hashAdaptiveSelection(selection)`.

- [ ] Write failing tests for property-order independence, repeated byte/hash identity, immutability and rejection of malformed selection states.
- [ ] Implement explicit canonical recursive key ordering and SHA-256 over UTF-8 bytes, matching V1.3 determinism principles.
- [ ] Run focused/full suites and commit `feat(a1): serialize adaptive selections deterministically`.### Task 9: V1.4 Campaign and Release Verification

**Files:** Create `tests/a1-adaptive-mission-v1-4-e2e.test.mjs`; Create `docs/research/A1_ADAPTIVE_MISSION_V1_4_VERIFICATION.md`.

**Interfaces:** Consumes complete V1.4 planner and V1.1–V1.3 release fixtures; produces reproducible adaptive selection hash and release evidence.

- [ ] Write E2E campaign tests showing `NEW → RETRY/REINFORCE → ADVANCE → CHECKPOINTED`, deterministic review when explicit `asOf`/due input is supplied, and a blocked-language path that never fabricates a realization.
- [ ] Reassert V1.1 `12/60/180/7`, V1.2 `12/60/180`, zero semantic audit blockers, V1.3 READY/BLOCKED behavior, HNK canonical bytes, Esperanto unresolved status and V1.3 Mission SHA-256 `9e7435cf4ccf1d12d2c99e58e12ecf7a91cc7b4bf594c38665a069d1f24922fc`.
- [ ] Scan `packages/adaptive/a1` for TODO/FIXME, language-name branching, random/time APIs, target-language literals and forbidden learner verdicts such as `mastered`, intelligence or psychological labels.
- [ ] Run E2E, full `npm test`, `git diff --check`, static scans and canonical V1.4 hash generation; require zero failures/blockers.
- [ ] Document exact test counts, selected/blocked/complete fixtures, canonical hash, determinism inputs and authority boundary.
- [ ] Commit `test(a1): verify adaptive mission engine v1.4`.

## Delivery Sequence

Tasks 1–3 define policy, evidence state and signals. Tasks 4–6 transform those into structurally valid, V1.3-gated and explainably ranked candidates. Task 7 is the planner boundary, Task 8 locks deterministic serialization, and Task 9 proves the adaptive campaign while regression-locking V1.1–V1.3.

The V1.4 planner remains a pedagogical sequencer, not a language generator, learner-ranking system, psychological profiler or mastery oracle.