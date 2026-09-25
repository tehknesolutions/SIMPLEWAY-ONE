# SimpleWay A1 Semantic Curriculum V1.2

**Status:** APPROVED DESIGN BASELINE  
**Date:** 2026-09-23  
**Depends on:** A1 Reference Curriculum V1.1

## 1. Intent

V1.2 replaces generic semantic placeholders in the verified 12/60/180 A1 spine with explicit communicative contracts while preserving every structural and epistemic invariant established in V1.1.

Success means the engine can answer, for every A1 node, **what communicative outcome is being learned** without answering **how any particular language must realize it**.

## 2. Non-goals

V1.2 does not author new HNK, Esperanto, English, Hebrew, Japanese, or other linguistic surfaces. It does not infer grammar from translations. It does not change the 12/60/180/7 mathematics, authority ladder, readiness gates, or existing canonical HNK bytes.

## 3. Immutable structural contract

The existing 12 family IDs, 60 capability IDs, and 180 Micro-capability IDs remain stable. V1.2 changes semantic metadata attached to those IDs, not their identity.

Each Capability receives a human-readable communicative goal. Each Micro-capability receives a Semantic-Pragmatic Contract describing intent, interaction role, semantic scope, pragmatic conditions, expected evidence, and explicit exclusions.
## 4. Semantic-Pragmatic Contract

Every Micro-capability contract MUST contain:

- `intent`: language-neutral communicative outcome;
- `interactionRole`: what the learner does in an exchange;
- `semanticScope`: concepts required by the outcome;
- `pragmaticConditions`: context in which the outcome is appropriate;
- `evidenceCriteria`: observable learner behavior that can support evidence;
- `exclusions`: nearby meanings or structures not licensed by the contract.

A contract MUST NOT prescribe word order, morphology, grammatical terminology, mandatory pronouns, tense systems, articles, copulas, cases, gender systems, or other language-specific machinery unless a Language Pack separately validates that machinery.

## 5. Three-level semantic depth

Each Micro-capability is specified at three levels:

1. **Core** — the smallest communicative outcome that must remain invariant across languages.
2. **Context** — pragmatic circumstances and participant/reference constraints.
3. **Boundary** — explicit exclusions preventing semantic overreach.

These levels describe meaning and use. They are not proficiency ranks and do not imply a universal grammatical sequence.
## 6. Twelve-family semantic map

1. **Identity & Introduction** — establish, request and recognize basic identity and introductory information.
2. **Basic Social Interaction** — open, maintain and close minimal socially appropriate exchanges.
3. **Existence & Location** — communicate whether relevant entities are present and situate them at an A1 level.
4. **Needs, Wants & Intention** — express and understand immediate needs, wants, requests and simple intentions.
5. **Actions & Routine** — communicate basic actions, recurring activities and immediate activity states.
6. **People, Objects & Reference** — identify, distinguish and refer to people and concrete entities in shared context.
7. **Quantity & Basic Measure** — communicate elementary number, amount, price, size and practical measure.
8. **Time & Sequence** — locate simple events in practical time and communicate elementary ordering.
9. **Space, Direction & Movement** — understand and communicate basic spatial relations, destinations and movement.
10. **Description & Basic Comparison** — communicate salient qualities and simple contextual distinctions.
11. **Ability, Permission & Preference** — communicate basic capability, permission, choice and preference.
12. **Repair & Communicative Survival** — detect breakdown, request help or repetition, verify understanding and recover an exchange.

## 7. Capability design rule

Each family contains its V1.1-fixed number of Capability IDs. V1.2 assigns each ID one distinct communicative goal. The five/six capabilities within a family MUST partition the family domain rather than restate the same outcome with different grammatical forms.

Each Capability contains exactly three Micro-capabilities: `m01` establishes the core operation, `m02` extends it to comprehension or reciprocal interaction, and `m03` transfers it to a minimally novel context. This is a semantic authoring convention, not a claim that all languages encode those stages identically.
## 8. Evidence-first realization rule

Semantic completeness does not imply linguistic completeness. After all 180 contracts exist, every Language Pack still independently declares `READY`, `PARTIAL`, `UNRESOLVED`, or `NOT_APPLICABLE` coverage under the V1.1 authority model.

A semantic contract may request the function “ask whether an interlocutor uses/speaks a named language.” It does not authorize deriving a realization by translating English. For HNK, only separately validated project evidence may populate that cell; existing canonical evidence remains source-locked.

## 9. Authoring and validation gates

A V1.2 semantic dataset is releasable only when:

- all 60 Capability goals are non-placeholder and mutually distinguishable within their family;
- all 180 Micro-capabilities have complete contracts;
- no Micro-capability ID has changed from V1.1;
- every contract has at least one explicit exclusion;
- automated scans find no language-specific realization embedded in universal semantic data;
- V1.1 tests remain green;
- semantic schema and deterministic serialization tests pass.

## 10. Recommended implementation sequence

First create the contract schema and validators. Then author the 60 Capability goals family-by-family, expand each into three contracts, run semantic-overlap and forbidden-prescription checks, and only afterward connect contracts to the existing coverage/compiler layers.

V1.2 ends when the universal graph has 180 meaningful semantic contracts. Linguistic authoring is a subsequent evidence workflow, not part of this release.