import { createUniversalMicroLesson } from '../method/universal-microlesson.mjs';

const representation = (id, surface, role='primary') => Object.freeze({ id, value:surface.value, script:surface.script, direction:surface.direction, role });
const mediaFrom = bundle => bundle.image ? Object.freeze({type:'image',...bundle.image}) : bundle.audio ? Object.freeze({type:'audio',...bundle.audio}) : null;

export function adaptCourseManifest(manifest = {}) {
  if (!manifest.languagePack?.id || !Array.isArray(manifest.units)) throw new TypeError('Invalid compiled course manifest');
  return Object.freeze(manifest.units.map((unit,index) => {
    const ready = unit.status === 'READY' || unit.status === 'PARTIAL';
    if (ready && !unit.bundle?.primary) throw new TypeError(`compiled unit ${unit.capabilityId} requires bundle primary representation`);
    const representations = ready ? [representation(unit.bundle.id ?? `bundle-${index}`, unit.bundle.primary)] : [];
    const base = createUniversalMicroLesson({ id:`compiled-${unit.capabilityId}`, capability:{id:unit.capabilityId,canDo:unit.capabilityId}, realization:{capabilityId:unit.capabilityId,language:manifest.languagePack.id,representations} });
    const media = ready ? mediaFrom(unit.bundle) : null;
    return media ? Object.freeze({...base,media}) : base;
  }));
}
