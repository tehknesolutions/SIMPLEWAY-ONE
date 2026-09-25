import {resumeCampaign} from '../campaign/a1/campaign-runtime.mjs';
import {appendCampaignEvent} from '../campaign/a1/campaign-journal.mjs';

const freeze=value=>{
  if(!value||typeof value!=='object'||Object.isFrozen(value)) return value;
  for(const child of Object.values(value)) freeze(child);
  return Object.freeze(value);
};

export function createCampaignPlayerSession(input={}) {
  const resumed=resumeCampaign(input);
  return freeze({
    status:resumed.status,
    projection:resumed.projection,
    mission:resumed.status==='SELECTED'?resumed.nextMission:null,
    why:resumed.why,
    journal:input.journal
  });
}
export function applyCampaignPlayerEvent(sessionInput,event) {
  const journal=appendCampaignEvent(sessionInput.journal,event);
  return createCampaignPlayerSession({...sessionInput,journal});
}
