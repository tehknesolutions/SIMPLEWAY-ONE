import test from 'node:test';
import assert from 'node:assert/strict';
import {createCampaignPlayerSession} from '../packages/app/campaign-player-session.mjs';
import {createCycleMap,A1_CAMPAIGN_CYCLES as cycles} from '../packages/campaign/a1/cycle-map.mjs';
import {createCampaignDefinition} from '../packages/campaign/a1/campaign-definition.mjs';
import {createCampaignJournal} from '../packages/campaign/a1/campaign-journal.mjs';
import {A1_CURRICULUM} from '../packages/curriculum/a1/curriculum.mjs';
import {A1_SEMANTIC_CURRICULUM} from '../packages/curriculum/a1/semantic-curriculum.mjs';
import {createA1SemanticView} from '../packages/curriculum/a1/semantic-view.mjs';
import {A1_EXISTING_TARGET,mapExistingRealizations} from '../packages/curriculum/a1/existing-realizations.mjs';
import {getLanguagePack} from '../packages/language-packs/catalog.mjs';
import {A1_DEFAULT_MISSION_BLUEPRINT as blueprint} from '../packages/experience/a1/default-mission-blueprint.mjs';
import {A1_DEFAULT_ADAPTIVE_POLICY as policy} from '../packages/adaptive/a1/policy.mjs';

const view=createA1SemanticView(A1_CURRICULUM,A1_SEMANTIC_CURRICULUM);
const map=createCycleMap({id:'player-map',version:'1',cycles,participations:[{targetId:A1_EXISTING_TARGET,cycle:'CONTACT',role:'INTRODUCE'}]});
const definition=createCampaignDefinition({id:'player-campaign',version:'1.5',cycleMap:map,nodes:[{id:'n1',targetId:A1_EXISTING_TARGET,cycle:'CONTACT',role:'INTRODUCE'}],edges:[],gates:[]});
const journal=createCampaignJournal({campaignId:definition.id,definitionVersion:definition.version,events:[]});
const cell={microCapabilityId:A1_EXISTING_TARGET,linguistic:'READY',representation:{PRIMARY_TEXT:'READY'},pedagogical:'READY',evidence:'READY'};
const input=id=>({definition,journal,asOf:'2026-09-25T18:00:00-03:00',semanticView:view,events:[],readinessCells:[cell],languagePack:mapExistingRealizations(getLanguagePack(id)),blueprint,policy,versionVector:{structural:'1.1',semantic:'1.2',experience:'1.3',adaptive:'1.4',campaign:'1.5'}});

test('SELECTED exposes HNK mission and authoritative journal',()=>{const s=createCampaignPlayerSession(input('hnk'));assert.equal(s.status,'SELECTED');assert.equal(s.mission.steps[0].realizations[0].bundle.primary.value,'EN ZAMI HNK KE');assert.equal(s.journal,journal);assert.ok(Object.isFrozen(s));});
test('identical Journal replay yields identical derived session',()=>{assert.deepEqual(createCampaignPlayerSession(input('hnk')),createCampaignPlayerSession(input('hnk')));});
test('NO_ELIGIBLE_MISSION exposes no mission',()=>{const s=createCampaignPlayerSession(input('esperanto'));assert.equal(s.status,'NO_ELIGIBLE_MISSION');assert.equal(s.mission,null);});
test('CAMPAIGN_COMPLETE exposes no mission',()=>{const completed={...input('hnk'),journal:createCampaignJournal({campaignId:definition.id,definitionVersion:definition.version,events:[{id:'done',cursor:1,campaignId:definition.id,definitionVersion:definition.version,type:'EVIDENCE',targetId:A1_EXISTING_TARGET,nodeId:'n1',accepted:true,at:'2026-09-25T17:00:00-03:00'}]})};const s=createCampaignPlayerSession(completed);assert.equal(s.status,'CAMPAIGN_COMPLETE');assert.equal(s.mission,null);});
