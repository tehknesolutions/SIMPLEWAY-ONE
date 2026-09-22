
### Task 1: Audit SWE visual/product surface

**Files:** Create `docs/research/SWE_UI_AUDIT_V1.md`

**Interfaces:** Consumes the current SWE repository/app. Produces a component-by-component migration matrix and exact source paths/assets used by Tasks 4–6.

- [ ] **Step 1: Inspect SWE source tree and package manifest**

Run a source-tree listing plus targeted searches for lesson pages, navigation, cards, vocabulary/media, feedback, progress and responsive styles. Record exact source paths.

- [ ] **Step 2: Inspect representative SWE lesson/UI files**

Read the files identified above and capture dependencies, content coupling and reusable visual tokens.

- [ ] **Step 3: Write the audit**

For every relevant surface, record `COPY/ADAPT`, `REBUILD`, `DISCARD` or `REFERENCE ONLY`, source path, reason, dependencies and ONE destination. Include identity/header/footer, lesson shell, cards, media, feedback, progress, navigation and responsive behavior.

- [ ] **Step 4: Verify audit completeness**

Run a text scan ensuring all four classifications and all required surface categories occur in the document.

- [ ] **Step 5: Commit**

```bash
git add docs/research/SWE_UI_AUDIT_V1.md
git commit -m "docs(player): audit SWE UI for universal shell"
```

### Task 2: Initial language-pack catalog

**Files:** Create `packages/language-packs/catalog.mjs`; Test `tests/language-pack-catalog.test.mjs`

**Interfaces:** Produces `listLanguagePacks()` and `getLanguagePack(id)`. Pack entries expose `id`, `label`, `status`, `level`, `microLessons`.

- [ ] **Step 1: Write failing tests**

Test that English/HNK/Esperanto are listed, HNK contains exact `EN ZAMI HNK KE`, Esperanto may be `content-unresolved`, unknown IDs return `null`, and returned collections cannot mutate registry state.

- [ ] **Step 2: Run the focused test and verify RED**

```bash
node --test tests/language-pack-catalog.test.mjs
```
Expected: FAIL because the catalog module does not exist.

- [ ] **Step 3: Implement minimal catalog**

Use `createUniversalMicroLesson()` for lesson construction. Do not invent an Esperanto utterance. Freeze/copy returned structures so callers cannot mutate registry authority.

- [ ] **Step 4: Run focused + full tests**

```bash
node --test tests/language-pack-catalog.test.mjs
npm test
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/language-packs/catalog.mjs tests/language-pack-catalog.test.mjs
git commit -m "feat(packs): add initial universal language catalog"
```

### Task 3: Pure Player View Model

**Files:** Create `packages/app/player-view-model.mjs`; Test `tests/player-view-model.test.mjs`

**Interfaces:** Consumes `{ runtime, microLesson }`; produces `{ language, status, stage, progress, capability, primaryRepresentation, auxiliaryRepresentations, direction, feedback, canAdvance }`.

- [ ] **Step 1: Write failing tests**

Cover ready primary content, unresolved content, RTL projection, progress derived from Runtime, missing media tolerance, and no `mastered`/`isCorrect` field. Include the Review Focus unresolved/RTL cases.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/player-view-model.test.mjs
```
Expected: module-not-found failure.

- [ ] **Step 3: Implement the pure projection**

No DOM access and no language-name branches. Read stage from the MicroLesson cycle and progress from Runtime. Keep optional media nullable.

- [ ] **Step 4: Run focused + full tests**

```bash
node --test tests/player-view-model.test.mjs
npm test
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/app/player-view-model.mjs tests/player-view-model.test.mjs
git commit -m "feat(app): add universal player view model"
```

### Task 4: Web shell and extracted visual system

**Files:** Create `apps/web/index.html`, `apps/web/styles.css`; Test `tests/web-player-smoke.test.mjs`

**Interfaces:** HTML exposes `#language-selector`, `#lesson-list`, `#player`, `#feedback`, `#progress`, and action controls consumed by Task 5. CSS consumes semantic classes/data attributes, including `[dir=rtl]` only on language content.

- [ ] **Step 1: Write failing smoke tests**

Read `index.html`/`styles.css` and assert semantic mounts exist, viewport/mobile metadata exists, unresolved/media-optional styles exist, and RTL selector is scoped to content rather than app chrome.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/web-player-smoke.test.mjs
```
Expected: FAIL because web shell files do not exist.

- [ ] **Step 3: Build semantic shell from SWE audit**

Implement only patterns classified COPY/ADAPT or REBUILD in Task 1. Preserve SimpleWay visual identity while replacing English-specific copy/layout assumptions with neutral slots.

- [ ] **Step 4: Run smoke + full tests**

```bash
node --test tests/web-player-smoke.test.mjs
npm test
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/index.html apps/web/styles.css tests/web-player-smoke.test.mjs
git commit -m "feat(web): add SimpleWay One universal shell"
```

### Task 5: Browser controller and lesson lifecycle

**Files:** Create `apps/web/app.mjs`; Modify `apps/web/index.html`; Modify `tests/web-player-smoke.test.mjs`

**Interfaces:** Consumes `listLanguagePacks/getLanguagePack`, `createLessonRuntime/advanceLessonRuntime/recordLessonEvidence`, and `createPlayerViewModel`. Owns only browser/session state.

- [ ] **Step 1: Extend failing smoke tests**

Assert controller imports universal modules, language selection creates a fresh Runtime, switching languages resets lesson/evidence state, unresolved lessons disable advancement requiring content, and action failure restores last valid runtime snapshot.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/web-player-smoke.test.mjs
```
Expected: FAIL because controller behavior is absent.

- [ ] **Step 3: Implement controller**

Render selector → level/lesson → Player. Advance only through Runtime functions. Wrap runtime actions so errors render recoverable feedback while retaining previous state. Never branch on `english`, `hnk` or `esperanto` to choose UI behavior.

- [ ] **Step 4: Run focused + full tests**

```bash
node --test tests/web-player-smoke.test.mjs
npm test
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app.mjs apps/web/index.html tests/web-player-smoke.test.mjs
git commit -m "feat(web): connect universal player to lesson runtime"
```

### Task 6: SWE media/content adaptation and responsive QA

**Files:** Modify `apps/web/styles.css`, `packages/language-packs/catalog.mjs`; add only audited assets under `apps/web/assets/`; Modify relevant tests.

**Interfaces:** Language Pack may expose optional `media: { type, src, alt }`; view-model passes it through; web shell renders it when valid and collapses media region when absent.

- [ ] **Step 1: Add failing media/responsive tests**

Test missing media produces a valid view model, optional media metadata passes through, and web smoke fixture contains responsive breakpoints plus image containment rules.

- [ ] **Step 2: Verify RED**

Run focused view-model and web smoke tests; expect failures for missing media behavior.

- [ ] **Step 3: Adapt only approved SWE assets/patterns**

Copy assets identified by the audit, preserving license/source notes in the audit. Do not add decorative assets that are not used by the first vertical.

- [ ] **Step 4: Verify mobile and desktop**

Run all automated tests, then serve `apps/web` locally and check approximately 390px and 1440px widths: selector, lesson list, ready Player, unresolved state, media/no-media and RTL content.

- [ ] **Step 5: Commit**

```bash
git add apps/web packages/language-packs tests docs/research/SWE_UI_AUDIT_V1.md
git commit -m "feat(web): adapt SWE media and responsive player patterns"
```

### Task 7: End-to-end first vertical verification

**Files:** Modify `tests/web-player-smoke.test.mjs`; Create `docs/research/PLAYER_V1_VERIFICATION.md`

**Interfaces:** Verifies the complete `Language Pack → MicroLesson → Runtime → View Model → Web Player` vertical.

- [ ] **Step 1: Add final cross-language assertions**

Pin that all three packs use the same controller/view-model path, HNK text equals `EN ZAMI HNK KE` byte-for-byte, Esperanto unresolved renders without invented utterance, and no UI source contains language-specific conditional branches.

- [ ] **Step 2: Run complete automated verification**

```bash
npm test
```
Expected: all legacy + Player tests PASS.

- [ ] **Step 3: Run browser QA**

Serve the app locally and exercise Home → language → A1 → lesson → Player → advance/feedback/progress for English and HNK; verify Esperanto unresolved behavior. Check mobile and desktop widths and one synthetic RTL representation fixture.

- [ ] **Step 4: Write verification evidence**

Record commit SHA, test totals, tested widths, flows exercised, unresolved limitations, and screenshots/paths if produced. Do not claim deployment unless one was actually performed.

- [ ] **Step 5: Commit**

```bash
git add tests/web-player-smoke.test.mjs docs/research/PLAYER_V1_VERIFICATION.md
git commit -m "test(player): verify universal first vertical"
```

## Completion Gate

Before calling Player V1 complete: run `npm test`, confirm clean `git status --short`, inspect the final diff against the spec, and verify that no `mastered`, universal `isCorrect`, invented unresolved utterance, or language-name UI branch was introduced.
