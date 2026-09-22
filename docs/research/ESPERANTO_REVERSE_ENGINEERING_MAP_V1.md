# Esperanto Reverse Engineering Map V1

Status: RESEARCH BASELINE — does not alter CORE or HNK canon
Date: 2026-09-22

## Purpose
Study Esperanto as a historical case of a deliberately constructed language that achieved long-term community use, institutional governance and mature pedagogy. Extract principles worth testing in HNK and SimpleWay One without copying Esperanto grammar or treating Esperanto design choices as universal laws.

## Research rule
For every finding distinguish:
1. historical/source fact about Esperanto;
2. inferred design principle;
3. HNK applicability hypothesis;
4. pedagogical applicability hypothesis;
5. experiment required before SimpleWay CORE promotion.

## Seven-layer map

### 1 — Genesis / problem definition
Research the design problem Zamenhof was addressing, pre-1887 development, initial publication strategy and the transition from creator-led project to community language.

Questions for HNK/SimpleWay:
- What must be fixed before public learning begins?
- What may remain evolvable?
- When should creator authority yield to explicit governance processes?

### 2 — Phonology and writing
Map phoneme inventory, grapheme/phoneme predictability, stress rules and the pedagogical cost of exceptions.

Candidate metric: **Predictability Ratio** — how often a learner can infer pronunciation/writing from learned rules without memorizing item-specific exceptions.

Do not assume maximum regularity is always desirable; test learnability, usability and identity trade-offs.

### 3 — Morphology and grammar
Map the small explicit grammar, grammatical endings, derivation, compounding and productive affixation.

Candidate principle: prefer learnable generative rules where they fit the intended language identity rather than requiring isolated memorization of every surface form.

Candidate metric: **LGP — Lexical Generative Power** = usable expressive distinctions enabled / fundamental lexical-morphological units learned.

LGP is a research metric proposal, not an established linguistic metric.

### 4 — Lexicon engineering
Map root sourcing, internationality strategy, root economy, compounding/derivation, later lexical expansion and frequency-based root selection.

Compare at least:
- original/fundamental lexicon;
- later official additions;
- frequency-oriented Basic Official Root inventory where useful;
- Zagreb Method's approximately 500 high-frequency morpheme teaching strategy.

Questions:
- What is the smallest HNK lexical core that unlocks meaningful A1 capability?
- Which concepts should be roots versus productive constructions?
- Can frequency, communicative coverage and symbolic/canonical importance be balanced explicitly?

### 5 — Semantics and syntax
Separate rules explicitly designed at foundation time from patterns clarified through examples, creator usage, community usage and later institutional analysis.

Important research lesson: a compact written grammar does not imply the living language has only that many grammatical facts. Examples and usage can carry normative/interpretive information.

For HNK this reinforces separation between rule declarations, validated utterances, examples, productive templates and unresolved zones.

### 6 — Governance and evolution
Esperanto's Fundamento explicitly establishes a stable foundation consisting of the 16-rule grammar, Universala Vortaro and Ekzercaro. Later vocabulary could be officialized through additions without making later elements part of the original Fundamenta layer.

Research comparison (not equivalence):

Esperanto:
`FUNDAMENTA → later officialization / recommendations → living usage`

HNK:
`SOURCE → CANDIDATE → VALIDATED → CANON` (according to HNK project governance)

Potential absorption:
- immutable or strongly versioned foundation;
- provenance per linguistic element;
- explicit status labels;
- additive evolution rather than silent rewriting;
- examples treated as evidence-bearing artifacts;
- institutional/review layer distinct from arbitrary runtime mutation.

Do not copy Esperanto's exact authority model into HNK; compare failure modes and benefits first.

### 7 — Pedagogy and acquisition
Study at least three pedagogical strata:

**Fundamento / Ekzercaro** — grammar + vocabulary + exercises/examples as a foundational teaching/usage corpus.

**Cseh Method** — direct/conversation-oriented teaching with strong oral interaction and reduced translation dependence.

**Zagreb Method** — compact basic course organized around roughly 500 frequent morphemes, with a 12-lesson basic course and supporting materials.

Research questions for SimpleWay:
- How much translation should A1 use by stage?
- When can context/images replace translation safely?
- What lexical/morphemic coverage yields the best early communicative return?
- Can direct interaction be introduced earlier because the language is predictable?
- What should be learned as a rule, an example, a chunk or a productive pattern?

## Three-language triangulation

Use three different roles rather than treating the languages as interchangeable:

### English
Natural language; mature SWE product; irregularities and historical complexity provide a stress test against over-regularized universal models.

### Esperanto
Constructed language with more than a century of community/institutional evolution; external comparative case for designed regularity, productive morphology, governance and teaching methods.

### HNK
Actively governed constructed language and primary SimpleWay research laboratory; allows prospective testing of language-engineering and acquisition decisions.

A CORE abstraction should not be promoted merely because all three can be forced into the same schema. The schema must preserve each language's actual structure.

## Candidate SimpleWay research instruments

1. **Predictability Ratio** — proportion of tested forms a learner can correctly infer from learned rules.
2. **LGP (Lexical Generative Power)** — experimental measure of expressive coverage unlocked per learned fundamental unit.
3. **Core Coverage** — percentage of target A1 communicative situations covered by the current root/morpheme/utterance inventory.
4. **Exception Load** — item-specific facts requiring memorization rather than productive inference.
5. **Transfer Yield** — success on novel contexts after learning a rule/pattern.
6. **Delayed Retention** — later retrieval after controlled exposure.
7. **Governance Traceability** — percentage of teachable linguistic claims with explicit provenance/status.

These are research proposals. They require operational definitions and validation before product use.

## What may be absorbed now as architecture principles

Safe to use as research/architecture guidance without changing HNK linguistic canon:
- separate foundational rules, lexicon and examples/exercises;
- maintain explicit provenance/status for language elements;
- distinguish immutable/versioned foundation from additive evolution;
- measure productive power rather than vocabulary count alone;
- use frequency/communicative coverage as one input to curriculum selection;
- keep language engineering separate from pedagogy while connecting them through explicit mappings.

## What must NOT be copied automatically

- Esperanto's 16 rules as an HNK grammar target;
- Esperanto part-of-speech endings;
- accusative/plural/agreement system;
- Esperanto phoneme inventory/alphabet;
- European root-selection strategy;
- Esperanto word order assumptions;
- translation-based exercises as universal pedagogy;
- a fixed 500-morpheme target for every language;
- Esperanto governance labels as replacements for HNK's existing authority model.

## Impact on current SimpleWay One implementation

Task 1 `Language Pack Contract` remains valid because it is deliberately small and opaque to language semantics.

Pause deeper CORE semantic modeling until this research is reconciled with:
- SWE/English structures;
- current HNK governance and A1 work;
- CEFR A1 capability requirements.

The next Language SDK design should explicitly support provenance/status, productive morphology/word-formation metadata where a language needs it, examples/utterances as first-class evidence-bearing objects, and language-specific evaluation policies without requiring these features for every language.

## Source baseline
Primary institutional sources consulted:
- Akademio de Esperanto — Fundamento de Esperanto and Antaŭparolo.
- Akademio de Esperanto — Akademia Vortaro explanations/status labels.
- Akademio de Esperanto — Oficialaj Aldonoj al la Universala Vortaro.
- Akademio de Esperanto — institutional history and acts.

Pedagogy comparison baseline:
- documented descriptions of the Cseh direct/conversation method;
- Associação Paulista de Esperanto description of the Zagreb Method and its approximately 500 frequent morphemes / 12-lesson basic course.

External claims must be source-checked again when converted into normative SimpleWay design decisions.

## Next research deliverable
Produce `ESPERANTO_VS_HNK_VS_ENGLISH_ENGINEERING_MATRIX_V1` with rows for phonology, orthography, morphology, syntax, lexicon, derivation, semantics, authority, examples, frequency, acquisition, assessment and A1 coverage. Each row must classify findings as FACT / INFERENCE / HYPOTHESIS / EXPERIMENT and end with KEEP / ADAPT / REJECT / TEST.