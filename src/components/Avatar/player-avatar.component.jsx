import { getAvatarLayers } from "../../domain/avatar.service";

function PlayerAvatar({avatar, avatarAssets, label = "Player avatar", variant = "compact"}) {
	const layers = getAvatarLayers(avatar, avatarAssets);
	if (layers.length === 0) {
		return <div className={`player-avatar player-avatar--${variant} player-avatar--fallback`} role="img" aria-label={`${label}, appearance unavailable`}>?</div>;
	}

	return <div className={`player-avatar player-avatar--${variant}`} role="img" aria-label={label}>
		{layers.map(layer => <img key={layer.id} src={layer.src} alt="" aria-hidden="true" />)}
	</div>;
}

export default PlayerAvatar;