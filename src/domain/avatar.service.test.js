import { AvatarSlot, createAvatarAsset, createPlayerAvatar } from "../models/avatar.model";
import { createPlayerProfile } from "../models/player-profile.model";
import { getAvatarLayers, updatePlayerAvatarSelection } from "./avatar.service";

describe("avatar composition", () => {
	const body = createAvatarAsset({id: "body-default", slot: AvatarSlot.BODY, src: "body.svg", order: 10});
	const eyes = createAvatarAsset({id: "eyes-violet", slot: AvatarSlot.EYES, src: "eyes.svg", order: 20});
	const top = createAvatarAsset({id: "top-purple", slot: AvatarSlot.TOP, src: "top.svg", order: 30});
	const hairDark = createAvatarAsset({id: "hair-dark", slot: AvatarSlot.HAIR, src: "hair-dark.svg", order: 40});
	const hairPink = createAvatarAsset({id: "hair-pink", slot: AvatarSlot.HAIR, src: "hair-pink.svg", order: 40});
	const catalog = [hairPink, top, body, eyes, hairDark];
	const avatar = createPlayerAvatar({selected: {BODY: "body-default", EYES: "eyes-violet", TOP: "top-purple", HAIR: "hair-dark"}});

	it("requires a stable asset id and a valid slot", () => {
		expect(() => createAvatarAsset({slot: AvatarSlot.BODY, src: "body.svg"})).toThrow(TypeError);
		expect(() => createAvatarAsset({id: "unknown", slot: "CAPE", src: "cape.svg"})).toThrow(TypeError);
	});

	it("selects one referenced asset per avatar slot", () => {
		expect(getAvatarLayers(avatar, catalog).map(asset => asset.id)).toEqual(["body-default", "eyes-violet", "top-purple", "hair-dark"]);
	});

	it("changes hair without changing body", () => {
		const updated = updatePlayerAvatarSelection(avatar, catalog, AvatarSlot.HAIR, "hair-pink");
		expect(updated.selected.HAIR).toBe("hair-pink");
		expect(updated.selected.BODY).toBe("body-default");
		expect(avatar.selected.HAIR).toBe("hair-dark");
	});

	it("uses deterministic render order independent of catalog array order", () => {
		expect(getAvatarLayers(avatar, catalog).map(asset => asset.id)).toEqual(getAvatarLayers(avatar, [...catalog].reverse()).map(asset => asset.id));
	});

	it("ignores unknown asset IDs and missing optional slots", () => {
		const partialAvatar = createPlayerAvatar({selected: {BODY: "body-default", HAIR: "missing"}});
		expect(getAvatarLayers(partialAvatar, catalog).map(asset => asset.id)).toEqual(["body-default"]);
	});

	it("keeps identity separate from the catalog when updating appearance", () => {
		const profile = createPlayerProfile({id: "player-psyke", displayName: "PsykeDady", avatar});
		const updatedAvatar = updatePlayerAvatarSelection(profile.avatar, catalog, AvatarSlot.TOP, "top-purple");
		expect(profile).toMatchObject({id: "player-psyke", displayName: "PsykeDady"});
		expect(updatedAvatar).not.toBe(profile.avatar);
		expect(catalog).toEqual([hairPink, top, body, eyes, hairDark]);
	});
});