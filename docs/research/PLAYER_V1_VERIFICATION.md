# SimpleWay One — Player V1 Verification

Date: 2026-09-23
Branch: `feat/shell-v1`
Scope: first universal vertical `Language Pack → MicroLesson → Runtime → View Model → Web Player`.

## Automated evidence

- Focused web smoke: 10/10 PASS.
- Full suite before final commit: 90/90 PASS.
- Canonical HNK assertion pins `EN ZAMI HNK KE` byte-for-byte.
- Esperanto remains `content-unresolved` with zero invented representations.
- Controller contains no English/HNK/Esperanto conditional UI branches.
- Optional media, no-media, responsive containment and RTL scoping are covered.

## Browser / responsive evidence

Real Chromium screenshots were captured with Playwright CLI at 390×844 and 1440×1000.

- `docs/research/qa/player-v1-390.png`
- `docs/research/qa/player-v1-1440.png`

Mobile QA exposed horizontal overflow in the first pass. The shell was corrected with shrink-safe grid/action rules and recaptured successfully.

## Exercised states

- Neutral shell before language selection.
- English and HNK ready-state data through the same catalog/runtime/view-model path.
- Runtime advance/progress is covered by Runtime + view-model tests.
- Esperanto unresolved state blocks content-dependent advance.
- Synthetic RTL representation is verified at view-model/CSS boundary without flipping app chrome.
- Media is optional and collapses when absent.

## Limitations

This milestone is a local Player V1 verification, not a production deployment. The current catalog contains one A1 micro-lesson per language pack; lesson expansion and richer activity renderers remain future work. Browser screenshots prove responsive rendering; automated DOM interaction remains intentionally lightweight in this static shell milestone.

## Completion gate

Final verification must run `npm test`, inspect forbidden universal verdicts (`mastered`, `isCorrect`), inspect language-name branches, and confirm a clean Git working tree after commit.