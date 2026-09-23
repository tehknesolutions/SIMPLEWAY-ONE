# SimpleWay A1 Reference Curriculum V1.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Load-test the Universal Learning Engine with an exact 12-family / 60-capability / 180-micro-capability A1 graph while preserving explicit linguistic gaps and evidence-first authority.

**Architecture:** Add the curriculum as declarative, validated data over the existing universal graph contracts. Add typed dependency/cycle metadata, evidence envelopes, four readiness gates and coverage projections before mapping existing Language Packs. Compiler integration remains deterministic and must never author missing language content.

**Tech Stack:** Node.js ESM, built-in `node:test`, existing SimpleWay universal engine modules, deterministic JSON/SHA-256.

**Spec:** `docs/specs/SIMPLEWAY_A1_REFERENCE_CURRICULUM_V1_1.md`

## Global Constraints

- Exact structure: 12 families, 60 capabilities, 180 Micro-capabilities, 7 cycles.
- Curriculum needs are communicative, not English grammar categories.
- Missing realization remains `UNRESOLVED`; compilation never guesses.
- `PARTIAL` is coverage, not authority.
- AI output cannot directly become validated/canonical/ready authority.
- Existing HNK canonical bytes must remain unchanged.
- V1 132-test baseline must remain green.

## Review Focus

- Off-by-one or duplicate IDs must fail structural validation.
- Dependency cycles through `PREREQUISITE` must fail with actionable errors.
- Missing/invalid Evidence Envelopes must fail closed.
- Coverage must not count `PARTIAL` or `UNRESOLVED` as READY.
- Compiler must not emit modality-specific experiences when the relevant readiness gate is closed.

---
### Task 1: A1 Curriculum Schema and Exact Mathematics

**Files:**
- Create: `packages/curriculum/a1/curriculum.mjs`
- Create: `packages/curriculum/a1/validate-a1.mjs`
- Test: `tests/a1-curriculum-structure.test.mjs`

**Interfaces:**
- Produces: `A1_CURRICULUM`, `validateA1Curriculum(curriculum)`.
- Consumers: all later V1.1 tasks.

- [ ] Write failing tests asserting exactly 12 families, 60 unique capability IDs, 180 unique Micro-capability IDs, 7 cycle IDs, three Micro-capabilities per capability, and family totals matching the spec table.
- [ ] Run `node --test tests/a1-curriculum-structure.test.mjs`; verify RED because the A1 modules do not exist.
- [ ] Implement declarative family/capability/Micro-capability records and strict validator; each Micro-capability must include a Semantic-Pragmatic Contract ID and communicative intent field.
- [ ] Re-run focused test, then `npm test`; require PASS with the previous 132 tests preserved.
- [ ] Commit: `feat(a1): add exact universal curriculum spine`.

### Task 2: Typed Dependency Graph

**Files:**
- Create: `packages/curriculum/a1/dependencies.mjs`
- Test: `tests/a1-dependencies.test.mjs`

**Interfaces:**
- Consumes: `A1_CURRICULUM` stable Micro-capability IDs.
- Produces: `createA1DependencyGraph(edges)`, `validatePrerequisiteDAG(graph)`.

- [ ] Write failing tests for `PREREQUISITE`, `SUPPORTS`, `REINFORCES`, `CONTRASTS`, `TRANSFERS_TO`, `REVISITS`, unknown node rejection, duplicate-edge rejection and prerequisite-cycle detection.
- [ ] Confirm RED.
- [ ] Implement typed immutable edges and DAG validation only for blocking `PREREQUISITE` edges; nonblocking pedagogical relations may revisit earlier nodes.
- [ ] Run focused + full suite.
- [ ] Commit: `feat(a1): add typed pedagogical dependencies`.
### Task 3: Seven-Cycle Progression Model

**Files:**
- Create: `packages/curriculum/a1/cycles.mjs`
- Test: `tests/a1-cycles.test.mjs`

**Interfaces:**
- Produces: `A1_CYCLES`, `createCycleAssignment(input)`, `validateCycleAssignments(input)`.

- [ ] Write failing tests for exact cycle order `CONTACT, REFERENCE, ACTION, CONTEXT, INTERACTION, TRANSFER, AUTONOMY`, repeated Micro-capability appearances, and invalid cycle/node rejection.
- [ ] Confirm RED.
- [ ] Implement cycle definitions and immutable assignments without treating cycle position as curriculum authority.
- [ ] Verify focused + full suite.
- [ ] Commit: `feat(a1): add seven pedagogical cycles`.

### Task 4: Evidence Envelope and Authority Rules

**Files:**
- Create: `packages/authority/evidence-envelope.mjs`
- Create: `packages/authority/authority-transition.mjs`
- Test: `tests/evidence-envelope.test.mjs`

**Interfaces:**
- Produces: `createEvidenceEnvelope(input)`, `canTransitionAuthority(from,to,context)`.

- [ ] Write failing tests requiring source, provenance, authority, scope, validation history and version; test optional strength/hash; reject AI_GENERATED → VALIDATED/CANONICAL/READY direct promotion.
- [ ] Confirm RED.
- [ ] Implement explicit transition table `UNRESOLVED → CANDIDATE → VALIDATED → PEDAGOGICALLY_APPROVED → READY`; keep coverage status separate.
- [ ] Verify focused + full suite.
- [ ] Commit: `feat(authority): add evidence envelopes and promotion rules`.
### Task 5: Four Readiness Gates

**Files:**
- Create: `packages/curriculum/a1/readiness.mjs`
- Test: `tests/a1-readiness.test.mjs`

**Interfaces:**
- Produces: `evaluateReadiness(cell, experienceRequirements)` with linguistic, representation, pedagogical and evidence gate results.

- [ ] Write failing tests proving text may be eligible while listening is blocked by missing audio, linguistic UNRESOLVED blocks all realization-dependent experiences, and closed evidence gate blocks publication eligibility.
- [ ] Confirm RED.
- [ ] Implement pure gate evaluation returning eligibility plus explicit reasons; never synthesize missing surfaces.
- [ ] Verify focused + full suite.
- [ ] Commit: `feat(a1): add independent readiness gates`.

### Task 6: 180-Cell Language Coverage Matrix

**Files:**
- Create: `packages/curriculum/a1/coverage-matrix.mjs`
- Test: `tests/a1-coverage.test.mjs`

**Interfaces:**
- Consumes: exact 180-node A1 curriculum and Language Pack realizations.
- Produces: `buildCoverageMatrix(curriculum, pack)`, `summarizeCoverage(matrix)`.

- [ ] Write failing tests requiring exactly 180 cells per pack; verify READY/PARTIAL/UNRESOLVED/NOT_APPLICABLE counts and dimensions for linguistic, representation, activity, evidence and compilation coverage.
- [ ] Confirm RED.
- [ ] Implement matrix generation defaulting absent realizations to explicit UNRESOLVED cells rather than content.
- [ ] Verify focused + full suite.
- [ ] Commit: `feat(a1): add language coverage matrix`.
### Task 7: Map Existing Language-Pack Evidence

**Files:**
- Create: `packages/curriculum/a1/existing-realizations.mjs`
- Modify: `packages/language-packs/catalog.mjs`
- Test: `tests/a1-existing-realizations.test.mjs`

**Interfaces:**
- Produces: evidence-backed mappings from existing confirmed realizations to A1 Micro-capabilities; all unmapped cells remain unresolved.

- [ ] Write failing tests that preserve HNK `EN ZAMI HNK KE` byte-for-byte, preserve English current realization, keep Esperanto unresolved, and prohibit mappings without Evidence Envelopes.
- [ ] Confirm RED.
- [ ] Map only existing validated content; do not author new HNK/Esperanto grammar or lexical realizations in this task.
- [ ] Verify focused + full suite and snapshot coverage counts.
- [ ] Commit: `feat(a1): map existing validated realizations`.

### Task 8: Compiler Gate Integration

**Files:**
- Modify: `packages/compiler/course-compiler.mjs`
- Test: `tests/a1-compiler-gates.test.mjs`

**Interfaces:**
- Consumes: readiness evaluation and coverage cells.
- Produces: deterministic manifests containing eligible experiences plus explicit blocked/gap reasons.

- [ ] Write failing tests for reading-vs-listening eligibility, PARTIAL coverage, UNRESOLVED gaps, NOT_APPLICABLE policy and deterministic blocked-reason serialization.
- [ ] Confirm RED.
- [ ] Integrate gate evaluation without adding language-name conditionals or authoring behavior to compiler.
- [ ] Compile twice and compare canonical bytes/hash; run full suite.
- [ ] Commit: `feat(compiler): enforce a1 readiness gates`.
### Task 9: Mission/Challenge/Scenario Projection

**Files:**
- Create: `packages/curriculum/a1/experience-projection.mjs`
- Test: `tests/a1-experience-projection.test.mjs`

**Interfaces:**
- Produces: deterministic projections tagged `Mission`, `MicroLesson`, `Challenge`, `Review`, `Scenario`, or `Checkpoint`; graph authority remains unchanged.

- [ ] Write failing tests showing multiple Micro-capabilities can group into one experience, one Micro-capability can recur in later cycles, and grouping never duplicates curriculum IDs.
- [ ] Confirm RED.
- [ ] Implement deterministic grouping from eligible graph/cycle metadata; no adaptive AI in V1.1.
- [ ] Verify focused + full suite.
- [ ] Commit: `feat(a1): project curriculum into learning experiences`.

### Task 10: V1.1 Structural Release Verification

**Files:**
- Create: `tests/a1-v1-1-e2e.test.mjs`
- Create: `docs/research/A1_REFERENCE_V1_1_VERIFICATION.md`

**Interfaces:**
- Produces: release evidence for exact mathematics, coverage, gates, determinism and existing-language preservation.

- [ ] Write E2E tests asserting 12/60/180/7, 180 coverage cells for English/HNK/Esperanto, canonical HNK preservation, explicit unresolved gaps, and compile → Runtime → Player for eligible current content.
- [ ] Run E2E and full suite; require zero failures.
- [ ] Compile reference inputs twice and record SHA-256 hashes; run scans for language-name branches and forbidden universal verdict fields.
- [ ] Run `git diff --check`; document exact test counts, hashes, coverage counts, limitations and version vector.
- [ ] Commit: `test(a1): verify reference curriculum v1.1`.

## Delivery sequence

Tasks 1–3 establish the 12/60/180/7 curriculum authority. Tasks 4–6 establish evidence, readiness and measurable coverage. Task 7 maps only already-supported linguistic evidence. Tasks 8–9 make the compiler/product consume the richer model. Task 10 is the release gate. Broad linguistic authoring begins only after this structural V1.1 passes.