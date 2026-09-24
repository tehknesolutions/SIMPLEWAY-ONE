# SimpleWay A1 Learning Experience Engine V1.3 — Design

**Status:** APPROVED DESIGN BASELINE — written-spec review gate  
**Date:** 2026-09-24  
**Depends on:** A1 Reference Curriculum V1.1 + Semantic Curriculum V1.2

## 1. Intent

V1.3 turns the verified semantic graph into executable learning experiences without granting the universal engine authority to invent language.

The primary playable unit is a **Mission**. A Mission composes one or more eligible Micro-capabilities into a bounded learning loop: `MicroLesson → Scenario/Challenge → Attempt → Feedback → Evidence → Checkpoint`.

Success means a caller can provide semantic curriculum, readiness/evidence state, Language Pack coverage, and an experience blueprint, then receive either a deterministic playable Mission or an explicit blocked result.

## 2. Non-goals

V1.3 does not author vocabulary, grammar, translations, HNK forms, Esperanto forms, audio, glyphs, or images. It does not infer missing Language Pack realizations. It does not replace V1.1 readiness or V1.2 semantics.

It does not build a UI, persistence database, adaptive AI tutor, spaced-repetition scheduler, XP economy, or content-generation model. Those may consume this engine later.
## 3. Architectural choice

Three approaches were considered: activity-first generation, micro-capability-first lessons, and mission-first orchestration. V1.3 selects **mission-first orchestration**.

Activity-first is flexible but lacks a stable learner-facing progression unit. Micro-capability-first maps cleanly to 180 nodes but risks turning the product into 180 isolated lessons. Mission-first preserves the semantic graph while allowing coherent, gamified sequences across related nodes.

Mission is orchestration, not epistemic authority. Every Mission step must trace to Micro-capability IDs and must pass existing readiness/evidence gates before a linguistic realization can appear.

## 4. Core components

1. **Experience Blueprint** — declarative, language-neutral recipe for Mission shape and required representations/evidence.
2. **Mission Composer** — deterministic orchestrator joining semantic targets, blueprint requirements and eligible Language Pack realizations.
3. **Experience Steps** — typed stages: `MICRO_LESSON`, `SCENARIO`, `CHALLENGE`, `CHECKPOINT`.
4. **Attempt/Evidence Events** — immutable records of what the learner attempted and what observable evidence was produced.
5. **Feedback Contract** — structured outcome describing success, retry, support or block without fabricating linguistic corrections.
6. **Progression State** — derived mastery/evidence state per Micro-capability; it never mutates curriculum authority.

## 5. Mission contract

A Mission MUST have stable `id`, `version`, ordered `targetMicroCapabilityIds`, `blueprintId`, `status`, `steps`, `gates`, and provenance/version-vector data.

`status` is `READY` only when every required target and representation for the Mission's mandatory path is eligible. Otherwise the composer returns `BLOCKED` with machine-readable reasons and no fabricated linguistic payload.
## 6. Blueprint contract

A Blueprint declares pedagogical shape, not language content. It contains `id`, `version`, target-count bounds, ordered stage descriptors, required modalities/representations, evidence requirements, retry policy and completion rule.

Blueprints may request capabilities such as text recognition, supported production, contextual transfer or observable response. They MUST NOT contain literal target-language realizations or language-specific grammar prescriptions.

V1.3 ships a minimal default Mission Blueprint sufficient to exercise the full loop. Additional pedagogical templates are data, not compiler branches.

## 7. Data flow

`Semantic View + target IDs + Blueprint + readiness cells + Language Pack → Mission Composer`.

For each target, the composer resolves the V1.2 Semantic-Pragmatic Contract, checks V1.1 readiness and Language Pack status, then evaluates Blueprint requirements. Eligible targets become ordered steps. Ineligible mandatory requirements become explicit gates.

During play, an Attempt Event references Mission, step and Micro-capability IDs. An Evidence Evaluator maps observable outcomes to the semantic contract's evidence criteria. A Feedback Contract is emitted. Progression State is then derived from accepted evidence events.

No stage may reverse this direction by using an English/HNK surface to infer universal semantics.

## 8. Evidence and progression

Evidence is append-only input. Progression is a deterministic projection of evidence, not an independently editable truth source.

V1.3 uses four progression states per Micro-capability: `UNSEEN`, `EXPOSED`, `EVIDENCED`, `CHECKPOINTED`. These describe learning-system evidence, not linguistic authority and not CEFR certification.

A failed or unsupported attempt may produce feedback but cannot downgrade source authority or mutate a Language Pack.
## 9. Feedback boundaries

Feedback may identify the targeted communicative outcome, report observed success/failure, request retry, expose approved support, and cite missing evidence.

Feedback MUST NOT synthesize a correction in the target language unless that correction is already present in an eligible Language Pack realization or separately validated pedagogical asset.

When evidence is insufficient, the correct result is `INSUFFICIENT_EVIDENCE`; when a linguistic dependency is absent, the correct result is `BLOCKED`, never guessed content.

## 10. Determinism and immutability

Given the same semantic dataset, structural graph, Language Pack, readiness cells, Blueprint, target IDs and version vector, Mission composition MUST serialize identically and hash identically.

Compiler outputs, events, feedback and progression projections are deeply immutable. V1.3 must not mutate V1.1 curriculum, V1.2 semantic curriculum, readiness cells or Language Packs.

## 11. Error and gate model

Programmer/schema errors fail closed with exceptions: unknown IDs, malformed Blueprints, duplicate targets, impossible stage ordering and invalid event references.

Domain incompleteness is data, not an exception: `UNRESOLVED`, missing required representation, insufficient evidence or unsupported pedagogy returns a structured blocked/gated result.

Blocked results include stable reason codes so UI and analytics can explain the gate without parsing prose.

## 12. Testing contract

TDD is mandatory. Tests cover Blueprint validation, deterministic Mission composition, multi-target ordering, readiness blocking, unresolved Language Packs, event validation, evidence projection, feedback boundaries, immutability and canonical hashing.
Regression gates prove V1.1 `12/60/180/7`, V1.2 `12/60/180`, semantic audit zero blockers, canonical `EN ZAMI HNK KE` unchanged, and Esperanto unresolved coverage unchanged.

The release includes at least one READY Mission fixture and one BLOCKED Mission fixture. No test may make invented language data necessary for success.

## 13. File boundaries

V1.3 adds focused modules under `packages/experience/`: `blueprint.mjs`, `mission-composer.mjs`, `events.mjs`, `feedback.mjs`, and `progression.mjs`.

Existing `packages/compiler/course-compiler.mjs` remains the lower-level course/readiness compiler. V1.3 consumes its established readiness semantics rather than moving Mission orchestration into that file.

Tests remain under `tests/` with one focused suite per component plus one V1.3 end-to-end release suite.

## 14. Release invariant

V1.3 is complete when a Mission can be deterministically composed, blocked safely, played through typed attempt/evidence events, evaluated into bounded feedback, and projected into progression state while preserving all V1.1/V1.2 structural, semantic and epistemic invariants.

**Hard rule:** `semantic completeness ≠ linguistic authority ≠ pedagogical evidence ≠ learner mastery`.
