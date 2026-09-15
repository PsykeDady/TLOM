import { AvatarRenderOrder, createPlayerAvatar } from "../models/avatar.model";

export function getAvatarLayers(avatar, avatarAssets) {
	const selected = avatar?.selected ?? {};
	const assetsById = new Map((Array.isArray(avatarAssets) ? avatarAssets : []).map(asset => [asset.id, asset]));

	return AvatarRenderOrder
		.map((slot, slotIndex) => ({asset: assetsById.get(selected[slot]), slot, slotIndex}))
		.filter(({asset, slot}) => asset?.slot === slot)
		.sort((left, right) => left.slotIndex - right.slotIndex || left.asset.order - right.asset.order)
		.map(({asset}) => asset);
}

export function updatePlayerAvatarSelection(avatar, avatarAssets, slot, assetId) {
	const asset = (Array.isArray(avatarAssets) ? avatarAssets : []).find(item => item.id === assetId);
	if (!AvatarRenderOrder.includes(slot) || !asset || asset.slot !== slot) {
		return avatar;
	}

	return createPlayerAvatar({selected: {...avatar.selected, [slot]: assetId}});
}