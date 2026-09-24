# A1 Semantic Curriculum V1.2 — Verification

**Date:** 2026-09-23  
**Branch:** `feat/universal-engine-v1`

## Release evidence

- Structural invariant: **12 families / 60 capabilities / 180 Micro-capability contracts / 7 cycles**.
- All semantic IDs equal the V1.1 structural ID sets and order.
- All 60 capabilities have explicit non-placeholder communicative goals.
- All 180 Micro-capabilities have complete Semantic-Pragmatic Contracts with Core, Context and Boundary depth.
- Semantic audit reports zero release-blocking findings on the release dataset.
- Canonical HNK realization remains byte-for-byte `EN ZAMI HNK KE`.
- Esperanto remains explicitly `UNRESOLVED`; V1.2 does not fabricate a realization.

## Deterministic semantic dataset

Canonical `JSON.stringify(A1_SEMANTIC_CURRICULUM)`:

- SHA-256: `18a0a0eede07f646767fce76a8c5e0b7debdd30b02bfcdf875f98a83e507364b`
- UTF-8 bytes: `144404`

## Release boundary

V1.2 establishes the universal semantic meaning of the A1 graph. It does **not** claim 180 authored or validated linguistic realizations in English, HNK, Esperanto or any other language.

Semantic completeness is independent from Language Pack coverage and epistemic authority. A semantic contract states what a learner needs to communicate; only separately validated Language Pack evidence may state how a language realizes that function.

## Quality gates

The release audit blocks generic placeholders, duplicate capability goals within a family, missing boundaries/exclusions, language-specific grammar prescriptions, literal HNK/English realizations and semantic surface-field leakage.

The Semantic View is a pure read-only ID join. It leaves the V1.1 structural curriculum and English/HNK/Esperanto Language Pack objects unchanged.
