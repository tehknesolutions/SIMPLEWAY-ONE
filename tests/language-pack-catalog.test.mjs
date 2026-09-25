import test from "node:test";
import assert from "node:assert/strict";
import { listLanguagePacks, getLanguagePack } from "../packages/language-packs/catalog.mjs";

test("catalog lists English HNK and Esperanto as A1 packs", () => {
  const packs = listLanguagePacks();
  assert.deepEqual(packs.map((pack) => pack.id), ["english", "hnk", "esperanto"]);
  assert.ok(packs.every((pack) => pack.level === "A1"));
  assert.ok(packs.every((pack) => Array.isArray(pack.microLessons) && pack.microLessons.length === 1));
});

test("HNK catalog preserves confirmed project form byte-for-byte", () => {
  const hnk = getLanguagePack("hnk");
  assert.equal(hnk.microLessons[0].primaryRepresentation.value, "EN ZAMI HNK KE");
  assert.equal(hnk.microLessons[0].status, "ready");
});

test("Esperanto remains explicitly unresolved without invented utterance", () => {
  const esperanto = getLanguagePack("esperanto");
  assert.equal(esperanto.status, "content-unresolved");
  assert.equal(esperanto.microLessons[0].status, "content-unresolved");
  assert.equal(esperanto.microLessons[0].primaryRepresentation, null);
});

test("unknown ids return null", () => {
  assert.equal(getLanguagePack("not-a-language"), null);
});

test("returned collections cannot mutate registry authority", () => {
  const first = listLanguagePacks();
  assert.ok(Object.isFrozen(first));
  assert.ok(Object.isFrozen(first[0]));
  assert.ok(Object.isFrozen(first[0].microLessons));
  assert.throws(() => first.push({ id: "intruder" }), TypeError);
  assert.throws(() => { first[0].label = "mutated"; }, TypeError);
  assert.throws(() => first[0].microLessons.push({ id: "intruder" }), TypeError);

  const fresh = getLanguagePack("english");
  assert.equal(fresh.label, "English");
  assert.equal(fresh.microLessons.length, 1);
});