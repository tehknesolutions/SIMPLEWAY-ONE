import test from 'node:test';
import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { createA1DependencyGraph, validatePrerequisiteDAG } from '../packages/curriculum/a1/dependencies.mjs';

const micros=A1_CURRICULUM.families.flatMap(f=>f.capabilities).flatMap(c=>c.microCapabilities).map(m=>m.id);
const [a,b,c]=micros;
const edge=(id,from,to,type)=>({id,from,to,type});

test('dependency graph accepts all six typed pedagogical relations',()=>{
  const types=['PREREQUISITE','SUPPORTS','REINFORCES','CONTRASTS','TRANSFERS_TO','REVISITS'];
  const graph=createA1DependencyGraph(types.map((type,i)=>edge(`e${i}`,a,b,type)),A1_CURRICULUM);
  assert.deepEqual(graph.edges.map(e=>e.type),types); assert.ok(Object.isFrozen(graph));
});

test('unknown nodes, duplicate edges and invalid types fail closed',()=>{
  assert.throws(()=>createA1DependencyGraph([edge('x','missing',b,'SUPPORTS')],A1_CURRICULUM),/unknown/i);
  assert.throws(()=>createA1DependencyGraph([edge('x',a,b,'SUPPORTS'),edge('x',a,c,'CONTRASTS')],A1_CURRICULUM),/duplicate/i);
  assert.throws(()=>createA1DependencyGraph([edge('x',a,b,'DEPENDS')],A1_CURRICULUM),/type/i);
});
test('prerequisite cycles are rejected with actionable error',()=>{
  const graph=createA1DependencyGraph([edge('p1',a,b,'PREREQUISITE'),edge('p2',b,c,'PREREQUISITE'),edge('p3',c,a,'PREREQUISITE')],A1_CURRICULUM,{validateDAG:false});
  assert.throws(()=>validatePrerequisiteDAG(graph),/cycle/i);
});

test('nonblocking revisit cycles remain legal',()=>{
  const graph=createA1DependencyGraph([edge('r1',a,b,'REVISITS'),edge('r2',b,a,'REINFORCES')],A1_CURRICULUM);
  assert.equal(validatePrerequisiteDAG(graph),true);
});
