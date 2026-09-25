import test from 'node:test';
import assert from 'node:assert/strict';
import {createA1PlayerCampaignInput} from '../packages/app/a1-player-campaign.mjs';
import {createCampaignPlayerSession} from '../packages/app/campaign-player-session.mjs';

const asOf='2026-09-25T19:55:00-03:00';
const session=id=>createCampaignPlayerSession(createA1PlayerCampaignInput({languagePackId:id,asOf}));

test('HNK first vertical is READY with exact canonical surface',()=>{
 const s=session('hnk'); assert.equal(s.status,'SELECTED');
 assert.equal(s.mission.steps[0].realizations[0].bundle.primary.value,'EN ZAMI HNK KE');
});
test('English uses the same campaign factory and is READY',()=>{
 const s=session('english'); assert.equal(s.status,'SELECTED');
 assert.equal(s.mission.steps[0].realizations[0].bundle.primary.value,'Do you speak HNK?');
});
test('Esperanto stays unresolved and produces no eligible mission',()=>{
 const s=session('esperanto'); assert.equal(s.status,'NO_ELIGIBLE_MISSION'); assert.equal(s.mission,null);
});
test('fixture declares only the approved first vertical participation',()=>{
 const input=createA1PlayerCampaignInput({languagePackId:'hnk',asOf});
 assert.equal(input.definition.nodes.length,1); assert.equal(input.definition.cycleMap.participations.length,1);
 assert.equal(input.definition.cycleMap.participations[0].cycle,'CONTACT');
});
test('factory source has no language-id control-flow branching',async()=>{
 const src=await import('node:fs/promises').then(fs=>fs.readFile(new URL('../packages/app/a1-player-campaign.mjs',import.meta.url),'utf8'));
 assert.doesNotMatch(src,/if\s*\([^)]*(?:hnk|english|esperanto)|switch\s*\([^)]*(?:language|pack)/i);
});
