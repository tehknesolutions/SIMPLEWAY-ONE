# SimpleWay Universal Learning Engine V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the deterministic universal curriculum/evidence/compiler foundation that can compile versioned SimpleWay courses for multiple languages without language-specific application branches.

**Architecture:** Extend the existing dependency-light ESM core in narrow modules. Introduce contracts from curriculum outward, then compiler/evidence projections, preserving the verified Player V1 boundary throughout.

**Tech Stack:** Node.js ESM, built-in `node:test`, browser-native ES modules, deterministic JSON/content hashing, existing static Web Player.

**Spec:** `docs/specs/SIMPLEWAY_UNIVERSAL_LEARNING_ENGINE_V1.md`

## Global Constraints

- Preserve `CURRICULUM != LANGUAGE != CONTENT != PLAYER`.
- No universal `mastered` or `isCorrect` source-of-truth fields.
- No language-name conditionals in universal Core/Player behavior.
- Unresolved content remains explicit; compiler never invents missing realizations.
- Published/released inputs are immutable and version-addressed.
- Compiler output is deterministic for identical versioned inputs.
- Existing Player V1 tests remain green throughout migration.

## Review Focus

- Malformed graph references fail closed with actionable errors.
- Partial/unresolved language coverage never leaks invented activity content.
- Version/hash changes propagate deterministically into compiled manifests.
- Evidence replay produces stable projections without mutating history.
- RTL/multimodal representation metadata survives compilation unchanged.

---
### Task 1: Curriculum Graph contracts

**Files:**
- Create: `packages/curriculum/capability-graph.mjs`
- Create: `packages/curriculum/semantic-pragmatic-contract.mjs`
- Test: `tests/curriculum-graph.test.mjs`

**Interfaces:**
- Produces: `createCapabilityGraph(input)`, `createSemanticPragmaticContract(input)` immutable validated values.

- [ ] Write failing tests for hierarchy, prerequisite references, duplicate IDs, missing nodes, immutable output, and semantic-pragmatic fields.
- [ ] Run `node --test tests/curriculum-graph.test.mjs`; verify RED for missing implementation.
- [ ] Implement minimal validators/builders with no CEFR-specific fields in graph authority.
- [ ] Re-run focused test, then `npm test`; require PASS.
- [ ] Commit: `feat(curriculum): add universal capability graph contracts`.

### Task 2: Level Profiles and Learning Paths

**Files:**
- Create: `packages/curriculum/level-profile.mjs`
- Create: `packages/curriculum/learning-path.mjs`
- Test: `tests/curriculum-paths.test.mjs`

**Interfaces:**
- Consumes: capability graph stable IDs.
- Produces: `createLevelProfile(input)`, `createLearningPath(input)`, graph/path compatibility validation.

- [ ] Write failing tests for A1 profile metadata, deterministic ordered route, invalid prerequisites, unknown capabilities, and version identity.
- [ ] Run focused test and confirm RED.
- [ ] Implement deterministic profile/path contracts without adaptive AI.
- [ ] Run focused + full suite.
- [ ] Commit: `feat(curriculum): add level profiles and learning paths`.
### Task 3: Representation Bundle and versioned Language Pack V2

**Files:**
- Create: `packages/language-packs/representation-bundle.mjs`
- Create: `packages/language-packs/language-pack-v2.mjs`
- Test: `tests/language-pack-v2.test.mjs`
- Modify: `packages/language-packs/catalog.mjs`

**Interfaces:**
- Produces: immutable bundles and packs with realization status, provenance, authority, version and compatibility metadata.

- [ ] Write failing tests for READY/PARTIAL/UNRESOLVED/NOT_APPLICABLE, LTR/RTL, optional audio/glyph/transliteration, provenance, and unknown feature preservation.
- [ ] Confirm RED.
- [ ] Implement minimal bundle/pack contracts and adapt existing English/HNK/Esperanto catalog without changing HNK canonical bytes.
- [ ] Run catalog, pack and full suites.
- [ ] Commit: `feat(packs): add versioned representation bundles`.

### Task 4: Activity Contract and Evaluation Policy

**Files:**
- Create: `packages/activities/activity-contract.mjs`
- Create: `packages/activities/evaluation-policy.mjs`
- Test: `tests/activity-contract.test.mjs`

**Interfaces:**
- Produces: renderer-independent activity descriptions and explicit evaluation policy references.

- [ ] Write failing tests for modalities, target micro-capabilities, supports, evidence types, renderer hints, and observational/non-binary evaluation.
- [ ] Confirm RED.
- [ ] Implement contracts; forbid universal correctness/mastery state fields.
- [ ] Run focused + full suite.
- [ ] Commit: `feat(activities): add universal activity contracts`.
### Task 5: Evidence Events, Profiles, and Progress Policy

**Files:**
- Create: `packages/evidence/evidence-event.mjs`
- Create: `packages/evidence/evidence-profile.mjs`
- Create: `packages/evidence/progress-policy.mjs`
- Test: `tests/evidence-engine.test.mjs`

**Interfaces:**
- Produces: append-only event contract, deterministic `projectEvidence(events)`, and explainable `evaluateProgress(profile, policy)`.

- [ ] Write failing tests for recognition/comprehension/recall/production/interaction/transfer/retention, support/attempt metadata, replay determinism, ordering, and immutable history.
- [ ] Confirm RED.
- [ ] Implement pure event validation and projections; progress returns decisions/reasons, never universal mastery.
- [ ] Run focused + full suite.
- [ ] Commit: `feat(evidence): add event sourced learner evidence`.

### Task 6: Deterministic Course Compiler

**Files:**
- Create: `packages/compiler/course-compiler.mjs`
- Create: `packages/compiler/canonical-json.mjs`
- Test: `tests/course-compiler.test.mjs`

**Interfaces:**
- Consumes: graph, profile, path, pack, activity/evaluation/progress policies and explicit version vector.
- Produces: `compileCourse(input)` immutable manifest plus deterministic SHA-256 content hash.

- [ ] Write failing tests for identical-build hashes, changed-input hashes, unresolved gaps, PARTIAL eligibility, NOT_APPLICABLE policy, missing-audio exclusion, and invalid references.
- [ ] Confirm RED.
- [ ] Implement canonical serialization and minimal compiler traversal.
- [ ] Run focused + full suite twice to prove deterministic output.
- [ ] Commit: `feat(compiler): add deterministic pedagogical compiler`.
### Task 7: Runtime bridge and Player compatibility

**Files:**
- Create: `packages/app/course-manifest-adapter.mjs`
- Modify: `packages/runtime/lesson-runtime.mjs`
- Modify: `packages/app/player-view-model.mjs`
- Test: `tests/course-player-bridge.test.mjs`

**Interfaces:**
- Consumes: compiled manifest.
- Produces: existing Runtime-compatible MicroLessons/View Model without language-specific branches.

- [ ] Write failing tests for English ready, HNK canonical, Esperanto unresolved, synthetic RTL, optional media, and progress preservation.
- [ ] Confirm RED.
- [ ] Implement the smallest adapter; do not move compiler authority into Runtime/Player.
- [ ] Run bridge + existing Player + full suites.
- [ ] Commit: `feat(player): consume compiled universal courses`.

### Task 8: Comparative model and transfer graph contracts

**Files:**
- Create: `packages/research/comparative-matrix.mjs`
- Create: `packages/research/transfer-graph.mjs`
- Test: `tests/comparative-engine.test.mjs`

**Interfaces:**
- Produces: typed EQUIVALENT/ANALOGOUS/NON_EQUIVALENT/UNIQUE relations and evidence-linked transfer hypotheses.

- [ ] Write failing tests for typed relations, evidence/provenance requirement, hypothesis authority, and invalid automatic promotion.
- [ ] Confirm RED.
- [ ] Implement data contracts only; no statistical inference in V1.
- [ ] Run focused + full suite.
- [ ] Commit: `feat(research): add comparative language contracts`.
### Task 9: A1 reference vertical and release verification

**Files:**
- Create: `packages/reference/a1-reference.mjs`
- Create: `docs/research/UNIVERSAL_ENGINE_V1_VERIFICATION.md`
- Test: `tests/universal-engine-e2e.test.mjs`
- Modify: `apps/web/app.mjs` only if bridge wiring requires it.

**Interfaces:**
- Produces: one deterministic A1 Standard Path compiled for English/HNK/Esperanto and exercised through the existing Player.

- [ ] Write failing E2E contract covering compile → runtime → view model for all three packs and a synthetic RTL fixture.
- [ ] Confirm RED.
- [ ] Build minimal reference graph/profile/path/policies using only validated current content; preserve Esperanto unresolved.
- [ ] Run E2E and `npm test`; inspect language-name branches and forbidden verdict fields.
- [ ] Run deterministic compiler twice and compare hashes; run `git diff --check` and verify clean status after commit.
- [ ] Document exact test counts, hashes, limitations, and version vector in verification report.
- [ ] Commit: `test(engine): verify universal learning engine v1`.

## Delivery sequence

Tasks 1–6 establish authority and compilation. Task 7 integrates without replacing the proven Player boundary. Task 8 adds the comparative research contract independently. Task 9 is the release gate and must not be claimed complete without fresh full-suite evidence.

After V1, authoring UI, advanced adaptive policies, additional modalities, and broader A1 content become separate plans rather than being folded into this foundation.