import React, { useMemo, useState } from "react";
import { AvatarSlot, createAvatarAsset, createPlayerAvatar } from "../models/avatar.model";
import { createPlayerProfile } from "../models/player-profile.model";
import { updatePlayerAvatarSelection } from "../domain/avatar.service";
import bodyDefault from "../assets/avatar/body-default.svg";
import eyesViolet from "../assets/avatar/eyes-violet.svg";
import hairDark from "../assets/avatar/hair-dark.svg";
import hairPink from "../assets/avatar/hair-pink.svg";
import topPurple from "../assets/avatar/top-purple.svg";
import topCyan from "../assets/avatar/top-cyan.svg";

const avatarAssets = [
	createAvatarAsset({id: "body-default", slot: AvatarSlot.BODY, src: bodyDefault, order: 10, label: "Default body"}),
	createAvatarAsset({id: "eyes-violet", slot: AvatarSlot.EYES, src: eyesViolet, order: 20, label: "Violet eyes"}),
	createAvatarAsset({id: "top-purple", slot: AvatarSlot.TOP, src: topPurple, order: 30, label: "Purple outfit"}),
	createAvatarAsset({id: "top-cyan", slot: AvatarSlot.TOP, src: topCyan, order: 30, label: "Cyan outfit"}),
	createAvatarAsset({id: "hair-dark", slot: AvatarSlot.HAIR, src: hairDark, order: 40, label: "Midnight hair"}),
	createAvatarAsset({id: "hair-pink", slot: AvatarSlot.HAIR, src: hairPink, order: 40, label: "Rose hair"})
];

export const PlayerContext = React.createContext({
	profile: null,
	avatarAssets: [],
	selectAvatarAsset: () => {}
}); 

function PlayerProvider(props) {
	const [profile, setProfile] = useState(() => createPlayerProfile({
		id: "player-psyke",
		displayName: "PsykeDady",
		avatar: createPlayerAvatar({selected: {BODY: "body-default", EYES: "eyes-violet", TOP: "top-purple", HAIR: "hair-dark"}})
	}));
	const selectAvatarAsset = (slot, assetId) => setProfile(currentProfile => ({
		...currentProfile,
		avatar: updatePlayerAvatarSelection(currentProfile.avatar, avatarAssets, slot, assetId)
	}));
	const value = useMemo(() => ({profile, avatarAssets, selectAvatarAsset}), [profile]);

	return <PlayerContext.Provider value={value}>{props.children}</PlayerContext.Provider>;
}

export default PlayerProvider;

