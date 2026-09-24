# A1 Learning Experience Engine V1.3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deterministic Mission-first Learning Experience Engine that converts eligible A1 semantic targets plus validated Language Pack evidence into playable learning loops without inventing linguistic content.

**Architecture:** Keep V1.1 structural authority and V1.2 semantic authority unchanged. Add a separate `packages/experience/a1` layer: declarative Blueprints define pedagogy; a Mission Composer joins semantic targets, readiness and existing realizations; typed events record attempts/evidence; feedback and progression are pure projections over accepted evidence.

**Tech Stack:** Node.js ESM, built-in `node:test`, existing A1 semantic/readiness/compiler modules, deterministic JSON/SHA-256.

**Spec:** `docs/superpowers/specs/2026-09-24-a1-learning-experience-engine-v1-3-design.md`

## Global Constraints

- Mission is the primary playable unit.
- Mandatory loop: `MicroLesson → Scenario/Challenge → Attempt → Feedback → Evidence → Checkpoint`.
- No Mission may fabricate a linguistic realization; unresolved required evidence returns `BLOCKED`.
- Preserve V1.1 `12/60/180/7`, V1.2 `12/60/180`, semantic audit zero blockers, canonical HNK `EN ZAMI HNK KE`, and Esperanto unresolved state.
- Same inputs and version vector MUST produce byte-identical Mission serialization.

## Review Focus

- A target ID absent from the semantic graph must fail closed, not silently disappear.
- A required realization with `UNRESOLVED` coverage must produce `BLOCKED` with no surface payload.
- Duplicate/out-of-order target IDs must not make composition nondeterministic.
- Attempt/evidence events referencing another Mission or step must be rejected.
- Feedback/progression must never upgrade authority or infer mastery from exposure alone.

---### Task 1: Experience Blueprint Contract

**Files:**
- Create: `packages/experience/a1/blueprint.mjs`
- Create: `packages/experience/a1/default-mission-blueprint.mjs`
- Test: `tests/a1-experience-blueprint.test.mjs`

**Interfaces:**
- Produces: `createExperienceBlueprint(input)`, `validateExperienceBlueprint(blueprint)`, `A1_DEFAULT_MISSION_BLUEPRINT`.
- Consumers: Mission Composer.

- [ ] Write failing tests requiring stable `id`, `version`, ordered step definitions, required representation declarations and the mandatory learning-loop roles.
- [ ] Add negative fixtures for missing `Checkpoint`, duplicate step IDs, unknown step role, empty required representation and language-specific surface text embedded in a Blueprint.
- [ ] Run `node --test tests/a1-experience-blueprint.test.mjs`; verify RED because the module does not exist.
- [ ] Implement immutable Blueprint creation/validation and the minimal default Mission Blueprint; Blueprint data may name pedagogical roles but may not contain linguistic surfaces.
- [ ] Run focused test, `npm test`, and `git diff --check`.
- [ ] Commit: `feat(a1): add mission blueprint contract`.

### Task 2: Mission Composer and Gate Results

**Files:**
- Create: `packages/experience/a1/mission-composer.mjs`
- Create: `packages/experience/a1/mission-gates.mjs`
- Test: `tests/a1-mission-composer.test.mjs`

**Interfaces:**
- Consumes: `createA1SemanticView(structural, semantic)`, Blueprint, target Micro-capability IDs, readiness/coverage inputs, mapped existing realizations, version vector.
- Produces: `composeA1Mission(input)` returning immutable `{status:'READY', mission}` or `{status:'BLOCKED', reasons}`.

- [ ] Write failing READY fixture using the existing validated language-use inquiry realization and assert Mission provenance traces every step to target IDs.
- [ ] Write BLOCKED fixtures for unknown target, `UNRESOLVED` realization, missing required representation and insufficient evidence; assert blocked results contain no linguistic payload.
- [ ] Add duplicate/reordered target tests proving canonical structural ordering and stable output.
- [ ] Implement fail-closed gate evaluation, then deterministic Mission assembly from Blueprint steps and eligible evidence only.
- [ ] Run focused/full suites and `git diff --check`.
- [ ] Commit: `feat(a1): compose gated learning missions`.### Task 3: Canonical Mission Serialization

**Files:**
- Create: `packages/experience/a1/mission-serialization.mjs`
- Test: `tests/a1-mission-serialization.test.mjs`

**Interfaces:**
- Consumes: READY Mission object.
- Produces: `serializeMission(mission)`, `hashMission(mission)` using SHA-256.

- [ ] Write failing tests proving repeated serialization/hash identity and equality across equivalent input objects constructed with different property insertion order.
- [ ] Add mutation tests proving serialization does not mutate the Mission and rejects non-READY/incomplete Mission objects.
- [ ] Implement explicit canonical key ordering and SHA-256 over UTF-8 serialized bytes.
- [ ] Run focused/full suites.
- [ ] Commit: `feat(a1): add deterministic mission serialization`.

### Task 4: Attempt and Evidence Event Contracts

**Files:**
- Create: `packages/experience/a1/events.mjs`
- Test: `tests/a1-experience-events.test.mjs`

**Interfaces:**
- Produces: `createAttemptEvent(input)`, `createEvidenceEvent(input)`, `validateMissionEvent(event, mission)`.
- Consumers: Evidence Evaluator and Progression projection.

- [ ] Write failing tests for stable event IDs, Mission/step/target references, observable outcome payload, timestamp/value validation and immutable creation.
- [ ] Add adversarial tests rejecting events for another Mission, unknown step, target not traced by that step, malformed outcome and authority-bearing fields such as `canonical:true` or `validated:true`.
- [ ] Implement typed immutable event constructors and Mission-bound validation without modifying Language Pack or semantic authority.
- [ ] Run focused/full suites.
- [ ] Commit: `feat(a1): add learning attempt and evidence events`.

### Task 5: Evidence Evaluator

**Files:**
- Create: `packages/experience/a1/evidence-evaluator.mjs`
- Test: `tests/a1-evidence-evaluator.test.mjs`

**Interfaces:**
- Consumes: validated Attempt Event, Mission step, target semantic contract evidence criteria.
- Produces: `evaluateAttempt(input)` returning `INSUFFICIENT_EVIDENCE` or an immutable Evidence Event with bounded observations.

- [ ] Write failing tests where an observable outcome explicitly satisfies a declared semantic evidence criterion and where evidence is absent/ambiguous.
- [ ] Assert exposure alone, step completion alone and surface equality alone cannot produce accepted evidence.
- [ ] Implement criterion-bound projection; evaluator records what was observed and which criterion it supports, never linguistic correctness or mastery.
- [ ] Run focused/full suites.
- [ ] Commit: `feat(a1): evaluate mission evidence`.### Task 6: Feedback Contract

**Files:**
- Create: `packages/experience/a1/feedback.mjs`
- Test: `tests/a1-experience-feedback.test.mjs`

**Interfaces:**
- Consumes: Attempt Event plus optional accepted Evidence Event and semantic boundary.
- Produces: `createFeedback(input)` with `kind`, `observations`, `nextAction`, provenance and no authority mutation.

- [ ] Write failing tests for evidence-supported feedback, insufficient-evidence feedback and retry/continue next actions.
- [ ] Add tests proving feedback cannot contain `mastered`, `canonical`, `validated`, or invented correction surfaces when no validated correction evidence was supplied.
- [ ] Implement deterministic bounded feedback over supplied observations/evidence only.
- [ ] Run focused/full suites.
- [ ] Commit: `feat(a1): add bounded mission feedback`.

### Task 7: Progression State Projection

**Files:**
- Create: `packages/experience/a1/progression.mjs`
- Test: `tests/a1-experience-progression.test.mjs`

**Interfaces:**
- Consumes: target IDs, Mission lifecycle events and accepted Evidence Events.
- Produces: `projectProgression(input)` with states `UNSEEN`, `EXPOSED`, `EVIDENCED`, `CHECKPOINTED` per target.

- [ ] Write failing tests for each legal transition and deterministic replay from the same event stream.
- [ ] Add tests proving exposure cannot become `EVIDENCED`, rejected/insufficient evidence cannot advance state, and `CHECKPOINTED` requires an accepted checkpoint event tied to already evidenced targets.
- [ ] Implement pure event-fold projection; no mutable learner singleton and no `mastered` state.
- [ ] Run focused/full suites.
- [ ] Commit: `feat(a1): project evidence-based progression`.

### Task 8: Mission Runtime Loop

**Files:**
- Create: `packages/experience/a1/mission-runtime.mjs`
- Test: `tests/a1-mission-runtime.test.mjs`

**Interfaces:**
- Consumes: READY Mission, ordered events, evaluator, feedback and progression functions.
- Produces: `runMissionStep(input)` and `replayMission(input)` returning immutable runtime snapshots.

- [ ] Write failing E2E-like runtime test covering MicroLesson exposure → Scenario/Challenge attempt → feedback → accepted evidence → Checkpoint.
- [ ] Add retry path with insufficient evidence and assert the learner remains eligible to retry without authority/progression inflation.
- [ ] Implement pure runtime orchestration; runtime snapshots derive from Mission + events and are replayable.
- [ ] Run focused/full suites.
- [ ] Commit: `feat(a1): orchestrate mission learning loop`.### Task 9: V1.3 Release Verification

**Files:**
- Create: `tests/a1-learning-experience-v1-3-e2e.test.mjs`
- Create: `docs/research/A1_LEARNING_EXPERIENCE_V1_3_VERIFICATION.md`

**Interfaces:**
- Consumes: Blueprint, Mission Composer/serialization, events, evaluator, feedback, progression/runtime, V1.1/V1.2 fixtures.
- Produces: reproducible release evidence and canonical READY Mission SHA-256.

- [ ] Write release assertions for one READY Mission and one BLOCKED Mission, deterministic hash, complete traceability and replay-identical runtime state.
- [ ] Reassert V1.1 `12/60/180/7`, V1.2 `12/60/180`, zero semantic audit blockers, HNK canonical bytes unchanged and Esperanto still unresolved.
- [ ] Scan `packages/experience/a1` for language-name branching, literal HNK/English realization leakage, TODO/FIXME and forbidden authority verdict fields.
- [ ] Run E2E suite, full `npm test`, `git diff --check`, static scans and canonical hash generation; require zero failures/blockers.
- [ ] Document exact test counts, READY/BLOCKED fixtures, hash, invariants and V1.3 release boundary.
- [ ] Commit: `test(a1): verify learning experience engine v1.3`.

## Delivery Sequence

Task 1 establishes declarative pedagogy. Task 2 creates safe Mission composition. Task 3 locks determinism. Tasks 4–7 establish the evidence/feedback/progression event model. Task 8 makes the complete loop executable and replayable. Task 9 is the release gate.

The V1.3 runtime is deliberately not a language generator, translation engine or mastery oracle. It orchestrates only validated semantic/evidence inputs and reports explicit gates where the underlying Language Pack is incomplete.