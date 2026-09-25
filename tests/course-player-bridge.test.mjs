import test from 'node:test';
import assert from 'node:assert/strict';
import { adaptCourseManifest } from '../packages/app/course-manifest-adapter.mjs';
import { createLessonRuntime, advanceLessonRuntime } from '../packages/runtime/lesson-runtime.mjs';
import { createPlayerViewModel } from '../packages/app/player-view-model.mjs';

const manifest = (id, status, primary, extras={}) => ({ languagePack:{id,version:'1'}, units:[{capabilityId:'m1',status,...(primary?{bundle:{id:`${id}.b`,primary,...extras,provenance:{source:'fixture',authority:'VALIDATED'}}}:{}),activities:[]}] });
const view = input => { const lessons=adaptCourseManifest(input); const runtime=createLessonRuntime({id:'r',microLessons:lessons}); return {lessons,runtime,vm:createPlayerViewModel({runtime,microLesson:lessons[0]})}; };

test('compiled English and canonical HNK become Runtime-compatible microlessons', () => {
  const en=view(manifest('english','READY',{value:'Do you speak HNK?',script:'Latn',direction:'ltr'}));
  const hnk=view(manifest('hnk','READY',{value:'EN ZAMI HNK KE',script:'Latn',direction:'ltr'}));
  assert.equal(en.vm.primaryRepresentation.value,'Do you speak HNK?'); assert.equal(hnk.vm.primaryRepresentation.value,'EN ZAMI HNK KE');
  assert.equal(en.vm.canAdvance,true); assert.equal(hnk.vm.canAdvance,true);
});

test('UNRESOLVED Esperanto remains blocked without fabricated representation', () => {
  const {vm}=view(manifest('esperanto','UNRESOLVED'));
  assert.equal(vm.status,'content-unresolved'); assert.equal(vm.primaryRepresentation,null); assert.equal(vm.canAdvance,false);
});
test('synthetic RTL and optional media survive bridge without language branches', () => {
  const {vm}=view(manifest('fixture-rtl','READY',{value:'مثال',script:'Arab',direction:'rtl'},{image:{src:'fixture.svg',alt:'fixture'}}));
  assert.equal(vm.direction,'rtl'); assert.equal(vm.primaryRepresentation.value,'مثال');
  assert.deepEqual(vm.media,{type:'image',src:'fixture.svg',alt:'fixture'});
});

test('Runtime progress remains authoritative after adapting compiled manifest', () => {
  const {lessons,runtime}=view(manifest('fixture','READY',{value:'Focus',script:'Latn',direction:'ltr'}));
  const advanced=advanceLessonRuntime(advanceLessonRuntime(runtime));
  const vm=createPlayerViewModel({runtime:advanced,microLesson:lessons[0]});
  assert.deepEqual(vm.progress,{completedSteps:2,totalSteps:10}); assert.equal(vm.stage.id,'comprehend');
});

test('bridge rejects malformed compiled units instead of guessing', () => {
  assert.throws(()=>adaptCourseManifest({languagePack:{id:'x'},units:[{capabilityId:'m1',status:'READY',activities:[]}]}),/bundle|representation/i);
});
