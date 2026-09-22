# SW Language Engineering Matrix V1

Status: RESEARCH FRAMEWORK / EVIDENCE-FIRST

## Purpose
Build a comparative linguistic and pedagogical research base for SimpleWay One and HNK Lab by studying natural languages, constructed languages, liturgical/sacred uses, and ritual/esoteric/metaphysical language systems without collapsing their different evidence classes.

This is not a ranking of languages. It is a mechanism-comparison framework.

## Epistemic labels
Every claim entering the Atlas must carry one of these labels:

- **FACT_LINGUISTIC** — supported by linguistic description/corpus/reference grammar.
- **FACT_HISTORICAL** — supported by historical/documentary evidence.
- **INFERENCE** — analytical conclusion derived from evidence, not itself a directly documented fact.
- **TRADITION_CLAIM** — claim attributed to a religious, initiatic, esoteric or cultural tradition.
- **METAPHYSICAL_CLAIM** — transcendental/metaphysical claim not treated as empirically established by the linguistic layer.
- **HNK_CANON** — authoritative inside HNK because explicitly defined/approved by its creator; does not automatically become an external linguistic fact.
- **HYPOTHESIS** — proposed mechanism or prediction awaiting testing.
- **EXPERIMENT** — operationalized hypothesis being tested.
- **RESULT** — measured experimental output with method/provenance attached.

## Adoption labels
A mechanism discovered in another system may be classified:

- **KEEP** — directly useful within the target layer.
- **ADAPT** — useful principle requiring redesign for HNK/SimpleWay.
- **TEST** — promising but requires controlled experiment.
- **REJECT** — unsuitable, contradicted, or creates unacceptable cost/risk.

No external feature becomes HNK canon or SimpleWay CORE automatically.

## Language/system classes

### Natural languages
Examples: English, Portuguese, Hebrew, Greek, Arabic, Japanese.
Research value: historical evolution, irregularity, natural acquisition, pragmatics, variation, writing, morphology, corpus behavior and community change.

### Constructed languages
Examples: Esperanto, Toki Pona, Lojban, HNK.
Research value: explicit design choices, regularity, minimalism, formalization, compositionality, governance and learnability hypotheses.

### Sacred/liturgical language uses
Examples may include Biblical Hebrew, Koine Greek in Christian textual tradition, liturgical Latin, Sanskrit in its relevant traditions.
Research rule: distinguish the historically attested linguistic system from later religious/symbolic interpretation and ritual use.

### Ritual/esoteric/metaphysical language systems
Examples may include Enochian and other historically documented ritual/symbolic systems.
Research rule: document provenance, internal structure and claimed function while labeling supernatural/metaphysical assertions as tradition/metaphysical claims rather than linguistic facts.

## Universal analysis schema
Every language/system receives the same engineering card:

1. Origin and design/evolution context
2. Phoneme inventory and phonotactics
3. Grapheme/writing system
4. Grapheme↔sound predictability
5. Morphology
6. Syntax
7. Semantics
8. Pragmatics/discourse
9. Core lexicon
10. Word formation
11. Compositionality
12. Productivity
13. Ambiguity
14. Redundancy
15. Information density
16. Regularity
17. Exception load
18. Inferability/predictability
19. Learnability evidence
20. Teaching traditions/methods
21. Frequency/curriculum strategy
22. Assessment strategy
23. Governance/authority
24. Corpus/community
25. Historical evolution
26. Symbolic layer
27. Ritual/initiation use where applicable
28. Evidence class/provenance
29. Potential HNK transfer
30. Potential SimpleWay transfer

## Research metrics — experimental, not established universal linguistic metrics

### Predictability Ratio (PR)
How often a learner can correctly infer a form, pronunciation, interpretation or transformation after learning the governing rule set.

### Lexical Generative Power (LGP)
A proposed measure of usable expressive expansion produced by learned roots/morphemes/construction rules relative to memorized atomic units.

### Core Coverage (CC)
Share of target communicative situations/corpus covered by the deliberately taught core.

### Exception Load (EL)
Memory/processing burden attributable to forms that cannot be reliably generated from the learned regular system.

### Transfer Yield (TY)
Performance gained in novel contexts from already learned mechanisms without direct memorization of the target item.

### Delayed Retention (DR)
Capability retained after a defined delay without immediate rehearsal.

### Governance Traceability (GT)
Degree to which an accepted linguistic element can be traced to source, authority status, decision history and current validity.

These metrics require operational definitions and validation before quantitative cross-language claims are made.

## Initial comparison set

### English — natural/reference product language
Use to study mature SimpleWay product behavior, natural irregularity, high-resource pedagogy and existing SWE implementation.

### Esperanto — constructed/community-evolved bridge case
Documented Fundamento separates grammar, Universala Vortaro and Ekzercaro. The Fundamento explicitly protects a stable foundation, while later official additions provide a documented mechanism for lexical evolution. Study regular morphology, compositional word formation, foundation stability and pedagogy.

### Toki Pona — constructed/minimalism case
Study lexical minimalism, semantic recombination, context dependence, ambiguity trade-offs and whether small atomic inventories reduce or merely relocate learner complexity. Do not treat vocabulary count alone as proof of learnability.

### Lojban — constructed/formalization case
Study formal grammar, machine parseability, syntactic disambiguation, logic-oriented design and the distinction between formal syntactic unambiguity and semantic/pragmatic interpretation.

### HNK — constructed + initiatic/metaphysical-design laboratory
Study the approved linguistic system, governance/source locks, symbolic/initiatic design goals and pedagogical acquisition experimentally. HNK-internal metaphysical/canonical definitions remain distinguishable from external empirical claims.

### Hebrew / Koine Greek / Japanese — natural contrast cases
Use later phases to stress-test morphology, writing systems, historical layers, discourse/pragmatics and pedagogy under structures substantially different from English.

### Enochian — historical ritual-language case
Use only with strong provenance separation: historical documents and linguistic structure on one side; ritual/traditional/metaphysical claims on another.

## First evidence-backed Esperanto observations

1. The Fundamento explicitly contains a grammar, Ekzercaro and Universala Vortaro.
2. Its preface argues for an unchangeable foundation to protect stability.
3. The Universala Vortaro illustrates decomposable word formation (for example, a single idea composed from separately identifiable elements).
4. Later Official Additions created a documented path for vocabulary to become official without rewriting the original foundation.
5. Modern Akademio material demonstrates that usage/discourse questions can continue to be analyzed beyond the short foundational grammar.

Potential HNK/SimpleWay hypotheses:
- stable core + additive evolution may improve governance traceability;
- explicit separation of rule/reference/exercise layers may improve authoring and validation;
- productive morphology may increase lexical generative power while reducing atomic memorization;
- these effects must be tested rather than assumed.

## First evidence-backed Lojban observations

1. Lojban documentation describes its grammar as formal and syntactically unambiguous.
2. Formal grammars exist in machine-oriented forms including EBNF.
3. Its own grammar documentation distinguishes syntactic parse from semantics: a unique parse does not by itself determine meaning.

Potential HNK/SimpleWay hypotheses:
- machine-verifiable syntax could strengthen Language Pack validators;
- syntax/semantics separation should be explicit in the Language SDK;
- maximizing formal unambiguity may impose human-learning or expressive trade-offs and therefore belongs in TEST, not automatic adoption.

## Architectural consequence for SimpleWay One
The Language SDK should eventually be capable of representing languages that differ radically in:
- morphology;
- word order;
- writing system;
- orthography↔phonology mapping;
- lexical strategy;
- ambiguity profile;
- authority/governance;
- symbolic metadata.

Therefore CORE must not assume English-like tense categories, Latin script, word boundaries, translation direction, fixed part-of-speech inventories or a single theory of semantic composition.

## HNK Lab pipeline

```text
LANGUAGE ATLAS
    ↓
MECHANISM
    ↓
EVIDENCE CLASSIFICATION
    ↓
HYPOTHESIS
    ↓
HNK LAB EXPERIMENT
    ↓
RESULT
    ↓
LINGUISTIC + PEDAGOGICAL REVIEW
    ↓
KEEP / ADAPT / REJECT / RETEST
    ↓
HNK PACK or SIMPLEWAY METHOD CANDIDATE
    ↓
DUAL/MULTI-LANGUAGE VALIDATION
    ↓
SIMPLEWAY CORE (only when truly universal)
```

## Next research artifact
Create `ESPERANTO_HNK_ENGLISH_ENGINEERING_MATRIX_V1` as the first filled comparison, then add Toki Pona and Lojban as deliberately contrasting constructed-language cases. Each row must include evidence class, source/provenance, transfer hypothesis and adoption decision.