# SimpleWay One — Universal Language Assumptions Audit V1

Status: RESEARCH GATE / ARCHITECTURE INPUT

## Purpose
Convert the cross-family Language Atlas research into explicit architectural constraints before deepening the Language SDK.

Reference comparison set currently includes natural, constructed and governed/experimental systems: English, Esperanto, HNK, Toki Pona, Lojban, Hebrew and Japanese.

The goal is not to claim that these seven systems exhaust human linguistic diversity. They are a deliberately contrasting stress-test set used to expose hidden assumptions.

## Epistemic rule
Every research statement entering architecture must be distinguishable as:
- FACT_LINGUISTIC
- FACT_HISTORICAL
- INFERENCE
- TRADITION_CLAIM
- METAPHYSICAL_CLAIM
- HNK_CANON
- HYPOTHESIS
- EXPERIMENT
- RESULT

CORE must never require acceptance of a metaphysical claim in order to function.

## Architecture rule
A feature may enter universal CORE only when its abstraction does not force one language's realization onto another.

`COMMUNICATIVE CAPABILITY != LANGUAGE-SPECIFIC GRAMMAR`

## Assumptions SimpleWay One must NOT make

### 1. One alphabet per language
Rejected. A language may use multiple scripts/representations, mixed representations, transliteration or pedagogical support representations.

Required direction: model representations explicitly rather than treating `text` as the complete linguistic object.

### 2. Left-to-right presentation
Rejected. Writing direction is a property of representation/script, not of CORE. Hebrew and other RTL systems require bidi-safe rendering; Unicode explicitly defines bidirectional handling for mixed RTL/LTR text.

Required direction: representation metadata may declare directionality; UI must support `ltr`, `rtl` and safe mixed-direction content.

### 3. Surface word = lexical atom
Rejected. Hebrew root/pattern morphology, productive Esperanto morphology, highly compositional Toki Pona expression and other systems show that surface tokens are not a universal lexical unit.

Required direction: future lexicon contracts must permit roots, stems, affixes, particles, compounds, multiword units and opaque lexical units without requiring all languages to use all categories.

### 4. Space-delimited tokenization
Rejected as universal architecture.

Required direction: tokenization/segmentation is pack- or analyzer-owned. CORE receives units/spans when needed but does not define linguistic word boundaries.

### 5. SVO as neutral sentence structure
Rejected. Typological data documents multiple dominant orders and languages without a single dominant order.

Required direction: generic runtime stages operate on capability/activity contracts, never SVO slots.

### 6. English tense inventory as universal time model
Rejected.

Required direction: CORE may represent communicative capabilities involving temporal reference; each Language Pack owns how, whether and where tense/aspect/time distinctions are realized.

### 7. Grammar chapter as universal curricular unit
Rejected.

Required direction: curriculum may be capability-first. Grammar/structure can be exposed as language-specific realization and pedagogical support. CEFR's action-oriented/can-do framing supports separating learner capability from a fixed grammar syllabus.

### 8. Translation pair as universal learning primitive
Rejected. PT→EN and EN→PT are valid English-course activities, not universal acquisition architecture.

Required direction: translation is one activity type. Contextual comprehension, production, matching, classification, interaction, mediation and other activity families must be possible without a translation dependency.

### 9. Exact string equality as universal correctness
Rejected.

Required direction: evaluator contract must eventually distinguish at least representation validity, structural validity, semantic validity, contextual appropriateness and authority/evidence constraints where applicable.

### 10. One universal `isCorrect()`
Rejected.

Candidate evaluation layers:
1. representation / orthography
2. segmentation / morphology when applicable
3. syntax / structural well-formedness when applicable
4. semantics
5. pragmatic/contextual appropriateness
6. pronunciation/phonology when applicable
7. governance/authority status when applicable

A Language Pack may implement only the layers meaningful and sufficiently specified for that language.

### 11. Image/media = linguistic evidence
Rejected.

Required direction: media may provide pedagogical context, mnemonic support or task stimulus. Linguistic authority/provenance remains separate unless a governed source explicitly grants evidence status.

### 12. Pronunciation = one locale string
Rejected as a complete model.

Required direction: future voice contracts may need pronunciation profile, variety/dialect, phonological target, accepted variants and script/reading relationships. `en-US` remains an English Pack configuration, not CORE truth.

### 13. One canonical reading per written form
Rejected as universal assumption.

Required direction: representation objects may map to zero, one or multiple readings/pronunciations depending on language and context.

### 14. All languages need the same grammatical categories
Rejected.

Required direction: Language SDK should support capability declarations and language-owned feature schemas rather than a global mandatory inventory of noun/verb/tense/case/gender/etc.

### 15. Linguistic validity = metaphysical/symbolic validity
Rejected.

For HNK and future symbolic/ritual systems, separate:
- linguistic structure
- linguistic meaning
- canonical authority
- symbolic interpretation
- ritual/metaphysical interpretation

These layers may reference each other but must not be silently collapsed.

### 16. Canon = immutable forever
Rejected as a universal rule.

Required direction: authority systems may evolve, but course/app releases should be able to pin reproducible language-pack versions and evidence/provenance references.

### 17. Community usage and institutional authority are the same thing
Rejected.

Required direction: provenance may distinguish attested usage, editorial decision, institutional standard, creator canon, experimental candidate and pedagogical adaptation.

### 18. Minimal vocabulary automatically means easiest language
Rejected as hypothesis, not fact.

Required direction: measure lexical load alongside ambiguity, compositional burden, inference demands, retention and communicative coverage.

### 19. Formal parse automatically determines meaning
Rejected. Structural parse and semantic interpretation are separable concerns.

Required direction: parser/validator results must not be promoted automatically to semantic or pragmatic correctness.

### 20. Natural vs constructed is enough to classify language behavior
Rejected.

Required direction: Atlas comparison remains multidimensional: origin, evolution, regularity, productivity, writing, morphology, syntax, semantics, pragmatics, governance, pedagogy, symbolism, ritual use and evidence level.

## Positive universal candidates
The audit currently supports these as stronger architecture candidates, subject to continued stress testing:

1. **Capability** — what the learner can accomplish communicatively.
2. **Representation** — one renderable/processable realization of linguistic material.
3. **Activity** — a pedagogical interaction with explicit input/output/evaluation contracts.
4. **Evidence/Provenance** — where a linguistic claim or learning item comes from.
5. **Authority Status** — how a governed system classifies that item.
6. **Media Reference** — pedagogical media linked without automatically becoming linguistic evidence.
7. **Progress Event** — learner interaction/result independent of language grammar.
8. **Evaluator Interface** — pack-owned evaluation behind a neutral runtime interface.
9. **Versioned Language Pack** — reproducible package of language realization and authority metadata.
10. **Experiment** — explicitly non-canonical research intervention with measurable outcome.

## UI consequences
- Components must be bidi-safe and Unicode-safe.
- Layout must not depend on Latin word length or spaces.
- Text direction belongs to representation/content metadata where needed.
- Multiple representations may be shown together: script, reading, transliteration, gloss or pedagogical annotation.
- UI should not label every structural explanation with English grammatical categories.
- Switching Language Packs must switch representation/evaluation configuration without branching linguistic semantics in CORE.

## Pedagogical consequences
The emerging SimpleWay candidate is capability-first rather than grammar-first:

`CAPABILITY → CONTEXT → LANGUAGE REALIZATION → PRACTICE → TRANSFER → RETENTION → CHECKPOINT`

This is a methodology candidate to test, not a universal law.

CEFR material is useful here because its can-do/action-oriented framing explicitly treats learners as social agents and uses descriptors to align curriculum, teaching and assessment. SimpleWay should absorb the abstraction — capability-driven planning — without treating CEFR as a grammar specification.

## HNK Lab experiment backlog
Existing experiments remain active:
- EXP-01 Predictability Ratio
- EXP-02 Lexical Generative Power
- EXP-03 Exception Load
- EXP-04 Transfer Yield
- EXP-05 Example-to-Rule Transfer
- EXP-06 Governance Traceability
- EXP-07 Semantic Compression Threshold
- EXP-08 Ambiguity Budget
- EXP-09 Parse vs Meaning
- EXP-10 Minimal Expressive Core
- EXP-11 Multi-Representation Learning
- EXP-12 Script Independence
- EXP-13 Morphological Family Transfer
- EXP-14 Provenance-Aware Learning
- EXP-15 Capability-First vs Structure-First

### New experiments from this audit

#### EXP-16 — Representation Switching Cost
Measure learner accuracy/time when the same item moves among native script, transliteration, reading aid and mixed representation.

#### EXP-17 — Evaluation Layer Separation
Compare learning feedback when a response receives one binary correctness signal versus separate structure/meaning/context feedback.

#### EXP-18 — Bidirectional UI Robustness
Inject mixed LTR/RTL fixtures into lesson, practice, Codex and progress surfaces; measure layout defects and task-completion errors.

#### EXP-19 — Capability Portability
Define one A1 communicative capability and implement it independently in English, Esperanto, HNK, Hebrew and Japanese. Measure how much CORE remains unchanged and identify semantic leakage.

#### EXP-20 — Translation Dependency
Compare matched activities taught with translation-heavy, translation-light and context-first designs for comprehension, transfer and delayed retention.

## Language SDK freeze rule
Do not freeze deep universal Lexicon, Grammar, Token or Evaluator schemas yet.

The current minimal opaque Language Pack contract may continue because it does not impose these assumptions. New deep contracts require evidence that they survive the Atlas stress tests.

## Next architecture gate
Before Task 2 of Shell V1 grows into a semantically rich runtime, define a minimal **Representation Contract V1** and **Capability Contract V1** as intentionally small/opaque interfaces, then test them with fixtures from structurally different languages.

The lesson runtime should orchestrate these contracts without interpreting their linguistic semantics.

## External reference anchors
- WALS: typological variation in constituent order, including SOV, SVO, VSO, VOS, OVS, OSV and languages without a dominant order.
- Unicode Standard Annex #9: bidirectional text behavior for RTL/LTR mixtures.
- Council of Europe CEFR resources: can-do descriptors, learner as social agent and action-oriented curriculum/assessment framing.

These references constrain architecture; they do not define HNK canon.