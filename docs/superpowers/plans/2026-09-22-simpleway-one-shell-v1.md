# SimpleWay One Shell V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first executable SimpleWay One vertical slice: one universal app shell and lesson runtime that can load an English fixture or the governed HNK/Chesed fixture through Language Packs without language-specific semantics in CORE.

**Architecture:** Start with a deliberately small web implementation whose boundaries mirror the Genesis Architecture. CORE owns pack-neutral contracts/runtime; UI owns shell/rendering; `languages/english` and `languages/hnk` own linguistic content. Tests enforce the boundary before production implementation. SWE is a source/reference for mature UX patterns; SW-HNK is the source for governed HNK contracts and Chesed content.

**Tech Stack:** JavaScript ES modules, HTML/CSS, Node built-in test runner for the first executable slice. No framework dependency in V1 unless a later reviewed task proves one necessary.

**Spec:** `docs/specs/SIMPLEWAY_ONE_GENESIS_ARCHITECTURE_V1.md`

## Global Constraints

- ONE APP · ONE CORE · MANY LANGUAGES · ONE EVOLVING METHOD.
- CORE must contain no English- or HNK-specific linguistic semantics.
- Language Packs own lexicon, grammar, phonology/orthography, valid utterances, language-specific media mappings and authority/evidence metadata.
- HNK content must preserve source/evidence governance and must not infer missing grammar.
- English content must not become universal truth merely because SWE already implements it.
- New production behavior follows RED → GREEN → REFACTOR TDD.
- V1 proves architecture; do not migrate Voice/AI/SRS wholesale yet.
- Do not destructively modify `SW-ENGLISH` or `simpleway-hnk`.

## Review Focus

1. Switching packs must not leak state or content from the previous language.
2. Missing/invalid pack fields must fail clearly instead of producing partially invented UI.
3. HNK authority metadata must survive runtime normalization and rendering.
4. English-specific locale/translation assumptions must remain outside CORE.
5. Mobile layout must remain usable at narrow widths without language-specific layout branches.

---

## Target file structure

```text
package.json
apps/simpleway/
  index.html
  src/main.mjs
  src/styles.css
packages/core/
  language-pack.mjs
  lesson-runtime.mjs
packages/ui/
  app-shell.mjs
  lesson-view.mjs
  design-tokens.css
packages/media/
  media-registry.mjs
languages/english/
  pack.mjs
  fixtures/a1-intro.mjs
languages/hnk/
  pack.mjs
  fixtures/chesed.mjs
tests/
  language-pack.test.mjs
  lesson-runtime.test.mjs
  dual-language-runtime.test.mjs
  media-registry.test.mjs
  architecture-boundary.test.mjs
```

Each file has one responsibility. V1 avoids prematurely creating every future package in the Genesis target tree.

### Task 1: Language Pack contract

**Files:**
- Create: `package.json`
- Create: `tests/language-pack.test.mjs`
- Create: `packages/core/language-pack.mjs`

- [ ] Write tests for a minimal valid pack: stable `id`, display metadata, lesson lookup, capability metadata, language-owned linguistic payload and optional authority metadata.
- [ ] Add tests proving malformed packs fail with explicit contract errors.
- [ ] Run tests and verify RED because the contract does not exist.
- [ ] Implement the smallest pack validator/normalizer that makes the tests pass without knowing English or HNK semantics.
- [ ] Run tests and verify GREEN.
- [ ] Refactor names/errors while preserving GREEN.
- [ ] Commit: `feat(core): add neutral language pack contract`.

### Task 2: Generic lesson runtime

**Files:**
- Create: `tests/lesson-runtime.test.mjs`
- Create: `packages/core/lesson-runtime.mjs`

- [ ] Write tests proving runtime accepts a validated pack + lesson ID and produces neutral session state (`lesson`, stages/items, progress cursor, pack identity).
- [ ] Test unknown lesson IDs and invalid runtime transitions.
- [ ] Test that authority metadata is passed through rather than interpreted by CORE.
- [ ] Run RED.
- [ ] Implement minimal runtime/session state machine.
- [ ] Run GREEN.
- [ ] Refactor while keeping language semantics opaque.
- [ ] Commit: `feat(core): add generic lesson runtime`.

### Task 3: Media registry contract

**Files:**
- Create: `tests/media-registry.test.mjs`
- Create: `packages/media/media-registry.mjs`

- [ ] Write tests for required/optional media resolution, unresolved required media and pack-provided semantic metadata.
- [ ] Verify RED.
- [ ] Implement neutral media registry/resolver.
- [ ] Verify GREEN.
- [ ] Ensure CORE never treats image meaning as linguistic evidence.
- [ ] Commit: `feat(media): add pack-neutral media registry`.

### Task 4: English Pack fixture

**Files:**
- Create: `languages/english/pack.mjs`
- Create: `languages/english/fixtures/a1-intro.mjs`
- Modify: `tests/dual-language-runtime.test.mjs`

- [ ] Write the English half of the dual-language test first, asserting the generic runtime loads the fixture through the pack contract.
- [ ] Verify RED.
- [ ] Add a deliberately small A1 English fixture derived from SWE concepts, keeping `en-US`, English text and any PT support inside the pack.
- [ ] Verify GREEN for English fixture.
- [ ] Commit: `feat(english): add first SimpleWay One language pack fixture`.

### Task 5: Governed HNK/Chesed Pack fixture

**Files:**
- Create: `languages/hnk/pack.mjs`
- Create: `languages/hnk/fixtures/chesed.mjs`
- Modify: `tests/dual-language-runtime.test.mjs`

- [ ] Write the HNK half of the dual-language test before implementation.
- [ ] Test that authority/evidence metadata remains intact and no English grammar fields are required.
- [ ] Verify RED.
- [ ] Port only confirmed Chesed surfaces/contracts required for the fixture from `simpleway-hnk`; preserve unresolved boundaries rather than inventing content.
- [ ] Verify GREEN for English + HNK using the same runtime.
- [ ] Commit: `feat(hnk): add governed Chesed language pack fixture`.

### Task 6: Architecture boundary validator

**Files:**
- Create: `tests/architecture-boundary.test.mjs`

- [ ] Write tests scanning `packages/core` for prohibited semantic branches/known language IDs and asserting pack fixtures live outside CORE.
- [ ] Include checks for hardcoded `en-US`, HNK lexemes and PT→EN/EN→PT semantics in CORE.
- [ ] Run test and fix any boundary leak discovered.
- [ ] Verify full suite GREEN.
- [ ] Commit: `test(architecture): enforce language-neutral core boundary`.

### Task 7: Universal UI shell

**Files:**
- Create: `packages/ui/design-tokens.css`
- Create: `packages/ui/app-shell.mjs`
- Create: `packages/ui/lesson-view.mjs`
- Create: `apps/simpleway/index.html`
- Create: `apps/simpleway/src/main.mjs`
- Create: `apps/simpleway/src/styles.css`

- [ ] Define a DOM-level smoke test or pure render-model test before production rendering code.
- [ ] Verify RED.
- [ ] Extract/adapt mature SWE design-token/responsive ideas without copying English content wiring.
- [ ] Implement navigation surfaces: Home, Learn, Practice, Speak, Codex, Progress.
- [ ] Implement Language Selector driven by registered packs.
- [ ] Render the generic runtime through a pack-neutral lesson view.
- [ ] Verify tests GREEN.
- [ ] Manually verify narrow/mobile and desktop layout.
- [ ] Commit: `feat(app): add SimpleWay One universal shell v1`.

### Task 8: Dual-language acceptance gate

**Files:**
- Modify/Create tests as needed under `tests/`
- Update: `README.md` if absent/create it

- [ ] Add acceptance test: load English, start lesson, switch to HNK, start Chesed, verify no state/content leakage.
- [ ] Add acceptance test: both packs use the exact same runtime implementation.
- [ ] Add acceptance test: missing required media reports unresolved state rather than fabricating fallback semantics.
- [ ] Run the complete test suite.
- [ ] Run architecture boundary test independently.
- [ ] Perform browser smoke test for both packs at desktop and mobile widths.
- [ ] Document local run/test commands and the source-repository roles in README.
- [ ] Commit: `test(release): close SimpleWay One Shell V1 acceptance gate`.

## Shell V1 Definition of Done

- One executable SimpleWay app shell exists.
- English and HNK are selectable Language Packs.
- Both use the same CORE runtime.
- Both use the same shell/navigation infrastructure.
- HNK retains governance metadata.
- English-specific behavior remains in English Pack.
- No linguistic `if language === ...` branches exist in CORE.
- Required media resolution is explicit.
- Automated tests pass.
- Desktop and mobile smoke checks pass.

## Deferred intentionally

- Full SWE content migration.
- Full HNK A1 migration.
- Production authentication/backend.
- Full Voice/NeuroVoice migration.
- AI tutor migration.
- SRS production engine.
- Teacher/Creator applications.
- Research telemetry backend.

Those belong to subsequent independently testable milestones after Shell V1 proves the universal boundary.