# SimpleWay Universal Learning Engine V1

**Status:** APPROVED DESIGN BASELINE  
**Date:** 2026-09-23  
**Product:** SimpleWay One

## 1. Vision

SimpleWay One is a universal language-learning system in which curriculum, pedagogy, language content, execution, evidence, and interface are independent but composable authorities.

Core equation:

`SimpleWay Method + Universal Curriculum + Language Pack = Executable Course`

The system MUST NOT model a new language as a translation skin over English. Natural, constructed, historical/reference, and project-defined languages must be representable without forcing English-specific grammatical categories.

## 2. Architectural invariants

1. `CURRICULUM != LANGUAGE != CONTENT != PLAYER`.
2. Capability meaning exists independently of any source-language sentence.
3. Missing knowledge remains explicit; unresolved content is never silently invented.
4. `AI_GENERATED != VALIDATED != CANONICAL != RELEASED`.
5. A correct response is evidence, not universal proof of mastery.
6. Published language-pack releases are immutable.
7. Same versioned compiler inputs MUST yield the same executable manifest/hash.
8. Interface language, learner L1, support language, and target language are separate dimensions.
9. Absence of a declared linguistic feature does not prove that the language lacks it.
10. Runtime and evidence history remain authoritative over UI projections.
## 3. Curriculum model

The internal curriculum authority is the **SimpleWay Universal Capability Graph**. CEFR is an external, auditable alignment layer rather than the owner of SimpleWay pedagogy.

Hierarchy:

`Domain → Capability Family → Capability → Micro-capability → MicroLesson`

Each Micro-capability owns a **Semantic-Pragmatic Contract** describing communicative intent, meaning, context, participant roles, register, pragmatic constraints, and evidence expectations without embedding a translation.

Language realization states are:

- `READY`
- `PARTIAL`
- `UNRESOLVED`
- `NOT_APPLICABLE`

The graph defines dependencies. Versioned **Learning Paths** define recommended routes through it. V1 ships deterministic paths; adaptive sequencing remains a replaceable policy layer.

## 4. Proficiency continuum

A1 through C2 are versioned **Level Profiles** over one continuous capability graph, not separate engines. Profiles describe expected complexity, autonomy, context, precision, breadth, interaction, production, and evidence.

A capability may develop longitudinally across multiple profiles. External CEFR mappings are evidence-backed alignments and may evolve independently from internal SimpleWay profile definitions.
## 5. Language realization and representation

A Language Pack realizes Semantic-Pragmatic Contracts. It does not translate a canonical English sentence.

A **Representation Bundle** may contain independently authoritative surfaces such as primary writing, alternate writing, transliteration, pronunciation/IPA, audio, glyphs/symbols, glosses, pedagogical translations, morphological segmentation, direction, writing system, register, and variants.

Every representation may carry provenance and authority metadata. Candidate or generated surfaces MUST NOT be promoted implicitly.

## 6. Modular linguistic description

Language Packs may expose typed registries for phonology, writing systems, morphology, syntax, lexicon, semantics, pragmatics, discourse, and variation/register.

The Core MUST NOT require English-specific categories such as tense, noun gender, or subject-verb agreement. Language-specific features are referenced by stable identifiers when pedagogically required.

`Linguistic Description != Pedagogical Curriculum`

## 7. Language Pack releases

Language Packs are modular, immutable, semantically versioned releases with schema version, pack version, curriculum compatibility, implemented capabilities, realizations, representation bundles, assets, linguistic registries, provenance, dependencies, and integrity hashes.

A learner session records exact relevant versions. PATCH fixes compatible defects; MINOR adds compatible capabilities/content; MAJOR represents incompatible contract or meaning changes.
## 8. Activity and evaluation model

Activities are semantic **Activity Contracts**, not hard-coded pedagogy inside UI widgets. Contracts identify target micro-capabilities, stimulus/response modalities, representations, requested interaction, allowed support, producible evidence, evaluation policy, and technical requirements.

Renderers execute contracts. Initial renderer families should cover recognition/choice, recall/input, ordering, and self-check/production while allowing later listening, speech, dialogue, matching, handwriting, and game/challenge renderers.

`Activity Contract != Renderer != Evaluation Policy`

Evaluation policies may be exact, set-based, normalized, structural, semantic, human, AI-assisted, or observational. Binary correctness MUST NOT be a universal Core assumption.

## 9. Universal evidence model

Every meaningful learner interaction may emit an immutable `EvidenceEvent`. Evidence dimensions include recognition, comprehension, recall, production, interaction, transfer, retention, support level, attempts, modality, context, and elapsed interval where applicable.

Pipeline:

`Activity → EvidenceEvent → Evidence Profile → Progress Policy`

Evidence history records observations. Evidence Profiles are derived projections. Progress Policies make explainable route decisions. No universal `mastered: true` field is permitted as the source of truth.
## 10. Learner and adaptation model

Learner state is separated into:

`Learner Identity → Learning History → Evidence Profile → Capability State → Adaptation Context`

History is append-oriented evidence. Capability State is a recalculable projection. Adaptation MUST NOT rewrite historical evidence.

V1 adaptation uses deterministic, explainable **Policy-Driven Adaptive Sequencing** over eligible graph nodes, prerequisites, path constraints, review needs, retention evidence, modality availability, and Language Pack coverage. Statistical or AI strategies may later implement the same policy boundary.

## 11. Authoring and authority pipeline

Content moves through explicit gates:

`NEED → RESEARCHED → CANDIDATE → VALIDATED → PEDAGOGICALLY_APPROVED → QA_PASS → RELEASED`

Additional terminal/transition states include `REJECTED`, `DEPRECATED`, `SUPERSEDED`, and `UNRESOLVED`.

Research, candidate generation, linguistic validation, pedagogical validation, activity generation, QA, release candidate creation, and publication are separate responsibilities. AI may assist research, candidate generation, tutoring, evaluation, and adaptation under role-specific permissions, but generation alone never promotes authority.

## 12. Deterministic pedagogical compiler

Inputs are versioned Method, Curriculum Graph, Level Profile, Learning Path, Language Pack, Activity Contracts, Evaluation Policies, and Progress Policy. Output is an immutable **Executable Course Manifest**.
For each required realization the compiler obeys status rather than guessing: `READY` compiles eligible experiences; `PARTIAL` compiles only supported surfaces; `UNRESOLVED` emits an explicit gap; `NOT_APPLICABLE` follows the path's declared policy.

Activity eligibility depends on available validated representations/modalities. Missing audio cannot silently produce listening content. Identical versioned inputs MUST produce byte-equivalent canonical output and identical content hash.

## 13. Comparative language laboratory

The **Comparative Matrix** compares capabilities, semantic-pragmatic contracts, linguistic features, representations, observed learning difficulty, pedagogical strategy, and evidence without assuming translation equivalence.

Relationships may be `EQUIVALENT`, `ANALOGOUS`, `NON_EQUIVALENT`, or `UNIQUE`. A **Transfer Graph** may represent evidence that prior-language knowledge facilitates, interferes with, does not transfer to, or requires reconceptualization for another learning target.

Observed correlation is evidence/hypothesis, never an automatic universal linguistic rule.

Research loop:

`Language Laboratory → Comparative Engine → Finding → Validation → Method Candidate → Method Release`

## 14. Knowledge graph and multimodality

Capabilities, contracts, features, realizations, representations, activities, evidence expectations, and sources form a typed pedagogical Knowledge Graph.

Text, audio, speech, image, glyph, handwriting, and future modalities are declared capabilities. They are never mandatory merely because another language pack supports them.
## 15. Runtime and product boundaries

The product flow is:

`Language Pack → Compiled Course → MicroLesson → Runtime → Activity Engine → Evidence Engine → Learner Model → Player`

The Player renders projections and dispatches intents. It MUST NOT become authority for curriculum, language truth, evidence history, or progress policy.

The current Player V1 remains the compatibility baseline while the new engine is introduced incrementally.

## 16. Version vector

An executable course release records at minimum:

- Method version/hash
- Curriculum Graph version/hash
- Level Profile version/hash
- Learning Path version/hash
- Language Pack version/hash
- Activity Contract set version/hash
- Evaluation Policy version/hash
- Progress Policy version/hash
- Course Compiler version/hash

This vector is sufficient to identify the pedagogical program that produced a compiled course and supports reproducibility/audit.

## 17. V1 exclusions

V1 does not require probabilistic learner modeling, generative course compilation, unrestricted AI authority, complete A1–C2 content, every renderer modality, or automatic linguistic-feature inference. These remain extension points, not blockers for the deterministic foundation.