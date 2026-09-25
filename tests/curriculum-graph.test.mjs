import test from 'node:test';
import assert from 'node:assert/strict';
import { createCapabilityGraph } from '../packages/curriculum/capability-graph.mjs';
import { createSemanticPragmaticContract } from '../packages/curriculum/semantic-pragmatic-contract.mjs';

const contract = () => createSemanticPragmaticContract({
  id: 'spc.ask-name', intent: 'ask-name',
  meaning: 'request interlocutor name', context: 'basic introduction',
  participants: ['speaker', 'interlocutor'], register: 'neutral',
  pragmaticConstraints: ['appropriate introduction context'],
  evidenceExpectations: ['interaction']
});

test('semantic-pragmatic contract is immutable and language independent', () => {
  const value = contract();
  assert.equal(value.intent, 'ask-name');
  assert.ok(Object.isFrozen(value));
  assert.equal('translation' in value, false);
});

test('graph validates hierarchy and prerequisite references', () => {
  const graph = createCapabilityGraph({ id:'a1', domains:[{id:'social', families:[{id:'intro', capabilities:[{id:'identity', microCapabilities:[
    {id:'ask-name', contract:contract(), prerequisites:[]},
    {id:'answer-name', contract:contract(), prerequisites:['ask-name']}
  ]}]}]}] });
  assert.equal(graph.domains[0].families[0].capabilities[0].microCapabilities.length, 2);
  assert.ok(Object.isFrozen(graph));
});

test('graph rejects duplicate stable ids', () => {
  assert.throws(() => createCapabilityGraph({id:'a1', domains:[{id:'social', families:[{id:'intro', capabilities:[{id:'identity', microCapabilities:[
    {id:'x', contract:contract(), prerequisites:[]}, {id:'x', contract:contract(), prerequisites:[]}
  ]}]}]}]}), /duplicate/i);
});

test('graph rejects unknown prerequisite and missing hierarchy', () => {
  assert.throws(() => createCapabilityGraph({id:'a1', domains:[{id:'social', families:[{id:'intro', capabilities:[{id:'identity', microCapabilities:[
    {id:'x', contract:contract(), prerequisites:['missing']}
  ]}]}]}]}), /prerequisite/i);
  assert.throws(() => createCapabilityGraph({id:'a1', domains:[]}), /domain/i);
});