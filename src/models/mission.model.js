export const MissionProgressStrategy = {
	ACTIVITY_COMPLETION: "ACTIVITY_COMPLETION",
	MANUAL: "MANUAL"
};

export function createMission({
	id,
	name,
	description = "",
	goalIds = [],
	progressStrategy = MissionProgressStrategy.MANUAL,
	progress = {current: 0, target: 0}
}) {
	return {id, name, description, goalIds, progressStrategy, progress};
}