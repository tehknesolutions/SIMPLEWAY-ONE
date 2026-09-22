import test from "node:test";
import assert from "node:assert/strict";
import { validateCapability } from "../packages/core/capability.mjs";
import { validateRepresentation } from "../packages/core/representation.mjs";

test("capability describes learner outcome without grammar", () => {
  const c = validateCapability({ id: "a1.identity.name", canDo: "identify oneself by name", level: "A1" });
  assert.equal(c.id, "a1.identity.name");
  assert.equal(c.canDo, "identify oneself by name");
});

test("representation supports script and direction without assuming Latin or LTR", () => {
  const r = validateRepresentation({ id: "hebrew-form", value: "שלום", script: "Hebr", direction: "rtl", role: "primary" });
  assert.equal(r.script, "Hebr");
  assert.equal(r.direction, "rtl");
});

test("representation can coexist with transliteration or alternate forms without making either universal", () => {
  const primary = validateRepresentation({ id: "jp-primary", value: "こんにちは", script: "Jpan", direction: "ltr", role: "primary" });
  const support = validateRepresentation({ id: "jp-romaji", value: "konnichiwa", script: "Latn", direction: "ltr", role: "support", relatesTo: primary.id });
  assert.equal(support.relatesTo, primary.id);
});

test("invalid direction and grammar-shaped capability fields fail explicitly", () => {
  assert.throws(() => validateRepresentation({ id: "x", value: "x", direction: "down" }), /direction/i);
  assert.throws(() => validateCapability({ id: "x", canDo: "x", tense: "present" }), /language-specific/i);
});
