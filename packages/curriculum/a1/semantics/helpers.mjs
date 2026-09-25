import { createSemanticContract } from '../semantic-contract.mjs';

export function makeFamily(family,goals){
  if(goals.length!==family.capabilities.length) throw new TypeError('semantic goal count must match structural capability count');
  return Object.freeze({familyId:family.id,capabilities:Object.freeze(family.capabilities.map((cap,index)=>{
    const goal=goals[index];
    const stages=[
      ['perform',`Convey the core outcome: ${goal}`,`Learner conveys the intended outcome recognizably in a supported exchange`,'core operation only'],
      ['recognize',`Recognize or respond to the same outcome: ${goal}`,`Learner recognizes or responds appropriately to the intended outcome`,'no broader inference beyond the same outcome'],
      ['transfer',`Use the outcome in a minimally changed context: ${goal}`,`Learner preserves the intended outcome after a small contextual change`,'no claim of unrestricted generalization']
    ];
    const contracts=cap.microCapabilities.map((micro,microIndex)=>{
      const [role,intent,evidence,boundary]=stages[microIndex];
      return Object.freeze({id:micro.id,contract:createSemanticContract({intent,interactionRole:role,semanticScope:[goal],pragmaticConditions:[`A1 interaction where the outcome is relevant: ${goal}`],evidenceCriteria:[evidence],exclusions:[boundary],depth:{core:goal,context:`A1 interaction relevant to ${goal}`,boundary}})});
    });
    return Object.freeze({id:cap.id,goal,contracts:Object.freeze(contracts)});
  }))});
}
