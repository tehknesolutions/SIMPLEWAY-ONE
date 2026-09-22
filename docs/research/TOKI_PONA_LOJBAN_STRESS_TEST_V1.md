# SW Language Atlas — Toki Pona × Lojban Stress Test V1

Status: RESEARCH / ARCHITECTURE STRESS TEST
Date: 2026-09-22

## Purpose
Stress-test the emerging SimpleWay One language model against two deliberately contrasting constructed languages before deepening the Language SDK.

This document does not rank languages. It extracts engineering lessons and separates sourced facts from SimpleWay hypotheses.

## Epistemic labels
- FACT_LINGUISTIC — externally documented linguistic property.
- FACT_HISTORICAL — externally documented historical/project fact.
- INFERENCE — reasoned conclusion from documented properties.
- HYPOTHESIS — SimpleWay/HNK proposition requiring testing.
- EXPERIMENT — candidate empirical test.

## Sources reviewed
### Toki Pona
Official Toki Pona site (tokipona.org), including overview and clarification pages. The official site describes Toki Pona as a complete language with roughly 120–140 basic words, created by Sonja Lang in 2001, and emphasizes combining a small inventory of basic words contextually. Its clarification material distinguishes a relatively stable core/common vocabulary from uncommon or experimental vocabulary.

### Lojban
Logical Language Group / Lojban reference materials. The Lojban site describes a constructed spoken language developed by a community since 1987, building on Loglan. Its grammar is based on predicate-logic-inspired principles; official/reference material describes machine parsing and grammatical unambiguity. The formal grammar is published in machine-readable/formal forms including EBNF/YACC baselines. Lojban documentation explicitly distinguishes syntactic parsing from semantics.

## Why these two are useful together
Toki Pona and Lojban attack different dimensions of linguistic complexity.

Toki Pona strongly compresses the basic lexicon and relies heavily on composition, context and flexible description.

Lojban invests heavily in explicit structural relations, formal grammar and machine-parseable syntax while still allowing semantic vagueness/ellipsis where appropriate.

Therefore neither can be represented adequately by a language engine that equates "simplicity" with one scalar.

## Stress-test dimensions

| Dimension | Toki Pona | Lojban | SimpleWay implication |
|---|---|---|---|
| Origin | constructed, creator-led origin with later community evolution | constructed, community-developed, Loglan lineage | pack metadata must represent origin/governance without assuming one creator model |
| Lexical strategy | very small basic/core inventory; meaning expanded compositionally/contextually | substantially larger root/function inventory; productive compounds and predicate structures | lexicon cannot be modeled only as one-word = one-concept dictionary |
| Semantic precision | broad basic concepts often refined by context/combination | permits explicit logical/relational precision but semantics remain distinct from parse | runtime must not equate grammatical validity with semantic certainty |
| Word classes | comparatively flexible lexical behavior | explicit grammatical classes/roles | SDK must not require Indo-European noun/verb/adjective ontology |
| Syntax | compact grammar with strong contextual interpretation | deliberately formalized and machine parsable | grammar representation needs optional levels of formalization |
| Ambiguity | contextual underspecification is an important expressive mechanism | grammatical ambiguity is strongly constrained; semantic ambiguity can remain | ambiguity must be multidimensional: lexical, syntactic, semantic, pragmatic |
| Vocabulary evolution | stable core/common vocabulary coexists with experimental/uncommon forms | community governance and baselines coexist with evolving usage | governance schema must model core, accepted, experimental, deprecated/uncommon separately |
| Writing | Latin orthography plus sitelen pona ecosystem | primarily Latin orthography with formal word-resolution rules | UI/pack contracts must support multiple writing systems and representations |
| Parsing | human/context oriented | machine parsing is a central design property | parser capability must be optional pack capability, not universal requirement |
| Pedagogy | small core encourages rapid entry into composition and paraphrase | reference grammar is not itself a beginner pedagogy | linguistic specification and acquisition sequence must be separate artifacts |

## Key architectural conclusions

### 1. `LanguagePack` must not require conventional part-of-speech categories
A universal schema that requires every lexeme to be a noun, verb or adjective would encode assumptions that fail under cross-language stress.

Candidate design:

```text
lexicalEntry
  id
  forms[]
  senses[]
  distribution / usage constraints (optional)
  languageDefinedCategories[] (optional)
  composition metadata (optional)
  authority
```

Status: HYPOTHESIS — do not freeze into CORE yet.

### 2. Ambiguity must be represented as multiple independent dimensions
Candidate dimensions:
- phonological segmentation
- morphological segmentation
- syntactic parse
- lexical sense
- semantic scope
- pragmatic/contextual interpretation

A language may minimize one while intentionally retaining another.

Status: INFERENCE → SDK candidate.

### 3. Grammar and semantics must remain separable
Lojban is a particularly strong warning: a deterministic parse does not by itself determine intended meaning. SimpleWay validators therefore should distinguish at least:

`FORM_VALIDITY != SYNTACTIC_VALIDITY != SEMANTIC_ACCEPTABILITY != PRAGMATIC_FIT`

Status: INFERENCE → strong architecture candidate.

### 4. Lexical size is not equivalent to expressive power
Toki Pona demonstrates a design strategy where a small core inventory is reused compositionally/contextually. Esperanto already supplied a different form of compositional productivity. Lojban supplies another via roots, compounds and relational structures.

Therefore the Atlas should measure:

`LEXICAL INVENTORY` separately from `LEXICAL GENERATIVE POWER`.

Status: HYPOTHESIS/MEASUREMENT PROGRAM.

### 5. Specification and pedagogy are different layers
A complete grammar/reference can be pedagogically poor for beginners, while a tiny inventory does not automatically guarantee communicative competence.

SimpleWay One must separate:
- language specification;
- curriculum capability map;
- acquisition sequence;
- practice generator;
- assessment policy.

Status: INFERENCE → retain in Genesis architecture.

### 6. Governance needs vocabulary-state granularity
Candidate authority/status states should be able to represent concepts such as:
- foundational/core;
- accepted/common;
- official/validated where relevant;
- experimental/candidate;
- uncommon/legacy;
- deprecated/rejected.

These names must be pack-configurable rather than imposed as universal linguistic doctrine.

Status: HYPOTHESIS → compare with Esperanto and HNK governance before implementation.

## HNK absorption candidates

### TEST — Semantic compression
Can HNK achieve a useful reduction in memorization by allowing governed recombination of a smaller semantic inventory without causing unacceptable ambiguity?

Do not copy Toki Pona's vocabulary size. Test the principle.

### TEST — Formal parse boundary
Can selected HNK constructions have machine-verifiable structural validity while keeping metaphysical/symbolic interpretation outside the parser?

This would create a clean boundary:

`STRUCTURE → machine-verifiable where specified`

`MEANING → governed linguistic semantics`

`SYMBOLIC/METAPHYSICAL INTERPRETATION → separately labeled HNK/tradition layer`

### KEEP — Specification ≠ pedagogy
HNK Canon must not dictate lesson order merely because a rule appears early in the specification.

### KEEP — Stable core + experimental perimeter
HNK already has stronger evidence-governance machinery. Preserve it and investigate whether a clearly teachable stable core plus explicit candidate perimeter improves learner trust and authoring safety.

## New HNK Lab experiments

### EXP-07 Semantic Compression Threshold
Compare learner performance with different ratios of atomic lexemes versus governed compositional expressions.

Measures:
- memorization burden;
- comprehension accuracy;
- production accuracy;
- ambiguity rate;
- transfer yield.

### EXP-08 Ambiguity Budget
Measure whether intentionally allowing controlled semantic underspecification improves fluency/transfer without harming comprehension.

### EXP-09 Parse vs Meaning
For constructions with sufficient HNK evidence, separately score:
1. structural/form validity;
2. semantic validity;
3. contextual appropriateness.

Goal: test whether separating validators improves feedback quality.

### EXP-10 Minimal Expressive Core
Find the smallest governed HNK inventory that supports a defined subset of A1 communicative capabilities. Do not optimize for raw word count; optimize for learner effort versus reliable communicative coverage.

## Updated comparative axes
The SW Language Atlas should now treat at least these as independent variables:

1. phonological complexity
2. orthographic complexity
3. morphological complexity
4. syntactic complexity
5. lexical inventory size
6. lexical generative power
7. semantic granularity
8. contextual dependence
9. syntactic ambiguity
10. semantic ambiguity
11. exception load
12. predictability
13. parser/formalization level
14. governance rigidity
15. governance traceability
16. acquisition burden
17. transfer yield
18. communicative coverage
19. symbolic/ritual layer where applicable
20. evidence class

## Consequence for SimpleWay One implementation
Do not add deep lexical, grammar or evaluator assumptions to `packages/core` yet.

The existing minimal Language Pack contract remains safe because linguistic payload is opaque.

Before Language SDK V1 is frozen, the proposed schema must be stress-tested against at least:
- English
- Esperanto
- HNK
- Toki Pona
- Lojban

Natural languages with substantially different writing/morphosyntactic systems must then be added, beginning with candidates such as Hebrew and Japanese, before claiming broad universality.

## Next recommended research gate
`HEBREW × JAPANESE × ENGLISH × ESPERANTO × TOKI PONA × LOJBAN × HNK`

Purpose: force the architecture across natural/constructed, alphabetic/non-Latin/multi-script, morphologically different, context-heavy/formalized, historical/engineered and symbolic/ritual-associated systems.

The goal is not to homogenize them. The goal is to discover which abstractions survive without distorting any of them.