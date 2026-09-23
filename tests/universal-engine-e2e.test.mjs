import test from 'node:test';
import assert from 'node:assert/strict';
import { compileA1Reference, createSyntheticRtlPack } from '../packages/reference/a1-reference.mjs';
import { adaptCourseManifest } from '../packages/app/course-manifest-adapter.mjs';
import { createLessonRuntime } from '../packages/runtime/lesson-runtime.mjs';
import { createPlayerViewModel } from '../packages/app/player-view-model.mjs';

const run = packId => {
  const compiled=compileA1Reference(packId); const lessons=adaptCourseManifest(compiled.manifest);
  const runtime=createLessonRuntime({id:`runtime-${packId}`,microLessons:lessons});
  return {compiled,vm:createPlayerViewModel({runtime,microLesson:lessons[0]})};
};

test('A1 reference compiles English through runtime and player',()=>{
  const {compiled,vm}=run('english'); assert.equal(compiled.manifest.units[0].status,'READY'); assert.equal(vm.primaryRepresentation.value,'Do you speak HNK?');
});

test('A1 reference preserves canonical HNK through full vertical',()=>{
  const {vm}=run('hnk'); assert.equal(vm.primaryRepresentation.value,'EN ZAMI HNK KE'); assert.equal(vm.canAdvance,true);
});
test('A1 reference preserves unresolved Esperanto without invention',()=>{
  const {compiled,vm}=run('esperanto'); assert.equal(compiled.manifest.gaps.length,1); assert.equal(vm.status,'content-unresolved'); assert.equal(vm.primaryRepresentation,null);
});

test('synthetic RTL pack proves metadata-driven direction end-to-end',()=>{
  const pack=createSyntheticRtlPack(); const compiled=compileA1Reference(pack); const lessons=adaptCourseManifest(compiled.manifest);
  const runtime=createLessonRuntime({id:'rtl-runtime',microLessons:lessons}); const vm=createPlayerViewModel({runtime,microLesson:lessons[0]});
  assert.equal(vm.direction,'rtl'); assert.equal(vm.primaryRepresentation.value,'مثال');
});

test('reference compilation is deterministic',()=>{
  const a=compileA1Reference('hnk'), b=compileA1Reference('hnk'); assert.equal(a.hash,b.hash); assert.equal(a.canonical,b.canonical);
});
