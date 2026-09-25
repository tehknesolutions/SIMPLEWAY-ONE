const PLACEHOLDER=/capability\s+\d+|communicative outcome\s+\d+/i;
const GRAMMAR=/word order|mandatory pronoun|present simple|\bcopula\b|\barticle\b|grammatical case|gender agreement/i;
const LITERAL=/EN ZAMI HNK KE|Do you speak HNK\?/i;
const SURFACE_KEYS=new Set(['surface','surfaces','realization','realizations','bundle','primary']);
const finding=(category,path,detail)=>({category,path,detail});

function walk(value,path,out){
  if(!value||typeof value!=='object') return;
  for(const [key,nested] of Object.entries(value)){
    const next=`${path}.${key}`; if(SURFACE_KEYS.has(key)) out.push(finding('SURFACE_LEAK',next,`forbidden semantic surface field: ${key}`));
    if(typeof nested==='string'){
      if(PLACEHOLDER.test(nested)) out.push(finding('PLACEHOLDER',next,'generic numbered placeholder'));
      if(GRAMMAR.test(nested)) out.push(finding('GRAMMAR_PRESCRIPTION',next,'language-specific grammar prescription'));
      if(LITERAL.test(nested)) out.push(finding('LITERAL_REALIZATION',next,'literal language realization'));
    } else walk(nested,next,out);
  }
}

export function auditA1Semantics(dataset){
  const out=[]; walk(dataset,'$',out);
  for(const family of dataset.families??[]){
    const seen=new Set(); for(const cap of family.capabilities??[]){if(seen.has(cap.goal))out.push(finding('OVERLAP',`${family.familyId}.${cap.id}.goal`,'duplicate capability goal'));seen.add(cap.goal);
      for(const entry of cap.contracts??[]){if(!entry.contract?.exclusions?.length||!entry.contract?.depth?.boundary)out.push(finding('MISSING_BOUNDARY',`${cap.id}.${entry.id}`,'semantic boundary/exclusion missing'));}
    }
  }
  return out.sort((a,b)=>`${a.category}:${a.path}`.localeCompare(`${b.category}:${b.path}`));
}

export function assertA1SemanticRelease(dataset){
  const findings=auditA1Semantics(dataset); if(findings.length) throw new TypeError(`semantic release blocked: ${findings.length} finding(s)`); return true;
}
