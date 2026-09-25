import test from 'node:test';
import assert from 'node:assert/strict';
import { compileCourse } from '../packages/compiler/course-compiler.mjs';

const bundle = (value, audio) => ({ id:`b.${value}`, primary:{value,script:'Latn',direction:'ltr'}, ...(audio?{audio:{src:audio}}:{}), provenance:{source:'fixture',authority:'VALIDATED'} });
const base = (status='READY', withAudio=false) => ({
  graph:{id:'g1',domains:[{id:'d',families:[{id:'f',capabilities:[{id:'c',microCapabilities:[{id:'m1',contract:{id:'contract'},prerequisites:[]}]}]}]}]},
  levelProfile:{id:'A1',version:'1'}, learningPath:{id:'standard',version:'1',capabilityIds:['m1']},
  languagePack:{id:'fixture',version:'1.0.0',realizations:[{capabilityId:'m1',status,...((status==='READY'||status==='PARTIAL')?{bundle:bundle('hello',withAudio?'hello.mp3':null)}:{}),provenance:{source:'fixture',authority:'VALIDATED'}}]},
  activities:[{id:'text',version:'1',targetMicroCapabilities:['m1'],stimulusModalities:['text'],responseModalities:['text'],evidenceTypes:['recall'],evaluationPolicyId:'exact'}, {id:'listen',version:'1',targetMicroCapabilities:['m1'],stimulusModalities:['audio'],responseModalities:['text'],evidenceTypes:['comprehension'],evaluationPolicyId:'exact'}],
  evaluationPolicies:[{id:'exact',version:'1',mode:'exact'}], progressPolicy:{id:'progress',version:'1'},
  versionVector:{method:'1',curriculum:'1',levelProfile:'1',learningPath:'1',languagePack:'1.0.0',activities:'1',evaluation:'1',progress:'1',compiler:'1'}
});

test('identical versioned inputs compile to identical canonical output and hash', () => {
  const a=compileCourse(base()), b=compileCourse(base());
  assert.equal(a.hash,b.hash); assert.equal(a.canonical,b.canonical); assert.deepEqual(a.manifest,b.manifest);
});

test('changing a versioned input changes the content hash', () => {
  const a=compileCourse(base()); const changed=base(); changed.versionVector.method='2';
  assert.notEqual(a.hash,compileCourse(changed).hash);
});
test('UNRESOLVED becomes an explicit gap and never fabricated content', () => {
  const out=compileCourse(base('UNRESOLVED'));
  assert.equal(out.manifest.units[0].status,'UNRESOLVED'); assert.equal(out.manifest.units[0].bundle,undefined); assert.equal(out.manifest.gaps.length,1);
});

test('PARTIAL compiles only activities supported by available modalities', () => {
  const out=compileCourse(base('PARTIAL'));
  assert.deepEqual(out.manifest.units[0].activities.map(x=>x.id),['text']);
});

test('missing audio excludes listening while validated audio enables it', () => {
  assert.deepEqual(compileCourse(base('READY')).manifest.units[0].activities.map(x=>x.id),['text']);
  assert.deepEqual(compileCourse(base('READY',true)).manifest.units[0].activities.map(x=>x.id),['text','listen']);
});

test('NOT_APPLICABLE follows explicit skip policy', () => {
  const input=base('NOT_APPLICABLE'); input.notApplicablePolicy='SKIP';
  const out=compileCourse(input); assert.equal(out.manifest.units[0].status,'NOT_APPLICABLE'); assert.equal(out.manifest.units[0].action,'SKIP');
});

test('invalid graph/path/realization references fail closed', () => {
  const unknown=base(); unknown.learningPath.capabilityIds=['missing']; assert.throws(()=>compileCourse(unknown),/unknown path capability/i);
  const missing=base(); missing.languagePack.realizations=[]; assert.throws(()=>compileCourse(missing),/missing realization/i);
});
