import {createCycleMap,A1_CAMPAIGN_CYCLES} from '../campaign/a1/cycle-map.mjs';
import {createCampaignDefinition} from '../campaign/a1/campaign-definition.mjs';
import {createCampaignJournal} from '../campaign/a1/campaign-journal.mjs';
import {A1_CURRICULUM} from '../curriculum/a1/curriculum.mjs';
import {A1_SEMANTIC_CURRICULUM} from '../curriculum/a1/semantic-curriculum.mjs';
import {createA1SemanticView} from '../curriculum/a1/semantic-view.mjs';
import {A1_EXISTING_TARGET,mapExistingRealizations} from '../curriculum/a1/existing-realizations.mjs';
import {getLanguagePack} from '../language-packs/catalog.mjs';
import {A1_DEFAULT_MISSION_BLUEPRINT as blueprint} from '../experience/a1/default-mission-blueprint.mjs';
import {A1_DEFAULT_ADAPTIVE_POLICY as policy} from '../adaptive/a1/policy.mjs';

const cycleMap=createCycleMap({id:'a1-player-first-vertical',version:'1',cycles:A1_CAMPAIGN_CYCLES,
 participations:[{targetId:A1_EXISTING_TARGET,cycle:'CONTACT',role:'INTRODUCE'}]});
const definition=createCampaignDefinition({id:'a1-player-campaign',version:'1.5',cycleMap,
 nodes:[{id:'a1-first-contact',targetId:A1_EXISTING_TARGET,cycle:'CONTACT',role:'INTRODUCE'}],edges:[],gates:[]});
const semanticView=createA1SemanticView(A1_CURRICULUM,A1_SEMANTIC_CURRICULUM);
const readinessCells=Object.freeze([{microCapabilityId:A1_EXISTING_TARGET,linguistic:'READY',
 representation:{PRIMARY_TEXT:'READY'},pedagogical:'READY',evidence:'READY'}]);
const versionVector=Object.freeze({structural:'1.1',semantic:'1.2',experience:'1.3',adaptive:'1.4',campaign:'1.5'});

export function createA1PlayerCampaignInput({languagePackId,journal,asOf}={}) {
 const pack=getLanguagePack(languagePackId);
 if(!pack) throw new TypeError('known languagePackId required');
 if(typeof asOf!=='string'||!asOf) throw new TypeError('explicit asOf required');
 const authoritativeJournal=journal??createCampaignJournal({campaignId:definition.id,definitionVersion:definition.version,events:[]});
 return Object.freeze({definition,journal:authoritativeJournal,asOf,semanticView,events:Object.freeze([]),
  readinessCells,languagePack:mapExistingRealizations(pack),blueprint,policy,versionVector});
}
