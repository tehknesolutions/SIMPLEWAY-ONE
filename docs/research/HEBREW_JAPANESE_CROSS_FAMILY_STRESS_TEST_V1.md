# Hebrew × Japanese Cross-Family Stress Test V1

Status: RESEARCH CANDIDATE — SW LANGUAGE ATLAS

## Purpose
Stress-test the emerging SimpleWay One language architecture with two natural languages whose writing, morphology, historical development and pedagogical demands expose assumptions that English, Esperanto, Toki Pona and Lojban may leave hidden.

This document keeps linguistic/historical facts separate from religious, symbolic or metaphysical interpretations.

## Epistemic labels
- `FACT_LINGUISTIC`
- `FACT_HISTORICAL`
- `INFERENCE`
- `TRADITION_CLAIM`
- `METAPHYSICAL_CLAIM`
- `HNK_CANON`
- `HYPOTHESIS`
- `EXPERIMENT`
- `RESULT`

## 1. Hebrew — natural language + historical strata + institutional governance

### Linguistic system
`FACT_LINGUISTIC`: Hebrew is Semitic. The Academy of the Hebrew Language describes the characteristic consonant–vowel relationship in Semitic word structure: consonantal roots carry primary semantic distinctions while vowel patterns contribute grammatical and finer semantic distinctions. Roots are generally triconsonantal, with other sizes also attested.

Engineering consequence: the SimpleWay lexicon model cannot assume that a pedagogically useful lexical unit is always equivalent to an unanalyzed surface word. It may need relationships among root, pattern, lemma and surface form.

### Writing
`FACT_LINGUISTIC`: Modern Hebrew has standard vocalized and unvocalized forms. Nikkud can encode vowels and additional pronunciation information, while ordinary contemporary text is predominantly unvocalized.

Engineering consequence: `orthography` cannot be a single string. A Language Pack may need multiple sanctioned representations of one lexical/utterance unit, with pedagogical progression between them.

### Historical layering
`FACT_HISTORICAL`: Modern Hebrew draws on multiple historical strata and contemporary usage. The Academy explicitly treats Biblical, post-Biblical and living forms as evidence in standardization decisions.

Engineering consequence: provenance should be first-class. A language item may have historical source, modern status and pedagogical status independently.

### Governance
`FACT_HISTORICAL`: The Academy was established by law in 1953. It adjudicates grammar, orthography, punctuation, transliteration and terminology. Its process includes committees and plenary approval; official decisions are published.

Engineering consequence: HNK governance is not historically unique as a general engineering problem. Language Packs should be able to represent authority bodies, decision status, provenance and versioning without CORE deciding what is linguistically true.

### Sacred / symbolic layer separation
Hebrew has extensive religious, exegetical and mystical traditions associated with its texts and letters. These must not be collapsed into the linguistic description of Hebrew.

Atlas rule:
`HEBREW_LINGUISTIC_DATA != RELIGIOUS_INTERPRETATION != KABBALISTIC_INTERPRETATION != METAPHYSICAL_CLAIM`

The Atlas may relate these layers through explicit typed links, never by silently converting one into another.

## 2. Japanese — multi-script natural language + contextual pedagogy

### Writing system
`FACT_LINGUISTIC`: Japan Foundation teaching materials introduce Japanese through multiple scripts. Modern Japanese uses kanji, hiragana and katakana, with romaji also used pedagogically/representationally. Kanji and kana perform different functions, and a kanji can have multiple readings.

Engineering consequence: `script` must be modeled as a system, not a single alphabet field. A lexical item may have kanji, kana reading, romanization and other display variants.

### Grammar / order
`FACT_LINGUISTIC`: Japan Foundation A1 introduction materials teach a basic subject–object–predicate order and separately teach grammatical particles and pronunciation/pitch features.

Engineering consequence: CORE must not encode English SVO templates. Sentence-role representation and exercise generation need pack-owned structural descriptions.

### Script progression
`FACT_PEDAGOGICAL`: Japan Foundation's IRODORI Starter A1 provides hiragana/katakana introduction and practice, and offers optional romaji support in early lessons so beginning learners are not blocked by script acquisition.

Engineering consequence: script literacy and communicative competence need separate progress dimensions. A learner may be able to perform an A1 communicative task with scaffolding before full script mastery.

### Can-do first pedagogy
`FACT_PEDAGOGICAL`: Marugoto Starter A1 explicitly selects language learning points from communicative activities/Can-do objectives rather than beginning from a purely structural grammar syllabus.

Engineering consequence: this strongly supports the SimpleWay One direction:
`CAPABILITY → LANGUAGE REALIZATION`, not `GRAMMAR CHAPTER → CLAIMED CAPABILITY`.

## 3. Seven-language stress matrix

| Dimension | English | Esperanto | Toki Pona | Lojban | Hebrew | Japanese | HNK |
|---|---|---|---|---|---|---|---|
| Origin | natural | constructed | constructed | constructed | natural/historical | natural/historical | constructed/governed |
| Writing | Latin | Latin-derived | Latin + optional systems | Latin-based | Hebrew script; pointed/unpointed | kanji + kana + romaji contexts | HNK-owned |
| Morphological strategy | mixed | highly regularized derivation/inflection | low inventory/contextual composition | explicitly engineered | root-pattern + inflection | agglutinative/inflectional morphology | governed, unresolved where not evidenced |
| Word order assumption safe for CORE? | no | no | no | no | no | no | no |
| Surface word = lexical primitive? | not always | not always | often composition-dependent | no universal assumption | clearly unsafe | clearly unsafe | must remain pack-defined |
| One script representation enough? | often but not universally | usually | usually | usually | no | no | must remain pack-defined |
| Grammar-first pedagogy required? | no | no | no | no | no | no | no |
| Capability-first compatible? | yes | yes | yes | yes | yes | yes | target |
| External governance | distributed usage/reference institutions | Fundamento/Akademio | creator/community/reference works | formal community specifications | Academy + usage | usage + educational/reference institutions | creator/canon governance |
| Symbolic/metaphysical layer | optional external | not inherent | philosophical/minimalist framing | experimental/logical framing | strong associated traditions, separate from linguistic fact | cultural/religious associations, separate | explicit project layer, typed separately |

## 4. Architectural findings

### FINDING A — `Lexeme` cannot equal `word string`
Hebrew root-pattern relations and Japanese script/readings make a single-string lexical model inadequate.

Candidate model:
`LexicalEntity → representations[] + morphology + relations + provenance`

Status: `HYPOTHESIS`; do not freeze into SDK yet.

### FINDING B — Script competence is orthogonal to communicative capability
Japanese A1 pedagogy demonstrates that temporary romanization scaffolding can coexist with communicative progression.

Candidate SimpleWay dimensions:
- communicative capability
- listening
- speaking
- reading
- writing/typing
- script recognition
- orthographic production

Status: `HYPOTHESIS` for universal progress model.

### FINDING C — Language Pack needs representation policy
The same linguistic unit may legitimately have multiple representations: pointed/unpointed Hebrew; kanji/kana/romaji Japanese; future HNK glyph/romanized or other governed representations where canon licenses them.

Status: `TEST`.

### FINDING D — Provenance is not only an HNK concern
Hebrew's historical strata and institutional decisions demonstrate that source/provenance/version can matter in a natural language too.

Candidate promotion: provenance infrastructure may belong in Language SDK/CORE contracts, while the meaning of authority remains pack-owned.

Status: `ADAPT`.

### FINDING E — Capability-first survives a difficult natural-language test
Japan Foundation's documented A1 approach selects structures based on communicative activities. This independently supports SimpleWay's capability-first direction.

Status: `KEEP`, but implementation remains experimental until broader validation.

### FINDING F — Symbolic interpretation must be typed
For Hebrew especially, linguistic history, religious textual use, Kabbalistic interpretation and metaphysical claims must be queryable together without being epistemically merged.

Status: `KEEP` for SW Language Atlas evidence architecture.

## 5. New HNK Lab experiments

### EXP-11 Multi-Representation Learning
Compare learning the same unit through one representation versus progressively linked representations. Measure recognition, production, transfer and cognitive load.

### EXP-12 Script Independence
Measure whether communicative capability can progress independently from full mastery of the HNK writing/glyph system, where canon permits alternate representation.

### EXP-13 Morphological Family Transfer
Teach a governed morphological relation, then measure whether learners infer unseen related forms correctly. Only run where HNK canon provides sufficient productive evidence.

### EXP-14 Provenance-Aware Learning
Compare ordinary vocabulary presentation with optional source/provenance visibility. Measure retention and learner confidence without treating provenance as proof of metaphysical truth.

### EXP-15 Capability-First vs Structure-First
For equivalent targets, compare a Can-do/context-first sequence against a grammar/structure-first sequence, controlling exposure as far as practical.

## 6. Immediate SimpleWay One constraints

Do not freeze a Language SDK that assumes:
- Latin alphabet;
- left-to-right display only;
- one written representation per item;
- SVO word order;
- surface words as atomic lexical units;
- full script mastery before communicative progression;
- grammar chapter as the universal curriculum primitive;
- one authority model for every language;
- religious/symbolic interpretation as linguistic evidence.

## 7. Recommendation
Keep the current minimal `Language Pack Contract` because it remains opaque. Before deepening `Lexicon`, `Grammar`, `Evaluator`, `WritingSystem` or `Progress` contracts, derive candidate schemas from the seven-language matrix and test them against concrete A1 tasks.

Next research expansion should add a language with substantially different alignment/morphosyntax and one with strong nonconcatenative or polysynthetic behavior beyond the current set, while the Atlas simultaneously begins converting these findings into executable contract tests rather than adding fields speculatively.
