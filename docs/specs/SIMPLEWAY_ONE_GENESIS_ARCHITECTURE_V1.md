# SimpleWay One — Genesis Architecture V1

Status: APPROVED ARCHITECTURAL DIRECTION

## North Star
**ONE APP · ONE CORE · MANY LANGUAGES · ONE EVOLVING METHOD**

SimpleWay One is the universal SimpleWay product. It is not owned conceptually by English or HNK. The existing SWE and SW-HNK projects are source systems whose strongest capabilities are selectively extracted into this repository.

## Thesis
SimpleWay evolves from separate language applications into one language-acquisition system.

- **SWE** is the mature product/reference implementation and source of proven UX/product capabilities.
- **SW-HNK** is the governed language implementation and primary methodology/research laboratory.
- **SIMPLEWAY-ONE** is the universal product and architectural destination.

The goal is not to copy SWE into HNK or HNK into SWE. The goal is:

`SWE mature product capability + SW-HNK governance/language isolation → SimpleWay One universal capability`

## Prime rule
Universalize communicative capability, acquisition mechanics, assessment infrastructure and learner experience. Do **not** universalize the grammar of one language.

`A1 capability != English grammar template`

Every Language Pack owns its own lexicon, grammar, phonology, orthography, writing system, semantic constraints, cultural/contextual realization and evidence/authority rules.

## Product model

```text
SIMPLEWAY ONE
│
├── Student Experience
│   ├── Home
│   ├── Learn
│   ├── Practice
│   ├── Speak
│   ├── Codex
│   └── Progress
│
├── Teacher
├── Creator / Course Builder
├── Language SDK
└── Research Lab
    └── HNK as primary P&D environment
```

## Architectural domains

### CORE
Owns only language-neutral mechanics and contracts, including app/session/runtime infrastructure, navigation, progress, generic practice orchestration, gamification mechanics, media infrastructure, telemetry, generic assessment mechanics and shared UI.

CORE must not contain linguistic truth for English, HNK or any other language.

### LANGUAGE PACK
Owns how a particular language realizes communication: curriculum realization, lexicon, grammar, phonology, orthography/script, governed utterances, pronunciation settings, media mappings, valid answers, Codex/reference content and evidence/authority metadata.

Initial packs:
- English
- HNK

### RESEARCH LAB
Owns experiments, acquisition-method comparisons, telemetry analysis, A/B research and methodology candidates. Lab results never silently alter canonical Language Pack content or CORE behavior.

## Universal A1 model
The A1 layer describes what the learner can accomplish rather than prescribing a particular grammatical construction.

Initial capability domains:
1. identity and basic self-expression
2. people and relationships
3. everyday objects and basic reference
4. places and environmental context
5. everyday actions and activities
6. routine and recurrence
7. basic time orientation
8. quantity and simple comparison where language-appropriate
9. wants, needs and intentions
10. questions and responses
11. basic social interaction
12. comprehension and production of short contextualized utterances

These remain subject to explicit CEFR/source reconciliation before being declared a complete universal A1 standard.

## Methodology candidate
Candidate reusable acquisition loop:

`CONTEXT INPUT → EXPOSURE → COMPREHENSION → NOTICE → RETRIEVAL → TRANSFER → RETENTION → CHECKPOINT`

This is a SimpleWay methodology candidate, not a universal psycholinguistic law. HNK Lab may test variants. Promotion requires evidence and review.

## Dual-language validation
A supposedly universal abstraction is not accepted merely because it works for English.

For initial promotion into CORE it must at minimum:
1. work naturally for English;
2. work naturally for HNK without forcing English grammar or semantics onto HNK;
3. keep language differences inside the packs rather than hiding them as semantic exceptions in CORE.

If either language requires semantic distortion, the abstraction remains a candidate.

## SWE extraction policy
SWE is a strong source of mature capabilities, including responsive shell/design, lesson workspace, persistent sessions, continue-learning behavior, practice orchestration, scoring/gamification, audio, speaking/conversation, Vocabulary Lab, content repositories, media contracts, observability and quality gates.

These are **source candidates**, not automatic CORE code. English/PT-specific assumptions must be separated into the English Pack.

Examples that must not become universal rules include English locale assumptions, PT→EN/EN→PT exercise direction, English tense/category assumptions, and Latin word-overlap answer heuristics.

## SW-HNK extraction policy
SW-HNK contributes explicit Language Pack boundaries, evidence-first governance, canon/candidate/validated separation, source locks, evidence-safe media semantics and the HNK research-lab role.

The existing Chesed fusion is retained as the first governed HNK vertical slice and should become one of the first fixtures used to prove the SimpleWay One runtime.

## Target repository shape

```text
apps/
  simpleway/
packages/
  core/
  ui/
  language-sdk/
  pedagogy/
  acquisition/
  practice/
  gamification/
  media/
  voice/
  ai/
  srs/
  telemetry/
  research/
languages/
  english/
  hnk/
methodology/
  simpleway/
research/
  hnk-lab/
docs/
```

This is a target structure. Migration must be incremental and testable rather than a destructive big-bang copy.

## SimpleWay One Shell V1
The first implementation milestone proves the architecture with one application shell and two language fixtures.

The shell exposes:
- Home
- Learn
- Practice
- Speak
- Codex
- Progress
- Language Selector

The first proof must allow the same app and generic runtime to load:
- an English fixture derived from SWE;
- an HNK/Chesed fixture derived from SW-HNK.

The language selection changes the Language Pack, not the application architecture.

### Shell V1 acceptance criteria
1. One application shell loads both English and HNK.
2. The same generic lesson runtime renders both fixtures.
3. Shared media/progress infrastructure works for both.
4. Linguistic semantics remain inside the selected Language Pack.
5. CORE contains no semantic branch such as `if (language === "hnk")` or `if (language === "english")`.
6. The HNK fixture preserves source/evidence governance and does not invent missing grammar.
7. The English fixture preserves English-specific content without promoting it to universal truth.
8. Responsive behavior follows the strongest mature SWE patterns while remaining pack-neutral.

## Initial migration waves
1. Universal shell and design system.
2. Runtime/session contracts.
3. Media infrastructure.
4. Practice and gamification.
5. English Pack V1.
6. HNK Pack V1.
7. Voice and AI.
8. Lab and telemetry.

## Promotion pipeline
`EXPERIMENT → HNK LAB → EVIDENCE → PEDAGOGICAL REVIEW → METHOD CANDIDATE → DUAL-LANGUAGE VALIDATION → CORE`

## Repository authority
From this Genesis milestone forward, universal SimpleWay product development belongs in `tehknesolutions/SIMPLEWAY-ONE`.

`SW-ENGLISH` remains a product/reference source during migration.

`simpleway-hnk` remains the governed HNK/source-lab repository during migration.

Neither source repository is to be destructively replaced as part of the initial SimpleWay One implementation.