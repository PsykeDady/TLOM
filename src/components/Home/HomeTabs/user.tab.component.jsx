import { useContext } from "react";
import { GoalsContext } from "../../../context/goals.context";
import { PlayerContext } from "../../../context/users.context";
import { AvatarSlot } from "../../../models/avatar.model";
import PlayerAvatar from "../../Avatar/player-avatar.component";
import { ActivityPackagesContext } from "../../../context/activity-packages.context";


function UserTabComponent (){

	const {profile, avatarAssets, selectAvatarAsset} = useContext(PlayerContext);
	const goalsContext = useContext(GoalsContext);
	const {catalog, isInstalled, installPackage} = useContext(ActivityPackagesContext);

	const storeItemsById = new Map(goalsContext.storeItems.map(item => [item.id, item]));

	const appearanceSlots = [AvatarSlot.HAIR, AvatarSlot.TOP];

	return <section className="game-page">
		<p className="section-eyebrow">Your legend</p>
		<h2 className="game-page__heading">Player</h2>
		<article className="game-card player-profile">
			<PlayerAvatar avatar={profile?.avatar} avatarAssets={avatarAssets} label={`${profile?.displayName ?? "Player"} avatar`} variant="profile" />
			<div><h3>{profile?.displayName ?? "Player"}</h3><p className="muted">Your character is composed from a local avatar catalog.</p></div>
		</article>
		<section className="game-card">
			<h3>Package Library</h3>
			{catalog.map(packageDefinition => {
				const installed = isInstalled(packageDefinition);
				return <div className="package-library__item" key={packageDefinition.id}>
					<div><strong>{packageDefinition.name}</strong><p className="muted">{packageDefinition.description}</p></div>
					<button type="button" className="game-button game-button--secondary" onClick={() => installPackage(packageDefinition.id)} disabled={installed}>{installed ? "Installed" : "Install"}</button>
				</div>;
			})}
		</section>
		<section className="game-card">
			<h3>Appearance</h3>
			{appearanceSlots.map(slot => <div className="appearance-choice" key={slot}>
				<h4>{slot === AvatarSlot.HAIR ? "Hair" : "Outfit"}</h4>
				<div className="appearance-choice__options">{avatarAssets.filter(asset => asset.slot === slot).map(asset => <button type="button" className="game-button game-button--secondary" key={asset.id} onClick={() => selectAvatarAsset(slot, asset.id)} aria-pressed={profile?.avatar.selected[slot] === asset.id}>{asset.label}{profile?.avatar.selected[slot] === asset.id ? " selected" : ""}</button>)}</div>
			</div>)}
		</section>
		<section className="game-card"><h3>Wallet</h3>
			{goalsContext.walletBalances.map(({currency, balance}) => <div key={currency.id} className="split-line wallet-detail"><span>{currency.name}</span><strong>{balance} {currency.symbol}</strong></div>)}
		</section>
		{goalsContext.purchases.length > 0 && <section className="game-card"><h3>Purchase history</h3>{goalsContext.purchases.map(purchase => <div className="split-line wallet-detail" key={purchase.id}><span>{storeItemsById.get(purchase.storeItemId)?.name ?? purchase.storeItemId}</span><span className="muted">{purchase.price.amount} {goalsContext.currencies.find(currency => currency.id === purchase.price.currencyId)?.symbol ?? purchase.price.currencyId}</span></div>)}</section>}
	</section>;
} export default UserTabComponent