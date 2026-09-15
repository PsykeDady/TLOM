export const AvatarSlot = {
	BODY: "BODY",
	EYES: "EYES",
	TOP: "TOP",
	HAIR: "HAIR"
};

export const AvatarRenderOrder = [AvatarSlot.BODY, AvatarSlot.EYES, AvatarSlot.TOP, AvatarSlot.HAIR];

export function createAvatarAsset({id, slot, src, order = 0, label = ""}) {
	if (typeof id !== "string" || id.length === 0 || !AvatarRenderOrder.includes(slot) || typeof src !== "string" || src.length === 0) {
		throw new TypeError("An AvatarAsset requires a stable id, valid slot, and source.");
	}

	return {id, slot, src, order, label};
}

export function createPlayerAvatar({selected = {}} = {}) {
	return {selected: {...selected}};
}