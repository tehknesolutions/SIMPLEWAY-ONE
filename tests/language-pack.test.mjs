import test from "node:test";
import assert from "node:assert/strict";
import { validateLanguagePack } from "../packages/core/language-pack.mjs";

test("accepts a minimal language-neutral pack", () => {
  const pack = validateLanguagePack({
    id: "fixture",
    display: { name: "Fixture" },
    capabilities: ["identity"],
    lessons: [{ id: "intro", linguistic: { opaque: true } }]
  });
  assert.equal(pack.id, "fixture");
  assert.equal(pack.lessons[0].id, "intro");
});

test("preserves optional authority metadata opaquely", () => {
  const authority = { status: "validated", source: "fixture-source" };
  const pack = validateLanguagePack({ id: "fixture", display: { name: "Fixture" }, capabilities: [], lessons: [{ id: "intro", linguistic: {} }], authority });
  assert.deepEqual(pack.authority, authority);
});

test("rejects malformed packs explicitly", () => {
  assert.throws(() => validateLanguagePack({ display: { name: "Missing id" }, lessons: [] }), /language pack.*id/i);
  assert.throws(() => validateLanguagePack({ id: "x", display: {}, lessons: [] }), /display.*name/i);
  assert.throws(() => validateLanguagePack({ id: "x", display: { name: "X" }, lessons: "bad" }), /lessons/i);
});
