# A1 Campaign & Learning Path Engine V1.5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deterministic, replayable seven-cycle A1 campaign whose legal routes are unlocked by explicit evidence while V1.4 remains next-Mission authority.

**Architecture:** Add `packages/campaign/a1` above V1.4. A versioned multi-cycle map feeds an immutable Campaign DAG; append-only journal events project node/gate state; the runtime scopes V1.4 to available targets and emits explainable resume state.

**Tech Stack:** Node.js ESM, built-in `node:test`, SHA-256, V1.1–V1.4 engines.

**Spec:** `docs/superpowers/specs/2026-09-24-a1-campaign-learning-path-engine-v1-5-design.md`

## Global Constraints

- Macro-order: `CONTACT → REFERENCE → ACTION → CONTEXT → INTERACTION → TRANSFER → AUTONOMY`.
- Roles: `INTRODUCE`, `REINFORCE`, `APPLY`, `CHECKPOINT`, `REVIEW`.
- Never infer missing 180→7 membership; unresolved placement stays explicit.
- Campaign DAG must remain acyclic; Evidence Gates are explicit and XP/streaks never satisfy them.
- Journal is append-only authority; Projection/snapshot are disposable derived state.
- V1.4 remains next-Mission authority; V1.3 remains Mission/evidence authority.
- Preserve V1.3 hash `9e7435cf4ccf1d12d2c99e58e12ecf7a91cc7b4bf594c38665a069d1f24922fc` and V1.4 hash `4344f0987798182c742732d2481ae986926cb7e46a36728a7f8750cf506a3690`.

## Review Focus

- Partial Cycle Maps must diagnose unresolved membership without inventing placement.
- DAG branches/convergences must reject dangling references and cycles deterministically.
- Duplicate/out-of-order Journal events must fail closed before projection.
- Snapshot cache disagreement must prefer authoritative Journal replay.
- V1.4 BLOCKED language candidates must remain blocked even when graph routes are open.

---### Task 1: Multi-Cycle Map Contract

**Files:** Create `packages/campaign/a1/cycle-map.mjs`; Test `tests/a1-campaign-cycle-map.test.mjs`.

**Interfaces:** Produce `createCycleMap({id,version,cycles,participations})`, `validateCycleMap(map)`, `getParticipations(map,targetId)`.

- [ ] Write failing tests for exact seven-cycle macro-order, multi-cycle participation of one target, closed role vocabulary, immutable output and explicit unresolved target lookup.
- [ ] Add failures for duplicate participation identity, unknown cycle, unknown role and any helper that attempts automatic 180÷7 distribution.
- [ ] Run `node --test tests/a1-campaign-cycle-map.test.mjs`; require RED because module is absent.
- [ ] Implement minimal immutable Cycle Map validation/query; unresolved lookup returns structured `{status:'UNRESOLVED', targetId}` rather than guessed membership.
- [ ] Run focused test, `npm test`, `git diff --check`; commit `feat(a1): add campaign cycle map contract`.

### Task 2: Campaign Definition and DAG Validation

**Files:** Create `packages/campaign/a1/campaign-definition.mjs`, `packages/campaign/a1/graph-validator.mjs`; Test `tests/a1-campaign-definition.test.mjs`.

**Interfaces:** Consume Cycle Map; produce `createCampaignDefinition(input)` and `validateCampaignGraph(definition)`.

- [ ] Write failing branch/convergence fixture with immutable nodes `{id,cycle,targetId,role}`, directed edges and gate references; assert stable topological order.
- [ ] Add explicit failures for duplicate node IDs, dangling edge/gate IDs, self-edge and multi-node cycle.
- [ ] Add test proving unresolved Cycle Map membership cannot silently become a campaign node.
- [ ] Implement DAG validation with deterministic topological traversal and immutable definition output.
- [ ] Run focused/full suites and diff check; commit `feat(a1): define deterministic campaign dag`.### Task 3: Evidence Gate Engine

**Files:** Create `packages/campaign/a1/evidence-gates.mjs`; Test `tests/a1-campaign-evidence-gates.test.mjs`.

**Interfaces:** Produce `evaluateEvidenceGate({gate,journalProjection}) → {status:'SATISFIED'|'UNSATISFIED',requirements}`.

- [ ] Write failing tests for requirements `ACCEPTED_EVIDENCE`, `CHECKPOINT`, and `APPLY`; prove conjunction/convergence requires every declared requirement.
- [ ] Add tests proving XP, streak, elapsed time and mere node visitation cannot satisfy a gate; unknown requirement kinds fail closed.
- [ ] Assert evaluation returns satisfying event IDs and unsatisfied reason codes for later `Why?` traces.
- [ ] Implement pure gate evaluation against projected journal facts only.
- [ ] Run focused/full suites and commit `feat(a1): evaluate campaign evidence gates`.

### Task 4: Append-Only Campaign Journal

**Files:** Create `packages/campaign/a1/campaign-journal.mjs`; Test `tests/a1-campaign-journal.test.mjs`.

**Interfaces:** Produce `createCampaignJournal({campaignId,definitionVersion,events})`, `appendCampaignEvent(journal,event)`, `verifyCampaignJournal(journal)`.

- [ ] Write failing tests for stable event IDs, monotonic integer cursor, campaign/version provenance and immutable append.
- [ ] Add failures for duplicate event ID, duplicate/out-of-order cursor, campaign mismatch, malformed target/node references and mutation of historical evidence.
- [ ] Prove a later `REVIEW_DUE` event appends history without editing accepted evidence.
- [ ] Implement append/verify as pure immutable operations; no implicit clock or auto-generated evidence.
- [ ] Run focused/full suites and commit `feat(a1): add append only campaign journal`.

### Task 5: Deterministic Campaign Projection

**Files:** Create `packages/campaign/a1/campaign-projection.mjs`; Test `tests/a1-campaign-projection.test.mjs`.

**Interfaces:** Consume Definition + verified Journal; produce `projectCampaign({definition,journal,reviewPolicy,asOf})`.
- [ ] Write failing tests for initial `AVAILABLE/LOCKED`, activation, `EVIDENCED`, `CHECKPOINTED`, `REVIEW_DUE`, `BLOCKED`, branch unlock and convergence gate behavior.
- [ ] Assert projection includes available target IDs, satisfied/unsatisfied gate facts and exact journal event IDs supporting each unlock.
- [ ] Add deterministic replay test: independently reconstructed equivalent Journal yields deep-equal projection; omitted `asOf` never reads wall clock.
- [ ] Implement projection solely from Definition + verified Journal + explicit review inputs.
- [ ] Run focused/full suites and commit `feat(a1): project deterministic campaign state`.

### Task 6: CampaignStore Contract and Snapshot Recovery

**Files:** Create `packages/campaign/a1/campaign-store-contract.mjs`; Test `tests/a1-campaign-store-contract.test.mjs`.

**Interfaces:** Produce `createInMemoryCampaignStore()` implementing `appendEvents`, `loadJournal`, `saveSnapshotCache`, `loadSnapshotCache`, `verifyReplay`.

- [ ] Write failing storage-neutral contract tests for append/load order, campaign isolation and immutable returned values.
- [ ] Write snapshot-cache test where cached projection hash disagrees with fresh replay; require `verifyReplay` to return Journal replay as authority plus `CACHE_STALE` diagnostic.
- [ ] Add version mismatch and invalid journal rejection before cache use.
- [ ] Implement only in-memory reference adapter plus generic contract semantics; no browser/Supabase dependency in engine.
- [ ] Run focused/full suites and commit `feat(a1): define campaign persistence contract`.

### Task 7: V1.4 Campaign Runtime Integration

**Files:** Create `packages/campaign/a1/campaign-runtime.mjs`; Test `tests/a1-campaign-runtime.test.mjs`.

**Interfaces:** Produce `resumeCampaign(input) → {status,projection,nextMission,why}` using V1.4 `selectNextMission()`.

- [ ] Write failing test where Projection scopes V1.4 to currently available target IDs and HNK selects a legal READY Mission.
- [ ] Write open-graph Esperanto test requiring V1.4 `NO_ELIGIBLE_MISSION`; assert no linguistic payload is fabricated or leaked.
- [ ] Write `Why?` trace assertions for prerequisites, gate requirements, satisfying event IDs, blocking reasons, adaptive signal and version provenance.
- [ ] Implement orchestration without duplicating V1.4 ranking or V1.3 readiness/language gates.
- [ ] Run focused/full suites and commit `feat(a1): resume campaign through adaptive planner`.### Task 8: Canonical Campaign Serialization

**Files:** Create `packages/campaign/a1/campaign-serialization.mjs`; Test `tests/a1-campaign-serialization.test.mjs`.

**Interfaces:** Produce `serializeCampaignDefinition`, `hashCampaignDefinition`, `serializeCampaignProjection`, `hashCampaignProjection`.

- [ ] Write failing property-order independence and repeated byte/hash identity tests for Definition and Projection.
- [ ] Assert V1.5 provenance appears only in V1.5 artifacts and cannot alter V1.3 Mission or V1.4 adaptive selection canonical hashes.
- [ ] Add malformed state/unknown node-state rejection and no-mutation assertions.
- [ ] Implement explicit recursive canonical key ordering and SHA-256 over UTF-8.
- [ ] Run focused/full suites and commit `feat(a1): serialize campaign artifacts deterministically`.

### Task 9: Gamification Boundary

**Files:** Create `packages/campaign/a1/gamification-projection.mjs`; Test `tests/a1-campaign-gamification.test.mjs`.

**Interfaces:** Produce `projectGamification({journal,rewardPolicy})` as derived presentation state only.

- [ ] Write failing tests for deterministic XP/badge projection from declared events and reward policy.
- [ ] Prove changing XP/streak/badges cannot change Evidence Gate satisfaction, Campaign Projection availability or V1.4 Mission selection.
- [ ] Reject reward policies that claim gate-unlock authority or mutate journal evidence.
- [ ] Implement a minimal immutable derived projection with no dependency from evidence-gates/projection back to gamification.
- [ ] Run focused/full suites and commit `feat(a1): isolate campaign gamification state`.

### Task 10: V1.5 Campaign Release Verification

**Files:** Create `tests/a1-campaign-v1-5-e2e.test.mjs`; Create `docs/research/A1_CAMPAIGN_V1_5_VERIFICATION.md`.

**Interfaces:** Exercise complete Cycle Map → DAG → Journal → Projection → V1.4 → Mission → new events → replay pipeline.
- [ ] Build an E2E fixture with explicit multi-cycle participation, branch, convergence, checkpoint and review; verify legal route changes only after required evidence events.
- [ ] Delete/discard Projection and snapshot cache, replay Journal and require byte-identical projection/hash and same V1.4 next Mission.
- [ ] Reassert V1.1 `12/60/180/7`, V1.2 `12/60/180`, HNK `EN ZAMI HNK KE`, Esperanto unresolved behavior, V1.3 hash and V1.4 hash from Global Constraints.
- [ ] Scan `packages/campaign/a1` for TODO/FIXME, implicit random/time APIs, language-name branching, automatic 180÷7 allocation and forbidden learner verdicts (`mastered`, intelligence/psychological labels, CEFR certification).
- [ ] Run E2E, full `npm test`, `git diff --check`, static scans and canonical V1.5 Definition/Projection hash generation; require zero failures/blockers.
- [ ] Document exact counts, hashes, replay proof, blocked-language proof, unresolved Cycle Map boundary and authority matrix.
- [ ] Commit `test(a1): verify campaign learning path engine v1.5`.

## Delivery Sequence

Tasks 1–3 establish curricular placement, graph legality and evidence-gate semantics. Tasks 4–6 establish authoritative persistence and replay. Task 7 connects legal campaign scope to the already-verified V1.4 planner. Tasks 8–9 lock deterministic artifacts and keep gamification non-authoritative. Task 10 proves the complete campaign without fabricating the still-unresolved canonical 180→7 Cycle Map.

The V1.5 engine governs legal journey position, not learner mastery, proficiency, psychology, certification or linguistic authority.