# SimpleWay A1 Adaptive Mission Engine V1.4 — Design

**Status:** PROPOSED SPEC — awaiting written-spec review  
**Date:** 2026-09-24  
**Depends on:** A1 Reference Curriculum V1.1 + Semantic Curriculum V1.2 + Learning Experience Engine V1.3

## 1. Intent

V1.4 turns the deterministic V1.3 Mission runtime into an explainable adaptive campaign planner. Given learner evidence/progression, eligible curriculum targets, Language Pack coverage and an explicit policy, the engine selects the next Mission without inventing language or inferring hidden mastery.

Success means identical curriculum, evidence, Language Pack, policy and version-vector inputs produce the same ordered candidate set, selected Mission and machine-readable selection reasons.

## 2. Architectural choice

V1.4 selects **deterministic policy-driven adaptation** rather than probabilistic/opaque tutoring. Adaptation is a projection over observable evidence and declared policy.

The flow is: `Evidence → Progression Snapshot → Candidate Targets → Eligibility Gates → Priority Signals → Ranked Candidates → Mission Selection → Reason Codes`.

The planner may prioritize pedagogy; it cannot create linguistic authority, semantic authority or a mastery verdict.
## 3. Non-goals

V1.4 does not use an LLM to choose lessons, predict psychology, estimate CEFR certification, generate target-language content, mutate Language Packs, award XP, persist learner accounts or schedule wall-clock notifications.

It does not replace V1.3 Mission composition/runtime. It selects targets and invokes those existing contracts.

## 4. Adaptive signals

The initial signal vocabulary is closed and explicit:

- `NEW`: target is `UNSEEN` and eligible for introduction.
- `RETRY`: a recent attempt produced insufficient evidence.
- `REINFORCE`: target is `EXPOSED` but not yet evidenced.
- `ADVANCE`: target is `EVIDENCED` but not checkpointed.
- `REVIEW`: target is `CHECKPOINTED` and an explicit review policy makes it due.
- `BLOCKED`: target cannot currently produce an eligible Mission; it is diagnostic, never selectable.

Signals describe planner state only. None means “mastered”, “weak student” or linguistic validity.
## 5. Adaptive Policy contract

An Adaptive Policy is immutable, language-neutral data with stable `id` and `version`. It declares signal priority, retry/reinforcement limits, review eligibility, candidate limits, Mission target-count bounds and deterministic tie-break rules.

The default V1.4 policy prioritizes unfinished evidence loops before introducing new material: `RETRY → REINFORCE → ADVANCE → REVIEW → NEW`. This is a policy default, not a universal pedagogical truth; alternate policies remain data rather than language/compiler branches.

Tie-breaking is deterministic: signal priority first, then curriculum structural order, then stable target ID. No random number or current wall-clock time participates unless an explicit timestamp is supplied as policy input.

## 6. Learner Evidence Snapshot

The planner consumes append-only V1.3 events and derives progression using the existing `projectProgression()` contract. It may additionally derive bounded counters such as attempts since accepted evidence and last supplied event timestamp.

Derived counters are projections, not editable learner truths. Missing history yields explicit unknown/default state rather than fabricated history.

## 7. Candidate generation

Candidate generation begins from V1.1/V1.2 Micro-capabilities in structural order. Each target receives its current progression state and an adaptive signal. Targets may be grouped only when the selected Blueprint target-count bounds and deterministic grouping rules allow it.
Every candidate is then passed through existing readiness/Language Pack/Mission composition gates. A V1.3 `BLOCKED` result remains blocked and is excluded from selectable candidates while preserving its reason codes for diagnostics.

## 8. Ranking and selection

Ranking is lexicographic and explainable, not a hidden numeric “intelligence score”. Each candidate carries `signal`, `policyPriority`, `structuralOrder`, `eligibility`, provenance and reason codes.

`selectNextMission()` returns one of:

- `SELECTED`: one READY Mission plus its selection trace;
- `NO_ELIGIBLE_MISSION`: candidates exist but all are blocked;
- `CAMPAIGN_COMPLETE`: policy finds no currently actionable target;
- programmer/schema exception for malformed IDs, policy or impossible input contracts.

The selection trace MUST be sufficient to explain why the chosen candidate preceded another without exposing or depending on opaque model reasoning.

## 9. Retry and reinforcement

An insufficient V1.3 attempt can produce `RETRY`; the planner may select the same target again according to policy. Retry count is bounded by policy so one target cannot monopolize the campaign indefinitely.

When the retry bound is reached without accepted evidence, the target moves to `REINFORCE` or a policy-declared support path. This changes pedagogy, never the semantic or linguistic source.
## 10. Review policy

V1.4 supports review only from explicit supplied policy/time inputs. It does not read system time internally. A review rule may use checkpoint event count, supplied elapsed-time metadata or explicit due-target IDs.

This keeps replay deterministic: the same snapshot and `asOf` input yield the same review candidates.

## 11. Seven-cycle campaign boundary

The seven existing curriculum cycles remain macrostructure, not seven hardcoded adaptive algorithms. The default policy cannot select a target from a later cycle until the policy's prerequisite condition for the current cycle is satisfied.

Cycle unlocking is evidence-based and explicit. It MUST NOT imply CEFR certification or global mastery of the earlier cycle.

## 12. Determinism, immutability and hashing

Policy, candidate set, selection trace and resulting Mission are deeply immutable. Canonical serialization uses explicit key ordering and SHA-256, extending the V1.3 determinism model.

Given identical structural/semantic datasets, events, readiness cells, Language Pack, Blueprint, policy, `asOf` and version vector, candidate ordering and selected output MUST serialize and hash identically.

## 13. Failure and safety boundaries

Unknown IDs, duplicate policy priorities, malformed timestamps, impossible target bounds and invalid event references fail closed as programmer/schema errors.
Domain incompleteness remains structured data: unresolved realization, missing representation or unavailable pedagogy yields `BLOCKED`, not guessed content.

The planner MUST NOT rank learners, infer intelligence, diagnose learning disorders, or infer emotional/psychological traits from attempts.

## 14. File boundaries

V1.4 adds focused modules under `packages/adaptive/a1/`: `policy.mjs`, `snapshot.mjs`, `signals.mjs`, `candidate-generator.mjs`, `candidate-ranker.mjs`, `adaptive-planner.mjs` and `adaptive-serialization.mjs`.

V1.3 modules under `packages/experience/a1/` remain the Mission authority. V1.4 calls them rather than duplicating Mission gates/runtime logic.

Tests remain one focused suite per adaptive component plus a V1.4 end-to-end release suite.

## 15. Testing and release contract

TDD is mandatory. Tests cover policy validation, signal derivation, retry bounds, review determinism, cycle gating, blocked exclusion, stable ranking, selection traces, immutability, canonical hashing and replay identity.

Regression gates preserve V1.1 `12/60/180/7`, V1.2 `12/60/180`, V1.3 READY/BLOCKED semantics, canonical HNK `EN ZAMI HNK KE`, Esperanto unresolved coverage, and the V1.3 release Mission hash unless a deliberately versioned fixture change is approved.

V1.4 is complete when the engine can deterministically choose and explain the next eligible Mission from learner evidence while preserving every structural, semantic, linguistic and epistemic authority boundary from V1.1–V1.3.

**Hard rule:** `adaptive priority ≠ learner mastery ≠ linguistic authority ≠ semantic authority`.