import test from "node:test";
import assert from "node:assert/strict";
import { createLessonRuntime, advanceLessonRuntime, recordLessonEvidence } from "../packages/runtime/lesson-runtime.mjs";

const lessons = [{ id: "m1", language: "english", status: "ready" }, { id: "m2", language: "hnk", status: "ready" }];

test("runtime starts at first microlesson and first universal stage", () => {
 const r = createLessonRuntime({ id: "lesson-1", microLessons: lessons });
 assert.equal(r.currentMicroLessonIndex, 0); assert.equal(r.currentStageIndex, 0); assert.equal(r.status, "in-progress");
});

test("advance traverses stages then moves to next microlesson", () => {
 let r = createLessonRuntime({ id: "lesson-1", microLessons: lessons });
 for (let i=0;i<10;i++) r = advanceLessonRuntime(r);
 assert.equal(r.currentMicroLessonIndex, 1); assert.equal(r.currentStageIndex, 0);
});

test("runtime completes only after final microlesson final stage", () => {
 let r = createLessonRuntime({ id: "lesson-1", microLessons: lessons });
 for (let i=0;i<20;i++) r = advanceLessonRuntime(r);
 assert.equal(r.status, "completed"); assert.equal(r.progress.completedSteps, 20); assert.equal(r.progress.totalSteps, 20);
});

test("evidence is appended without mutating prior runtime state", () => {
 const r1 = createLessonRuntime({ id: "lesson-1", microLessons: lessons });
 const r2 = recordLessonEvidence(r1, { id: "e1", activityId: "a1", capabilityId: "c1", kind: "learner-response", evaluationLayers: [] });
 assert.equal(r1.evidence.length, 0); assert.equal(r2.evidence.length, 1);
});

test("runtime rejects empty lesson collections and duplicate evidence ids", () => {
 assert.throws(() => createLessonRuntime({ id: "x", microLessons: [] }), /microLessons/i);
 const r = recordLessonEvidence(createLessonRuntime({ id: "x", microLessons: lessons }), { id: "e1", activityId: "a", capabilityId: "c", kind: "review", evaluationLayers: [] });
 assert.throws(() => recordLessonEvidence(r, { id: "e1", activityId: "a", capabilityId: "c", kind: "review", evaluationLayers: [] }), /duplicate/i);
});
