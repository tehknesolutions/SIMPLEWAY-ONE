# SimpleWay A1 Reference Curriculum V1.1

**Status:** APPROVED DESIGN BASELINE  
**Date:** 2026-09-23  
**Depends on:** `SIMPLEWAY_UNIVERSAL_LEARNING_ENGINE_V1.md`

## 1. Goal

V1.1 turns the verified Universal Learning Engine into a real A1 curriculum load test. The curriculum map is universal; Language Packs declare coverage without being forced to translate an English syllabus.

The A1 map is complete even when linguistic realizations are not. Missing content remains explicit.

## 2. Fixed curriculum mathematics

A1 V1.1 contains exactly:

- **12 Capability Families**
- **60 Capabilities**
- **180 Micro-capabilities**
- **7 Pedagogical Cycles**

The 180 Micro-capabilities are curriculum authority, not 180 mandatory visible lessons.
## 3. Capability Families

| Family | Capabilities | Micro-capabilities |
| --- | ---: | ---: |
| Identity & Introduction | 5 | 15 |
| Basic Social Interaction | 4 | 12 |
| Existence & Location | 4 | 12 |
| Needs, Wants & Intention | 5 | 15 |
| Actions & Routine | 6 | 18 |
| People, Objects & Reference | 5 | 15 |
| Quantity & Basic Measure | 5 | 15 |
| Time & Sequence | 5 | 15 |
| Space, Direction & Movement | 5 | 15 |
| Description & Basic Comparison | 5 | 15 |
| Ability, Permission & Preference | 5 | 15 |
| Repair & Communicative Survival | 6 | 18 |
| **TOTAL** | **60** | **180** |

Families describe communicative needs, never mandatory grammatical categories.
## 4. Seven pedagogical cycles

1. `CONTACT` — first contact and minimum communicative survival.
2. `REFERENCE` — identify people, things, places and quantities.
3. `ACTION` — express actions, needs, wants and preferences.
4. `CONTEXT` — situate communication in time, space and circumstance.
5. `INTERACTION` — ask, answer, repair and sustain short exchanges.
6. `TRANSFER` — reuse known capabilities in novel contexts.
7. `AUTONOMY` — combine A1 capabilities with reduced scaffolding and retention evidence.

A Micro-capability may recur across cycles. Recurrence creates new Evidence Events; it does not duplicate curriculum authority.

Evidence projections may describe longitudinal development such as `EXPOSED → RECOGNIZED → RETRIEVABLE → PRODUCTIVE → INTERACTIVE → TRANSFERABLE → RETAINED`, but these are explainable projections rather than universal mastery flags.

## 5. Typed dependency graph

Supported pedagogical relations are `PREREQUISITE`, `SUPPORTS`, `REINFORCES`, `CONTRASTS`, `TRANSFERS_TO`, and `REVISITS`.

Linguistic dependency, pedagogical dependency, and presentation order MUST remain distinct. A Learning Path may therefore introduce a useful chunk before later structural analysis when evidence and policy permit.
## 6. Authority and Evidence Envelope

Every realization/coverage cell carries or resolves to an Evidence Envelope containing source, provenance, authority, scope, evidence strength/confidence where applicable, validation history, version, and integrity hash when applicable.

Authority flow:

`UNRESOLVED → CANDIDATE → VALIDATED → PEDAGOGICALLY_APPROVED → READY`

`PARTIAL` is a coverage condition, not a truth rank. `AI_GENERATED` may create a `CANDIDATE`; it MUST NOT directly create `VALIDATED`, `CANONICAL`, or `READY` authority.

For HNK, analogy may motivate investigation but MUST NOT promote grammar, lexicon, productivity, or canonical realization without the required project authority.

## 7. Four independent readiness gates

- **Linguistic Gate:** validated realization of the Semantic-Pragmatic Contract.
- **Representation Gate:** required text/script/audio/glyph/etc. surfaces exist.
- **Pedagogical Gate:** approved teachable treatment exists.
- **Evidence Gate:** the experience can emit appropriate learning evidence.

The compiler may emit only experiences whose required gates are satisfied. Missing audio may block listening while leaving reading eligible. Linguistic `UNRESOLVED` can never be filled by inference during compilation.
## 8. Coverage model

Coverage is measured independently across:

- Curriculum Coverage
- Linguistic Coverage
- Representation Coverage
- Activity Coverage
- Evidence Coverage
- Course Compilation Coverage

Metrics MUST be queryable by Language Pack, family, capability, Micro-capability, cycle and version. A Language Pack therefore exposes a 180-cell A1 realization matrix without requiring all cells to be READY.

## 9. Visible learning experience

The graph is not the UI. The compiler may group eligible Micro-capabilities into `Mission`, `MicroLesson`, `Challenge`, `Review`, `Scenario`, and `Checkpoint` experiences.

No Micro-capability is considered sufficiently demonstrated from one activity or one occurrence. Progress policy must be able to require evidence across time, modality, support level or context.

## 10. V1.1 release boundary

V1.1 MUST create and validate the complete 12/60/180 curriculum structure before broad linguistic authoring. Existing confirmed realizations may be mapped to the new graph; missing realizations remain explicit. The first release proves structural scale, coverage accounting, authority gates and compilation behavior; it does not require 180 READY realizations in any language.