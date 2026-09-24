# SimpleWay A1 Campaign & Learning Path Engine V1.5 — Design

**Status:** PROPOSED SPEC — awaiting written-spec review  
**Date:** 2026-09-24  
**Depends on:** V1.1 Reference Curriculum + V1.2 Semantic Curriculum + V1.3 Learning Experience + V1.4 Adaptive Mission Engine

## 1. Intent

V1.5 turns next-Mission selection into a complete, replayable A1 learning journey. The learner navigates seven curriculum cycles through a directed acyclic Campaign Graph whose unlocks are caused by explicit evidence gates rather than percentages or opaque scores.

Success means the same Campaign Definition, Journal, curriculum/language inputs and policy versions always reconstruct the same Campaign Projection and available routes.

## 2. Architectural choice

V1.5 uses two separate authorities:

- `Curriculum Cycle Map`: versioned curricular placement of Micro-capabilities across cycles and pedagogical roles.
- `Learner Campaign Graph`: deterministic journey definition built from that map, prerequisites and Evidence Gates.

A Micro-capability may participate in multiple cycles without changing identity.
## 3. Multi-cycle role contract

Cycle participation uses a closed initial vocabulary: `INTRODUCE`, `REINFORCE`, `APPLY`, `CHECKPOINT`, `REVIEW`.

Participation is explicit data. V1.5 MUST NOT distribute 180 Micro-capabilities across seven cycles mathematically or infer missing memberships from family/order. Missing membership remains unresolved curriculum data.

The canonical macro-order remains `CONTACT → REFERENCE → ACTION → CONTEXT → INTERACTION → TRANSFER → AUTONOMY`.

## 4. Campaign DAG

Campaign topology is a directed acyclic graph. Nodes represent pedagogical journey units; edges represent declared prerequisites or gate-controlled unlocks.

Branches allow alternate routes. Convergences may require multiple upstream evidence conditions. Graph validation rejects cycles, dangling references, duplicate node IDs and impossible gates.

The DAG is not the learner state. It is an immutable, versioned campaign definition.

## 5. Evidence Gates

Unlocking is evidence-first, not percentage-first. An Evidence Gate contains explicit requirements such as accepted evidence for target X, checkpoint for target Y, or an `APPLY` participation requirement for target Z.
A gate is satisfied only by compatible journal evidence projected through existing V1.3/V1.4 contracts. XP, streaks, elapsed screen time or node visitation cannot satisfy an Evidence Gate.

Gate satisfaction unlocks routes; it does not assert mastery, CEFR certification or linguistic validity.

## 6. Campaign Journal

Persistence is event-sourced. The authoritative learner record is an append-only Campaign Journal containing stable event IDs, campaign/version provenance and references to Mission/Attempt/Evidence/Checkpoint/Review events.

The Journal MUST support deterministic replay, duplicate-event rejection and monotonic cursor/order validation. Historical evidence is never rewritten merely because a later review becomes due.

## 7. Campaign Projection

`projectCampaign(definition, journal, inputs)` derives the current journey state. It computes node availability, gate satisfaction, review needs and V1.4 planning scope without mutating either definition or journal.

Node state vocabulary is closed initially to: `LOCKED`, `AVAILABLE`, `ACTIVE`, `EVIDENCED`, `CHECKPOINTED`, `REVIEW_DUE`, `BLOCKED`.

A Projection is disposable derived state. Deleting it and replaying the same valid Journal MUST reproduce byte-identical canonical state.

## 8. Persistence boundary

The engine defines a storage-neutral `CampaignStore` contract: append events, load journal, optionally save/load snapshot cache, and verify replay.
Browser/local and remote/Supabase adapters are downstream implementations, not campaign semantics.

Snapshots are caches only. If snapshot and authoritative replay disagree, Journal replay wins and the cache is rebuilt.

Session recovery uses `Campaign ID + Definition Version + Journal Cursor + Event Journal`, followed by `Load → Verify → Replay → Projection → V1.4 Planner → Resume`.

## 9. V1.4 integration

V1.5 does not replace adaptive selection. Projection determines which graph nodes/targets are currently available; V1.4 ranks/selects the next eligible Mission inside that legal scope.

A V1.4 `BLOCKED` result remains diagnostic and cannot be bypassed by Campaign state. Missing linguistic evidence never becomes available because a graph edge is open.

## 10. Review semantics

Review is additive history. When an explicit review policy makes a checkpointed participation due, Projection may emit `REVIEW_DUE`; previous accepted evidence remains in the Journal.

Completing review appends new events. It never edits old evidence or subtracts a fictional mastery percentage.

Review timing remains deterministic and requires explicit supplied policy/time data; no implicit system clock participates in replay.

## 11. Gamification boundary

XP, streaks, badges, quests and cosmetic rewards are derived presentation/gameplay state. They may react to campaign events but cannot unlock Evidence Gates or alter linguistic/semantic authority.
Four concepts remain distinct: Curriculum Progress, Evidence State, Campaign Position and Gamification State. None alone means proficiency.

## 12. Learner and teacher/debug UX contract

Learner UX may present a friendly journey map: completed path, available branches, current Mission, checkpoints, review nodes and rewards. It should not expose internal epistemic machinery unless useful.

Teacher/debug UX exposes a deterministic `Why?` trace: node prerequisites, Evidence Gate requirements, satisfying journal event IDs, blocking reasons, selected V1.4 signal and version provenance.

Every visible unlock must therefore be explainable from declared graph/gate data plus journal evidence.

## 13. Determinism, serialization and versioning

Cycle Map, Campaign Definition, Journal verification result and Projection are deeply immutable and canonically serializable. SHA-256 hashes identify versioned definitions and replay outputs.

V1.5 version provenance belongs to V1.5 artifacts and MUST NOT contaminate canonical hashes of V1.1–V1.4 artifacts.

Equivalent definitions, journals and explicit policy/time inputs MUST yield identical canonical bytes, graph availability and projection hashes.

## 14. Failure boundaries

Schema/programmer errors fail closed: graph cycles, dangling IDs, duplicate events, invalid cursor order, unknown roles/states, malformed gates and version/hash mismatches.
Domain incompleteness remains explicit: absent Cycle Map membership, unresolved realization or unavailable evidence yields unresolved/blocked diagnostics rather than guessed data.

The engine MUST NOT infer intelligence, psychological traits, learning disorders, hidden mastery or CEFR certification from campaign position.

## 15. Proposed module boundaries

V1.5 adds focused modules under `packages/campaign/a1/`: `cycle-map.mjs`, `campaign-definition.mjs`, `graph-validator.mjs`, `evidence-gates.mjs`, `campaign-journal.mjs`, `campaign-projection.mjs`, `campaign-store-contract.mjs`, `campaign-serialization.mjs` and `campaign-runtime.mjs`.

V1.4 remains next-Mission authority. V1.3 remains Mission/evidence runtime authority. V1.2 remains semantic-contract authority. V1.1 remains structural curriculum authority.

## 16. Testing and release contract

TDD must cover multi-cycle participation, unresolved membership, DAG validation, branches/convergences, Evidence Gates, append-only journal invariants, duplicate/cursor rejection, deterministic replay, review history, snapshot-cache disagreement, V1.4 integration, blocked-language preservation, Why traces, canonical hashing and version isolation.

Regression gates preserve V1.1 `12/60/180/7`, V1.2 `12/60/180`, V1.3 Mission hash `9e7435cf4ccf1d12d2c99e58e12ecf7a91cc7b4bf594c38665a069d1f24922fc`, V1.4 adaptive selection hash `4344f0987798182c742732d2481ae986926cb7e46a36728a7f8750cf506a3690`, HNK `EN ZAMI HNK KE` and Esperanto unresolved behavior.

V1.5 is complete when a versioned Campaign Definition plus Journal can deterministically reconstruct the learner's legal journey, explain every unlock/block and safely resume through V1.4 without inventing curriculum or language.

**Hard rule:** `campaign position ≠ evidence ≠ gamification ≠ mastery ≠ proficiency ≠ linguistic authority`.