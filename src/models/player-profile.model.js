export function createPlayerProfile({id, displayName, avatar}) {
	if (typeof id !== "string" || id.length === 0 || typeof displayName !== "string" || displayName.length === 0) {
		throw new TypeError("A PlayerProfile requires an id and displayName.");
	}

	return {id, displayName, avatar};
}