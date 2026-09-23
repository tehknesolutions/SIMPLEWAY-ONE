const NEXT=new Map([
  ['UNRESOLVED',new Set(['CANDIDATE'])],
  ['CANDIDATE',new Set(['VALIDATED'])],
  ['VALIDATED',new Set(['PEDAGOGICALLY_APPROVED'])],
  ['PEDAGOGICALLY_APPROVED',new Set(['READY'])]
]);

export function canTransitionAuthority(from,to,context={}){
  if(context.sourceAuthority==='AI_GENERATED'&&['VALIDATED','CANONICAL','READY'].includes(to)) return false;
  return NEXT.get(from)?.has(to)??false;
}
