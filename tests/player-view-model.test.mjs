import test from "node:test";
import assert from "node:assert/strict";
import { createUniversalMicroLesson } from "../packages/method/universal-microlesson.mjs";
import { createLessonRuntime, advanceLessonRuntime } from "../packages/runtime/lesson-runtime.mjs";
import { createPlayerViewModel } from "../packages/app/player-view-model.mjs";

const capability = { id: "a1.review-focus", canDo: "review a focused expression", level: "A1" };
function lesson(language, representations) {
  return createUniversalMicroLesson({
    id: `review-${language}`,
    capability,
    realization: { capabilityId: capability.id, language, representations }
  });
}
function runtimeFor(microLesson) {
  return createLessonRuntime({ id: `runtime-${microLesson.language}`, microLessons: [microLesson] });
}

test("projects ready primary and auxiliary representations without language branches", () => {
  const microLesson = lesson("fixture", [
    { id: "primary", value: "Focus", script: "Latn", direction: "ltr", role: "primary" },
    { id: "aux", value: "Aux", script: "Latn", direction: "ltr", role: "support" }
  ]);
  const vm = createPlayerViewModel({ runtime: runtimeFor(microLesson), microLesson });
  assert.equal(vm.language, "fixture");
  assert.equal(vm.status, "ready");
  assert.equal(vm.primaryRepresentation.value, "Focus");
  assert.equal(vm.auxiliaryRepresentations[0].value, "Aux");
  assert.equal(vm.direction, "ltr");
  assert.equal(vm.canAdvance, true);
});

test("projects unresolved Review Focus safely and blocks content-dependent advance", () => {
  const microLesson = lesson("unresolved-fixture", []);
  const vm = createPlayerViewModel({ runtime: runtimeFor(microLesson), microLesson });
  assert.equal(vm.status, "content-unresolved");
  assert.equal(vm.primaryRepresentation, null);
  assert.deepEqual(vm.auxiliaryRepresentations, []);
  assert.equal(vm.direction, "ltr");
  assert.equal(vm.canAdvance, false);
});

test("projects RTL only from representation direction", () => {
  const microLesson = lesson("rtl-fixture", [
    { id: "primary", value: "مثال", script: "Arab", direction: "rtl", role: "primary" }
  ]);
  const vm = createPlayerViewModel({ runtime: runtimeFor(microLesson), microLesson });
  assert.equal(vm.direction, "rtl");
  assert.equal(vm.primaryRepresentation.direction, "rtl");
});

test("progress and stage are derived from Runtime", () => {
  const microLesson = lesson("fixture", [{ id: "p", value: "Focus", direction: "ltr", role: "primary" }]);
  const runtime = advanceLessonRuntime(advanceLessonRuntime(runtimeFor(microLesson)));
  const vm = createPlayerViewModel({ runtime, microLesson });
  assert.deepEqual(vm.progress, { completedSteps: 2, totalSteps: 10 });
  assert.equal(vm.stage.id, "comprehend");
});

test("missing media is tolerated and forbidden universal verdict fields are absent", () => {
  const microLesson = lesson("fixture", [{ id: "p", value: "Focus", direction: "ltr", role: "primary" }]);
  const vm = createPlayerViewModel({ runtime: runtimeFor(microLesson), microLesson });
  assert.equal(vm.media, null);
  assert.equal(Object.hasOwn(vm, "mastered"), false);
  assert.equal(Object.hasOwn(vm, "isCorrect"), false);
  assert.equal(vm.feedback, null);
});

test("rejects a runtime positioned on a different microlesson", () => {
  const first = lesson("first", [{ id: "p1", value: "One", direction: "ltr", role: "primary" }]);
  const second = lesson("second", [{ id: "p2", value: "Two", direction: "ltr", role: "primary" }]);
  const runtime = createLessonRuntime({ id: "r", microLessons: [first, second] });
  assert.throws(() => createPlayerViewModel({ runtime, microLesson: second }), /current microlesson/i);
});


test("passes optional language-pack media metadata through unchanged", () => {
  const base = lesson("media-fixture", [{ id: "p", value: "Focus", direction: "ltr", role: "primary" }]);
  const media = Object.freeze({ type: "image", src: "./assets/focus.svg", alt: "Focus visual" });
  const microLesson = Object.freeze({ ...base, media });
  const vm = createPlayerViewModel({ runtime: runtimeFor(microLesson), microLesson });
  assert.equal(vm.media, media);
  assert.deepEqual(vm.media, { type: "image", src: "./assets/focus.svg", alt: "Focus visual" });
});
test("campaign view model renders Mission representation without language branches", async () => {
  const {createCampaignPlayerViewModel}=await import('../packages/app/player-view-model.mjs');
  const primary={value:'EN ZAMI HNK KE',script:'Latn',direction:'ltr'};
  const mission={status:'READY',steps:[{id:'orient',role:'ORIENT',realizations:[{status:'READY',bundle:{primary}}]}]};
  const session={status:'SELECTED',mission,projection:{nodes:{n1:{state:'AVAILABLE'},n2:{state:'LOCKED'}},journalCursor:0},why:[]};
  const vm=createCampaignPlayerViewModel({session});
  assert.equal(vm.primaryRepresentation.value,'EN ZAMI HNK KE'); assert.equal(vm.direction,'ltr'); assert.equal(vm.canAdvance,true);
});

test("campaign view model clears content for non-selected/unresolved session", async () => {
  const {createCampaignPlayerViewModel}=await import('../packages/app/player-view-model.mjs');
  const vm=createCampaignPlayerViewModel({session:{status:'NO_ELIGIBLE_MISSION',mission:null,projection:{nodes:{n1:{state:'AVAILABLE'}},journalCursor:0},why:['UNRESOLVED']}});
  assert.equal(vm.primaryRepresentation,null); assert.deepEqual(vm.auxiliaryRepresentations,[]); assert.equal(vm.canAdvance,false);
});

test("campaign direction comes only from Representation and progress from Projection", async () => {
  const {createCampaignPlayerViewModel}=await import('../packages/app/player-view-model.mjs');
  const mission={status:'READY',steps:[{id:'orient',role:'ORIENT',realizations:[{status:'READY',bundle:{primary:{value:'مثال',script:'Arab',direction:'rtl'}}}]}]};
  const projection={nodes:{n1:{state:'EVIDENCED'},n2:{state:'AVAILABLE'},n3:{state:'LOCKED'}},journalCursor:7};
  const vm=createCampaignPlayerViewModel({session:{status:'SELECTED',mission,projection,why:[]}});
  assert.equal(vm.direction,'rtl'); assert.deepEqual(vm.progress,{completedSteps:1,totalSteps:3,journalCursor:7});
});
