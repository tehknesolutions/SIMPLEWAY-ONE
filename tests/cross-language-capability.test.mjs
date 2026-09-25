import test from "node:test";
import assert from "node:assert/strict";
import { validateCapability } from "../packages/core/capability.mjs";
import { validateRealization } from "../packages/core/realization.mjs";

const capability = validateCapability({ id: "a1.identity.name", canDo: "identify oneself by name", level: "A1" });

const fixtures = [
  { language: "english", representations: [{ id: "en", value: "My name is Ana.", script: "Latn", direction: "ltr", role: "primary" }] },
  { language: "esperanto", representations: [{ id: "eo", value: "Mia nomo estas Ana.", script: "Latn", direction: "ltr", role: "primary" }] },
  { language: "hebrew", representations: [{ id: "he", value: "שמי אנה", script: "Hebr", direction: "rtl", role: "primary" }] },
  { language: "japanese", representations: [{ id: "ja", value: "私の名前はアナです。", script: "Jpan", direction: "ltr", role: "primary" }, { id: "ja-romaji", value: "Watashi no namae wa Ana desu.", script: "Latn", direction: "ltr", role: "support", relatesTo: "ja" }] },
  { language: "hnk", authority: { status: "candidate-fixture-only", note: "No HNK utterance invented for this cross-language architecture test." }, representations: [] }
];

test("one capability accepts radically different language realizations without core language branches", () => {
  const realized = fixtures.map((fixture) => validateRealization({ capabilityId: capability.id, ...fixture }));
  assert.equal(realized.length, 5);
  assert.equal(realized[2].representations[0].direction, "rtl");
  assert.equal(realized[3].representations.length, 2);
  assert.equal(realized[4].representations.length, 0);
  assert.equal(realized[4].authority.status, "candidate-fixture-only");
});

test("realization rejects missing capability linkage but does not require grammar or translation", () => {
  assert.throws(() => validateRealization({ language: "x", representations: [] }), /capabilityId/i);
  assert.doesNotThrow(() => validateRealization({ capabilityId: capability.id, language: "x", representations: [] }));
});
