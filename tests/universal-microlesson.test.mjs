import test from "node:test";
import assert from "node:assert/strict";
import { createUniversalMicroLesson } from "../packages/method/universal-microlesson.mjs";

const capability = { id: "a1.language.speak-hnk", canDo: "ask whether someone speaks HNK", level: "A1" };
const packs = {
 english: { capabilityId: capability.id, language: "english", representations: [{ id: "en", value: "Do you speak HNK?", script: "Latn", direction: "ltr", role: "primary" }] },
 esperanto: { capabilityId: capability.id, language: "esperanto", representations: [], authority: { status: "unresolved" } },
 hnk: { capabilityId: capability.id, language: "hnk", representations: [{ id: "hnk", value: "EN ZAMI HNK KE", script: "Latn", direction: "ltr", role: "primary" }], authority: { status: "confirmed-project-canon" } }
};

test("one microlesson blueprint runs the same method for English Esperanto and HNK", () => {
 const lessons = Object.values(packs).map(realization => createUniversalMicroLesson({ id: "ml-a1-speak-hnk", capability, realization }));
 assert.deepEqual(lessons.map(x => x.cycle.stages.length), [10,10,10]);
 assert.deepEqual(lessons.map(x => x.language), ["english","esperanto","hnk"]);
});

test("HNK lesson uses confirmed project form exactly", () => {
 const lesson = createUniversalMicroLesson({ id: "ml-a1-speak-hnk", capability, realization: packs.hnk });
 assert.equal(lesson.primaryRepresentation.value, "EN ZAMI HNK KE");
});

test("unresolved language remains renderable without invented representation", () => {
 const lesson = createUniversalMicroLesson({ id: "ml-a1-speak-hnk", capability, realization: packs.esperanto });
 assert.equal(lesson.primaryRepresentation, null);
 assert.equal(lesson.status, "content-unresolved");
});

test("microlesson requires an id and delegates capability linkage validation to method", () => {
 assert.throws(() => createUniversalMicroLesson({ capability, realization: packs.english }), /id/i);
 assert.throws(() => createUniversalMicroLesson({ id: "x", capability, realization: { ...packs.english, capabilityId: "other" } }), /capability/i);
});
