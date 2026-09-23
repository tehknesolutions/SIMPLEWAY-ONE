import test from 'node:test';
import assert from 'node:assert/strict';
import { createComparativeMatrix } from '../packages/research/comparative-matrix.mjs';
import { createTransferGraph } from '../packages/research/transfer-graph.mjs';

const evidence={source:'comparative-study-1',authority:'RESEARCHED'};

test('comparative matrix supports typed evidence-linked relations', () => {
  const matrix=createComparativeMatrix({id:'matrix-1',version:'1',relations:[
    {id:'r1',left:'lang-a:x',right:'lang-b:y',type:'EQUIVALENT',evidence},
    {id:'r2',left:'lang-a:p',right:'lang-b:q',type:'ANALOGOUS',evidence},
    {id:'r3',left:'lang-a:m',right:'lang-b:n',type:'NON_EQUIVALENT',evidence},
    {id:'r4',left:'lang-a:u',right:null,type:'UNIQUE',evidence}
  ]});
  assert.deepEqual(matrix.relations.map(x=>x.type),['EQUIVALENT','ANALOGOUS','NON_EQUIVALENT','UNIQUE']); assert.ok(Object.isFrozen(matrix));
});

test('comparative relations require evidence/provenance and valid types', () => {
  assert.throws(()=>createComparativeMatrix({id:'x',version:'1',relations:[{id:'r',left:'a',right:'b',type:'ANALOGOUS'}]}),/evidence/i);
  assert.throws(()=>createComparativeMatrix({id:'x',version:'1',relations:[{id:'r',left:'a',right:'b',type:'SAME',evidence}]}),/type/i);
});
test('transfer graph stores evidence-linked hypotheses without promotion', () => {
  const graph=createTransferGraph({id:'transfer-1',version:'1',edges:[{id:'e1',from:'pt:cap',to:'en:cap',effect:'FACILITATES',evidence,hypothesis:'shared prior knowledge may help'}]});
  assert.equal(graph.edges[0].authority,'HYPOTHESIS'); assert.equal('validated' in graph.edges[0],false); assert.equal('canonical' in graph.edges[0],false);
});

test('transfer effects are typed and automatic authority promotion is rejected', () => {
  assert.throws(()=>createTransferGraph({id:'x',version:'1',edges:[{id:'e',from:'a',to:'b',effect:'GUARANTEES',evidence}]}),/effect/i);
  assert.throws(()=>createTransferGraph({id:'x',version:'1',edges:[{id:'e',from:'a',to:'b',effect:'FACILITATES',evidence,authority:'VALIDATED'}]}),/authority|promotion/i);
});
