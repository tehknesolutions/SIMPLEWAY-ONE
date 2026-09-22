function fail(message) { throw new TypeError(`Invalid interaction observation: ${message}`); }
export function evaluateInteraction({ capabilityId, turns }) {
 if (typeof capabilityId !== "string" || !capabilityId.trim()) fail("capabilityId is required");
 if (!Array.isArray(turns) || turns.length < 3) fail("interaction requires a multi-turn exchange");
 const actors = new Set(turns.map((turn) => turn?.actor).filter(Boolean));
 if (actors.size < 2) fail("interaction requires at least two actors");
 const learnerTurns = turns.filter((turn) => turn?.actor === "learner");
 if (learnerTurns.length < 2) fail("interaction requires at least two learner turns");
 if (learnerTurns.some((turn) => typeof turn.function !== "string" || !turn.function.trim())) fail("learner turns require functions");
 const learnerFunctions = [...new Set(learnerTurns.map((turn) => turn.function))];
 const observed = learnerTurns.every((turn) => turn.outcome === "success");
 return Object.freeze({
   experiment: "EXP-26",
   dimension: "interaction",
   capabilityId: capabilityId.trim(),
   turnCount: turns.length,
   learnerTurnCount: learnerTurns.length,
   learnerFunctions: Object.freeze(learnerFunctions),
   status: observed ? "observed" : "not-observed"
 });
}
