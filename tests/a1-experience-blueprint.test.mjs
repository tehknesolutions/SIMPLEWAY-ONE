import test from 'node:test'; import assert from 'node:assert/strict';
import { createExperienceBlueprint, validateExperienceBlueprint } from '../packages/experience/a1/blueprint.mjs';
import { A1_DEFAULT_MISSION_BLUEPRINT } from '../packages/experience/a1/default-mission-blueprint.mjs';

const valid={id:'A1-MISSION-DEFAULT',version:'1.0.0',targetCount:{min:1,max:3},requiredRepresentations:['PRIMARY_TEXT'],evidenceRequirements:['OBSERVABLE_RESPONSE'],retryPolicy:'RETRY_ALLOWED',completionRule:'CHECKPOINT_REQUIRED',steps:[
{id:'learn',role:'MICRO_LESSON'},{id:'scenario',role:'SCENARIO'},{id:'challenge',role:'CHALLENGE'},{id:'checkpoint',role:'CHECKPOINT'}]};

test('creates immutable blueprint with mandatory learning-loop roles',()=>{const x=createExperienceBlueprint(valid);assert.equal(validateExperienceBlueprint(x),true);assert.ok(Object.isFrozen(x));assert.deepEqual(x.steps.map(s=>s.role),['MICRO_LESSON','SCENARIO','CHALLENGE','CHECKPOINT']);});
test('default blueprint is valid and language-neutral',()=>{assert.equal(validateExperienceBlueprint(A1_DEFAULT_MISSION_BLUEPRINT),true);assert.doesNotMatch(JSON.stringify(A1_DEFAULT_MISSION_BLUEPRINT),/EN ZAMI HNK KE|Do you speak HNK\?/i);});
test('rejects missing checkpoint, duplicate step ids and unknown roles',()=>{assert.throws(()=>validateExperienceBlueprint({...valid,steps:valid.steps.slice(0,3)}),/CHECKPOINT/i);assert.throws(()=>validateExperienceBlueprint({...valid,steps:[valid.steps[0],{...valid.steps[1],id:'learn'},...valid.steps.slice(2)]}),/duplicate/i);assert.throws(()=>validateExperienceBlueprint({...valid,steps:[...valid.steps,{id:'x',role:'MAGIC'}]}),/role/i);});
test('rejects empty representations and embedded language surfaces',()=>{assert.throws(()=>validateExperienceBlueprint({...valid,requiredRepresentations:[]}),/representation/i);assert.throws(()=>validateExperienceBlueprint({...valid,instruction:'EN ZAMI HNK KE'}),/surface|literal/i);});