# SWE UI Audit V1

Source: `tehknesolutions/SW-ENGLISH` (`main`), audited 2026-09-22.
Target: SimpleWay One Player V1.

## Decision rule

- **COPY/ADAPT** — proven interaction/visual pattern worth translating to the ONE web shell.
- **REBUILD** — product idea survives, implementation/ownership must change.
- **DISCARD** — conflicts with universal Runtime/Method or creates language coupling.
- **REFERENCE ONLY** — useful precedent, not part of Player V1.

## Findings

| Surface | SWE source | Decision | ONE destination | Reason |
|---|---|---|---|---|
| Brand palette | `lib/features/lesson/screens/official_lesson_learn_mode_screen.dart` | COPY/ADAPT | `apps/web/styles.css` | Preserve blue `#0057D8`, red `#E63946`, gold `#FFD166`, ink/surface hierarchy. |
| Lesson shell / hero card | same | COPY/ADAPT | `apps/web/index.html` + CSS | Rounded white hero, eyebrow, title/subtitle, framed learning content and clear actions are strong reusable patterns. |
| Top navigation | same | COPY/ADAPT | web shell header | Back/menu structure survives; English-specific “Learn Mode · Fonte Oficial” copy does not. |
| Slide/page sequencing | same | REBUILD | Runtime stage projection | SWE owns `_page`; ONE must derive current stage from Lesson Runtime. |
| Progress line | learn/game screens | COPY/ADAPT | `#progress` | Visual pattern survives; value must come from Runtime rather than local page/card index. |
| Learning frame / badges | learn screen | COPY/ADAPT | Player content card | Color-coded framed content and small badges fit universal stages. |
| Story / Q&A / vocabulary lists | learn screen | REBUILD | pack-driven representation/activity surfaces | Card/list grammar is reusable, but EN/PT fields are English-course coupling. |
| Audio action | learn/game screens | REFERENCE ONLY | future media/action adapter | V1 has no universal audio service contract yet. |
| Game prompt card | `lib/features/lesson/screens/official_lesson_game_mode_screen.dart` | COPY/ADAPT | Player activity surface | Prompt-first focus, input area, feedback panel and next action are strong interaction patterns. |
| XP/hearts/card scoring | game screen | DISCARD | — | Local gamification is not evidence/acquisition state and cannot drive universal progress. |
| `_isAcceptable` / `isCorrect` | game screen | DISCARD | — | Conflicts with layered Evaluation; UI must not own universal correctness. |
| Feedback box | game screen | REBUILD | `#feedback` | Keep visual feedback affordance; source data must be Evaluation/Evidence layers. |
| Visual asset card | `lib/features/lesson/widgets/audience_visual_asset_card.dart` | COPY/ADAPT | optional media card | Gradient card, semantic alt text, optional rendering and compact mode are reusable. |
| Audience-specific visual resolver | same | DISCARD | — | ONE media comes from Language Pack/MicroLesson, not audience+lesson hard-coding. |
| Lesson progress persistence | `lib/features/progress/simpleway_lesson_progress_service.dart` | REFERENCE ONLY | Runtime persistence later | Persistence precedent is useful, but XP/unlock/learn/game state cannot replace Lesson Runtime. |
| XP unlock thresholds | progress service | DISCARD | — | Universal course sequencing cannot be tied to English XP formulas. |
| Learn/Game split | official learn/game screens | REFERENCE ONLY | Method stages | Useful UX precedent, but ONE uses the 10-stage Universal Learning Cycle rather than two hard modes. |

## Visual tokens to retain

The SWE lesson surface consistently uses Poppins for high-emphasis headings, a pale blue page surface, white elevated cards, 20–28px rounded corners, restrained blue shadows, compact uppercase eyebrow labels, and blue/red/gold as the primary brand triad. ONE should preserve that family while keeping layout/content language-neutral.

## Couplings to remove

`Cycle1OfficialLesson`, `OfficialOpiPrompt`, `OfficialStoryBlock`, `OfficialQaItem`, `OfficialDrillPhrase`, EN/PT field pairs, fixed “Drill 72”, local `_page/_index`, XP/hearts/streak, `SharedPreferences`, and Flutter widget/service dependencies do not cross into the ONE web Player contract.

## Responsive/mobile decision

SWE lesson screens already use a single-column `SafeArea → Column → scroll → padded HeroCard` composition. ONE keeps the single pedagogical flow mobile-first; desktop only increases max width, spacing and card composition. It does not create a second desktop pedagogy.

## Canonical production evidence

SWE's own hardening docs identify `lib/app/theme/simpleway_theme.dart` as the canonical Light Mode theme and the production chain as `main.dart → main_production.dart → runSimpleWayAcademyApp() → SimpleWayAcademyApp`. ONE therefore treats older parallel theme files and DEV entrypoints as migration/reference evidence, not canonical sources.

The active workspace family (`simpleway_workspace_shell_v3/v4`) demonstrates the useful responsive shell pattern: persistent desktop navigation/auxiliary context with a compact mobile flow. ONE adapts the information hierarchy, but keeps pedagogy identical across widths.

The current learning runtime family (`official_lesson_runtime_screen_v7+` and widgets) provides stronger evidence than the older lesson feature screens for progress HUD, activity transitions, step completion cues, OPI/Q&A/review decks, structure lab and media coverage. These patterns are visual/interaction references only; ONE's state authority remains its universal Runtime.

## Extended migration matrix

| Surface | SWE source | Decision | ONE destination | Reason |
|---|---|---|---|---|
| Canonical Light theme | `lib/app/theme/simpleway_theme.dart` | COPY/ADAPT | `apps/web/styles.css` | Canonical product theme per SWE hardening baseline; preserve identity, translate Flutter ThemeData into CSS tokens. |
| Responsive breakpoints | `lib/app/layout/simpleway_responsive.dart` | COPY/ADAPT | CSS media queries | Preserve compact/desktop intent without importing Flutter layout ownership. |
| Workspace shell | `lib/app/ui/simpleway_workspace_shell_v3.dart`, `v4.dart` | COPY/ADAPT | web shell | Strong navigation/context hierarchy; simplify for Player V1 and keep one pedagogical flow. |
| Cycle catalog/overview | `lib/learning/ui/cycle_catalog_screen_v3.dart`, `cycle_overview_screen.dart` | COPY/ADAPT | language + A1/lesson selection | Card hierarchy and continue affordance fit ONE; unlock logic must be universalized. |
| Lesson runtime workspace | `lib/learning/ui/official_lesson_runtime_screen_v7.dart` + later wrappers | REBUILD | Player controller/view model | Preserve workspace composition; replace Flutter session/page ownership with ONE Runtime projection. |
| Progress HUD | `lib/learning/ui/widgets/lesson_game_progress_hud.dart` | COPY/ADAPT | `#progress` | Stage/lesson orientation is useful; XP/hearts/streak remain outside universal progress authority. |
| Activity transition | `lesson_game_activity_transition.dart` | COPY/ADAPT | Player transition state | Useful pacing cue independent of language. |
| Step completion cue | `lesson_game_step_completion_cue.dart` | COPY/ADAPT | feedback/completion state | Keep completion affordance; derive state from Runtime/evidence. |
| OPI/Q&A/review decks | `lesson_opi_practice_deck.dart`, `lesson_qa_practice_deck.dart`, `lesson_review_practice_deck.dart` | REBUILD | generic activity renderer | Interaction families survive, but English-specific models/evaluator do not. |
| Structure Lab | `lesson_structure_lab_card.dart` | REFERENCE ONLY | future stage renderer | Valuable pedagogy, but V1 first needs the universal representation/activity contract. |
| Media registry | `simpleway_lesson_media_registry.dart` | REBUILD | pack media metadata | Preserve optional/fallback philosophy; remove lesson-number asset hard-coding. |
| Visual learning cards | `simpleway_visual_learning_cards.dart` | COPY/ADAPT | optional media/representation cards | Strong image + text hierarchy and graceful visual support. |
| Auxiliary progress panels | `simpleway_auxiliary_panels.dart` | REFERENCE ONLY | future dashboard | Useful later; not required for first Player vertical. |

## Asset and dependency policy

SWE's lesson media registry and visual-pack tests prove that visual assets are treated as explicit lesson contracts with fallbacks rather than decoration. Player V1 should copy no asset merely because it exists: only an asset referenced by the first vertical and verified in the SWE audit may enter `apps/web/assets/`.

Flutter packages, Firebase/Auth, SharedPreferences, audio/voice packages, and routing packages are implementation dependencies of SWE, not dependencies of the SimpleWay method. They must not cross into the initial dependency-light ONE web shell unless a later requirement proves the need.

## Required surface coverage

- **Identity/header/footer:** COPY/ADAPT canonical Light Mode palette, typography hierarchy, compact brand/header and restrained footer signature.
- **Lesson shell:** REBUILD state ownership; COPY/ADAPT card hierarchy, hero framing and stage orientation.
- **Cards:** COPY/ADAPT premium/visual card grammar; content comes only from Language Packs/View Model.
- **Vocabulary/media:** REBUILD as optional representation/media surfaces; no EN/PT pair assumption.
- **Feedback:** REBUILD from Evaluation/Evidence; preserve visible success/retry/information affordances without universal `isCorrect`.
- **Progress:** COPY/ADAPT HUD/progress visuals; Runtime is the only Player progress authority.
- **Navigation:** COPY/ADAPT compact/mobile and persistent desktop hierarchy; no Flutter route framework migration.
- **Responsive behavior:** COPY/ADAPT breakpoint intent; one pedagogical flow across mobile and desktop.

## Gate conclusion

The SWE frontend is valuable primarily as a **proven product grammar**, not as code to transplant. The safest ONE path is to translate its canonical visual tokens and strongest interaction patterns into a dependency-light web shell while rebuilding state ownership around `Language Pack → MicroLesson → Universal Learning Cycle → Lesson Runtime → View Model`. This preserves the maturity of SWE without importing English-course coupling.