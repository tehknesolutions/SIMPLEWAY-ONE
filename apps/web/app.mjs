import {listLanguagePacks,getLanguagePack} from '../../packages/language-packs/catalog.mjs';
import {createA1PlayerCampaignInput} from '../../packages/app/a1-player-campaign.mjs';
import {createCampaignPlayerSession,applyCampaignPlayerEvent} from '../../packages/app/campaign-player-session.mjs';
import {createCampaignPlayerViewModel} from '../../packages/app/player-view-model.mjs';

const mounts={
 languages:document.querySelector('#language-selector'),lessons:document.querySelector('#lesson-list'),
 content:document.querySelector('[data-content-slot]'),capability:document.querySelector('[data-capability]'),
 representation:document.querySelector('[data-representation]'),unresolved:document.querySelector('[data-state="content-unresolved"]'),
 media:document.querySelector('[data-optional="media"]'),feedback:document.querySelector('#feedback'),
 progressLabel:document.querySelector('[data-progress-label]'),progressBar:document.querySelector('[data-progress-bar]'),
 advance:document.querySelector('[data-action="advance"]')
};
let selectedPack=null,sessionInput=null,session=null,evidenceSequence=0;
const now=()=>new Date().toISOString();

function renderLanguages(){mounts.languages.replaceChildren(...listLanguagePacks().map(pack=>{
 const button=document.createElement('button'); button.type='button'; button.className='language-option';
 button.textContent=pack.label; button.dataset.languageId=pack.id; button.addEventListener('click',()=>selectLanguage(pack.id)); return button;
}));}
function renderLessons(){
 if(!selectedPack){mounts.lessons.textContent='Choose a language.';return;}
 const button=document.createElement('button'); button.type='button'; button.className='lesson-option';
 button.textContent=`${selectedPack.level} · Campaign`; button.disabled=session?.status!=='SELECTED'; mounts.lessons.replaceChildren(button);
}
function renderPlayer(){
 if(!session)return; const viewModel=createCampaignPlayerViewModel({session});
 mounts.capability.textContent=session.mission?.targetId??'Campaign'; mounts.content.dir=viewModel.direction;
 mounts.media.replaceChildren(); mounts.media.hidden=!viewModel.media;
 if(viewModel.media?.type==='image'){const image=document.createElement('img');image.src=viewModel.media.src;image.alt=viewModel.media.alt??'';mounts.media.append(image);}
 mounts.representation.textContent=viewModel.primaryRepresentation?.value??'—';
 const unresolved=session.status==='NO_ELIGIBLE_MISSION'; mounts.unresolved.hidden=!unresolved; mounts.content.hidden=unresolved;
 mounts.advance.disabled=!viewModel.canAdvance; mounts.progressLabel.textContent=`${viewModel.progress.completedSteps} / ${viewModel.progress.totalSteps}`;
 const denominator=Math.max(viewModel.progress.totalSteps,1); mounts.progressBar.style.width=`${(viewModel.progress.completedSteps/denominator)*100}%`;
}
function selectLanguage(id){
 selectedPack=getLanguagePack(id); sessionInput=null; session=null; evidenceSequence=0; mounts.feedback.textContent='';
 if(!selectedPack){renderLessons();return;}
 sessionInput=createA1PlayerCampaignInput({languagePackId:selectedPack.id,asOf:now()});
 session=createCampaignPlayerSession(sessionInput); renderLessons(); renderPlayer();
}
function runCampaignAction(event){
 if(!session)return; const previousSession=session,previousInput=sessionInput;
 try{session=applyCampaignPlayerEvent(sessionInput,event);sessionInput={...sessionInput,journal:session.journal};mounts.feedback.textContent='';renderLessons();renderPlayer();}
 catch(error){session=previousSession;sessionInput=previousInput;mounts.feedback.textContent=error instanceof Error?error.message:'Action could not be completed.';renderPlayer();}
}
mounts.advance.addEventListener('click',()=>{
 if(!session)return; const viewModel=createCampaignPlayerViewModel({session}); if(!viewModel.canAdvance)return;
 evidenceSequence+=1; const node=Object.values(session.projection.nodes).find(item=>item.state==='AVAILABLE'); if(!node)return;
 runCampaignAction({id:`web-evidence-${evidenceSequence}`,cursor:session.journal.events.length+1,
  campaignId:sessionInput.definition.id,definitionVersion:sessionInput.definition.version,type:'EVIDENCE',
  targetId:node.targetId,nodeId:node.nodeId,accepted:true,at:now()});
});
renderLanguages(); renderLessons();
