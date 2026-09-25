import test from 'node:test'; import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { A1_EXISTING_TARGET } from '../packages/curriculum/a1/existing-realizations.mjs';
import { validateSemanticContract } from '../packages/curriculum/a1/semantic-contract.mjs';
import F09 from '../packages/curriculum/a1/semantics/f09-space-direction-movement.mjs';
import F10 from '../packages/curriculum/a1/semantics/f10-description-basic-comparison.mjs';
import F11 from '../packages/curriculum/a1/semantics/f11-ability-permission-preference.mjs';
import F12 from '../packages/curriculum/a1/semantics/f12-repair-communicative-survival.mjs';
const catalogs=[F09,F10,F11,F12], structural=A1_CURRICULUM.families.slice(8,12);

test('families 09-12 preserve exact ids and 21 distinct goals',()=>{const goals=[];catalogs.forEach((f,i)=>{assert.equal(f.familyId,structural[i].id);assert.deepEqual(f.capabilities.map(c=>c.id),structural[i].capabilities.map(c=>c.id));goals.push(...f.capabilities.map(c=>c.goal));});assert.equal(goals.length,21);assert.equal(new Set(goals).size,21);});

test('families 09-12 provide exactly 63 valid contracts with exact micro ids',()=>{let count=0;catalogs.forEach((f,i)=>f.capabilities.forEach((c,j)=>{assert.deepEqual(c.contracts.map(x=>x.id),structural[i].capabilities[j].microCapabilities.map(m=>m.id));for(const x of c.contracts){assert.equal(validateSemanticContract(x.contract),true);count++;}}));assert.equal(count,63);});

test('existing language-use inquiry target is semantic only and contains no HNK or English surface',()=>{const entry=F12.capabilities.flatMap(c=>c.contracts).find(x=>x.id===A1_EXISTING_TARGET);assert.ok(entry);const text=JSON.stringify(entry);assert.match(text,/language/i);assert.doesNotMatch(text,/EN ZAMI HNK KE|Do you speak HNK\?/i);});
