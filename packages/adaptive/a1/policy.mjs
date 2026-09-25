const SIGNALS=['RETRY','REINFORCE','ADVANCE','REVIEW','NEW'];
const TIES=['STRUCTURAL_ORDER','TARGET_ID'];
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
const text=v=>typeof v==='string'&&v.trim().length>0;
export function validateAdaptivePolicy(p={}){
 if(!text(p.id)||!text(p.version))throw new TypeError('policy id/version required');
 if(!Array.isArray(p.signalPriority)||p.signalPriority.length!==SIGNALS.length||new Set(p.signalPriority).size!==SIGNALS.length||SIGNALS.some(x=>!p.signalPriority.includes(x)))throw new TypeError('signal priority must be exact permutation');
 for(const k of ['retryLimit','reinforcementLimit','candidateLimit'])if(!Number.isInteger(p[k])||p[k]<0)throw new TypeError('non-negative integer limit required');
 if(p.candidateLimit<1)throw new TypeError('candidate limit must be positive');
 if(!p.targetCount||!Number.isInteger(p.targetCount.min)||!Number.isInteger(p.targetCount.max)||p.targetCount.min<1||p.targetCount.max<p.targetCount.min)throw new TypeError('valid target bounds required');
 if(!Array.isArray(p.tieBreak)||p.tieBreak.length!==TIES.length||p.tieBreak.some((x,i)=>x!==TIES[i]))throw new TypeError('tie break must be structural order then target id');
 if(p.review?.mode!=='EXPLICIT_DUE'||p.cycleGate!=='CURRENT_CYCLE_FIRST')throw new TypeError('supported review/cycle policy required');
 if(/EN ZAMI HNK KE|Do you speak HNK\?/i.test(JSON.stringify(p)))throw new TypeError('language-specific literal forbidden');return true;
}
export function createAdaptivePolicy(input={}){const p=structuredClone(input);validateAdaptivePolicy(p);return freeze(p);}
export const A1_DEFAULT_ADAPTIVE_POLICY=createAdaptivePolicy({id:'A1-ADAPTIVE-DEFAULT',version:'1.0.0',signalPriority:[...SIGNALS],retryLimit:2,reinforcementLimit:2,review:{mode:'EXPLICIT_DUE'},candidateLimit:12,targetCount:{min:1,max:3},tieBreak:[...TIES],cycleGate:'CURRENT_CYCLE_FIRST'});