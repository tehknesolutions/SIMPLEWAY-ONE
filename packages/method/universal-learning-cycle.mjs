import { validateCapability } from "../core/capability.mjs";
import { validateRealization } from "../core/realization.mjs";

const STAGES = Object.freeze([
 "capability", "encounter", "comprehend", "retrieve-produce", "interact-mediate",
 "reduce-support", "transfer", "revisit", "record-evidence", "update-acquisition-state"
].map((id, index) => Object.freeze({ id, order: index + 1 })));

export function createUniversalLearningCycle({ capability, realization }) {
 const checkedCapability = validateCapability(capability);
 const checkedRealization = validateRealization(realization);
 if (checkedRealization.capabilityId !== checkedCapability.id) throw new TypeError("Invalid universal learning cycle: realization capabilityId must match capability id");
 return Object.freeze({
   method: "SIMPLEWAY_UNIVERSAL_LEARNING_CYCLE_V1",
   capability: checkedCapability,
   realization: checkedRealization,
   language: checkedRealization.language,
   stages: STAGES
 });
}
