# SimpleWay A1 Semantic Curriculum V1.2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all generic V1.1 A1 semantic placeholders with 60 distinct communicative capability goals and 180 complete language-neutral Semantic-Pragmatic Contracts without changing structural IDs or authoring linguistic realizations.

**Architecture:** Preserve `A1_CURRICULUM` as the structural authority and add focused semantic catalog/schema modules keyed by its immutable IDs. Author family catalogs independently, validate them against one common contract validator, then compose a deterministic 180-contract semantic dataset consumed by the existing curriculum without modifying Language Pack evidence.

**Tech Stack:** Node.js ESM, built-in `node:test`, existing SimpleWay A1 modules, deterministic JSON/SHA-256.

**Spec:** `docs/specs/SIMPLEWAY_A1_SEMANTIC_CURRICULUM_V1_2.md`

## Global Constraints

- Preserve exactly **12 families / 60 capabilities / 180 Micro-capabilities / 7 cycles**.
- Preserve every V1.1 family, capability and Micro-capability ID byte-for-byte.
- Every Micro-capability contract contains `intent`, `interactionRole`, `semanticScope`, `pragmaticConditions`, `evidenceCriteria`, and non-empty `exclusions`.
- Universal semantic data contains no language-specific realization or inferred grammar.
- Existing HNK canonical bytes and all V1.1 authority/readiness behavior remain unchanged.

## Review Focus

- Generic numbered placeholder text must fail semantic validation rather than ship as a contract.
- Missing or empty exclusions must fail closed.
- A family catalog with a missing, duplicate or foreign capability/Micro-capability ID must fail composition.
- Universal contracts containing prohibited grammar prescriptions or literal language realizations must fail the forbidden-content scan.
- Composition order and canonical serialization must be deterministic regardless of object construction order.

---
### Task 1: Semantic Contract Schema and Validator

**Files:**
- Create: `packages/curriculum/a1/semantic-contract.mjs`
- Test: `tests/a1-semantic-contract.test.mjs`

**Interfaces:**
- Produces: `createSemanticContract(input)` and `validateSemanticContract(contract)`.
- Consumers: family semantic catalogs and final semantic dataset composer.

- [ ] Write failing tests requiring all six fields, array/object shape where appropriate, at least one exclusion, and three semantic depth records `core`, `context`, `boundary`.
- [ ] Add negative tests for placeholder patterns such as `capability 1`, empty evidence criteria, and forbidden prescriptions `word order`, `mandatory pronoun`, `present simple`, `copula`, `article`, `case`, `gender agreement`.
- [ ] Run `node --test tests/a1-semantic-contract.test.mjs`; verify RED because the semantic module does not exist.
- [ ] Implement immutable contract creation and fail-closed validation with explicit error messages; validation examines semantic fields only and does not inspect Language Packs.
- [ ] Run focused test and `npm test`; require the V1.1 baseline to remain green.
- [ ] Commit: `feat(a1): add semantic contract schema`.

### Task 2: Identity, Social Interaction, Existence and Needs Families

**Files:**
- Create: `packages/curriculum/a1/semantics/f01-identity-introduction.mjs`
- Create: `packages/curriculum/a1/semantics/f02-basic-social-interaction.mjs`
- Create: `packages/curriculum/a1/semantics/f03-existence-location.mjs`
- Create: `packages/curriculum/a1/semantics/f04-needs-wants-intention.mjs`
- Test: `tests/a1-semantics-f01-f04.test.mjs`

**Interfaces:**
- Consumes: immutable IDs from `A1_CURRICULUM`; `createSemanticContract(input)`.
- Produces: four family catalogs totaling **18 capability goals / 54 contracts**.

- [ ] Write failing tests asserting exact V1.1 IDs, 18 distinct non-placeholder capability goals, 54 complete contracts, and three contracts per capability.
- [ ] Author goals covering identity exchange, introductory information, social opening/closing/thanks, presence/location, immediate needs/wants/requests/intentions without prescribing grammar.
- [ ] For every capability author `m01` core operation, `m02` reciprocal/comprehension extension, and `m03` minimally novel transfer; each gets explicit boundary exclusions.
- [ ] Run focused + full suite and scan the four catalogs for language-specific literal realizations.
- [ ] Commit: `feat(a1): author semantic families 01 through 04`.
### Task 3: Actions, Reference, Quantity and Time Families

**Files:**
- Create: `packages/curriculum/a1/semantics/f05-actions-routine.mjs`
- Create: `packages/curriculum/a1/semantics/f06-people-objects-reference.mjs`
- Create: `packages/curriculum/a1/semantics/f07-quantity-basic-measure.mjs`
- Create: `packages/curriculum/a1/semantics/f08-time-sequence.mjs`
- Test: `tests/a1-semantics-f05-f08.test.mjs`

**Interfaces:**
- Consumes: V1.1 IDs and semantic contract schema.
- Produces: four family catalogs totaling **21 capability goals / 63 contracts**.

- [ ] Write failing tests for exact IDs, 21 distinct goals, 63 complete contracts, three contracts per capability, and forbidden-placeholder rejection.
- [ ] Author semantic goals for basic actions/routines, entity reference, practical number/amount/price/measure, and practical time/sequence; describe outcomes rather than verb tense, noun class or numeral morphology.
- [ ] Author all 63 `core/context/boundary` contracts with observable evidence criteria and exclusions.
- [ ] Run focused + full suite and forbidden-prescription scan.
- [ ] Commit: `feat(a1): author semantic families 05 through 08`.

### Task 4: Space, Description, Ability and Repair Families

**Files:**
- Create: `packages/curriculum/a1/semantics/f09-space-direction-movement.mjs`
- Create: `packages/curriculum/a1/semantics/f10-description-basic-comparison.mjs`
- Create: `packages/curriculum/a1/semantics/f11-ability-permission-preference.mjs`
- Create: `packages/curriculum/a1/semantics/f12-repair-communicative-survival.mjs`
- Test: `tests/a1-semantics-f09-f12.test.mjs`

**Interfaces:**
- Consumes: V1.1 IDs and semantic contract schema.
- Produces: four family catalogs totaling **21 capability goals / 63 contracts**.

- [ ] Write failing tests for exact IDs, 21 distinct goals, 63 complete contracts and explicit exclusions.
- [ ] Author goals for spatial relation/destination/movement, salient description/comparison, ability/permission/preference, and communication repair/survival.
- [ ] Include the language-use inquiry contract in repair/survival at the already mapped V1.1 target ID, but encode only its language-neutral intent; do not embed `EN ZAMI HNK KE` or English text in the semantic catalog.
- [ ] Run focused + full suite and forbidden-prescription/literal-realization scan.
- [ ] Commit: `feat(a1): author semantic families 09 through 12`.
### Task 5: Compose and Validate the 60/180 Semantic Dataset

**Files:**
- Create: `packages/curriculum/a1/semantic-curriculum.mjs`
- Create: `packages/curriculum/a1/validate-semantic-curriculum.mjs`
- Test: `tests/a1-semantic-curriculum.test.mjs`

**Interfaces:**
- Consumes: all 12 family catalogs and `A1_CURRICULUM`.
- Produces: `A1_SEMANTIC_CURRICULUM`, `validateA1SemanticCurriculum(dataset, structuralCurriculum)`.

- [ ] Write failing tests requiring exactly 12 semantic families, 60 capability goals, 180 contracts, exact structural ID set equality, and no duplicate/foreign/missing IDs.
- [ ] Add tests proving all 60 goals are distinct within their families, every contract validates, and shuffled catalog input serializes to the same canonical order.
- [ ] Implement composition ordered by the structural curriculum rather than import/object order; fail if any semantic entry cannot be matched exactly once.
- [ ] Run focused + full suite and `git diff --check`.
- [ ] Commit: `feat(a1): compose complete semantic curriculum`.

### Task 6: Attach Semantics Without Changing Structural Authority

**Files:**
- Modify: `packages/curriculum/a1/curriculum.mjs`
- Create: `packages/curriculum/a1/semantic-view.mjs`
- Test: `tests/a1-semantic-view.test.mjs`

**Interfaces:**
- Consumes: `A1_CURRICULUM`, `A1_SEMANTIC_CURRICULUM`.
- Produces: `createA1SemanticView(structural, semantic)` returning read-only joined records while leaving source objects unchanged.

- [ ] Write failing tests proving joined records expose real capability goals/contracts while structural IDs/counts/versioned V1.1 authority remain unchanged.
- [ ] Add regression tests that English/HNK/Esperanto Language Pack objects are byte-equivalent before and after creating the semantic view.
- [ ] Implement a pure ID-based join; do not copy semantic text into Language Pack realizations and do not mutate `A1_CURRICULUM`.
- [ ] Run focused + full suite.
- [ ] Commit: `feat(a1): expose semantic curriculum view`.
### Task 7: Semantic Quality and Forbidden-Content Audit

**Files:**
- Create: `packages/curriculum/a1/semantic-audit.mjs`
- Test: `tests/a1-semantic-audit.test.mjs`

**Interfaces:**
- Consumes: complete semantic dataset.
- Produces: `auditA1Semantics(dataset)` returning deterministic findings and `assertA1SemanticRelease(dataset)` failing on release-blocking findings.

- [ ] Write failing fixtures for numbered placeholders, duplicate goals, empty boundaries, grammar prescriptions, `EN ZAMI HNK KE`, `Do you speak HNK?`, and embedded language-pack surface fields.
- [ ] Implement deterministic audit categories `PLACEHOLDER`, `OVERLAP`, `MISSING_BOUNDARY`, `GRAMMAR_PRESCRIPTION`, `LITERAL_REALIZATION`, `SURFACE_LEAK`.
- [ ] Verify the real 180-contract dataset returns zero release-blocking findings while each bad fixture is caught by its expected category.
- [ ] Run focused + full suite.
- [ ] Commit: `test(a1): enforce semantic quality gates`.

### Task 8: V1.2 Release Verification

**Files:**
- Create: `tests/a1-semantic-v1-2-e2e.test.mjs`
- Create: `docs/research/A1_SEMANTIC_V1_2_VERIFICATION.md`

**Interfaces:**
- Consumes: structural curriculum, complete semantic dataset/view, semantic audit and existing Language Packs.
- Produces: reproducible release evidence and SHA-256 semantic dataset hash.

- [ ] Write E2E assertions for 12/60/180/7 preservation, 60 meaningful goals, 180 complete contracts, exact V1.1 ID equality, zero semantic-audit blockers and unchanged HNK canonical realization.
- [ ] Serialize the semantic dataset twice and assert byte/hash identity; record the SHA-256 in the verification document.
- [ ] Run the E2E suite, full repository suite, forbidden language-realization scan and `git diff --check`; require zero failures/blockers.
- [ ] Document exact test counts, hash, semantic counts, invariant checks and the boundary that V1.2 still does not author linguistic realizations.
- [ ] Commit: `test(a1): verify semantic curriculum v1.2`.

## Delivery sequence

Task 1 establishes the contract law. Tasks 2–4 author all 12 families in reviewable batches. Task 5 proves exact 60/180 composition. Task 6 exposes semantics without weakening V1.1 authority. Task 7 performs adversarial semantic quality checks. Task 8 is the release gate. Linguistic realization authoring remains outside V1.2.