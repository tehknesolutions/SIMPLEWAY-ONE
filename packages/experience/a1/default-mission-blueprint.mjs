import { createExperienceBlueprint } from './blueprint.mjs';
export const A1_DEFAULT_MISSION_BLUEPRINT=createExperienceBlueprint({
  id:'A1-MISSION-DEFAULT',version:'1.0.0',targetCount:{min:1,max:3},
  requiredRepresentations:['PRIMARY_TEXT'],evidenceRequirements:['OBSERVABLE_RESPONSE'],
  retryPolicy:'RETRY_ALLOWED',completionRule:'CHECKPOINT_REQUIRED',steps:[
    {id:'micro-lesson',role:'MICRO_LESSON'},
    {id:'scenario',role:'SCENARIO'},
    {id:'challenge',role:'CHALLENGE'},
    {id:'checkpoint',role:'CHECKPOINT'}
  ]
});
