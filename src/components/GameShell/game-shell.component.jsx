import { useContext } from "react";
import { GoalsContext } from "../../context/goals.context";
import { PlayerContext } from "../../context/users.context";
import PlayerAvatar from "../Avatar/player-avatar.component";

export function PlayerStatus() {
	const {profile, avatarAssets} = useContext(PlayerContext);
	const {walletBalances} = useContext(GoalsContext);
	return <header className="player-status">
		<PlayerAvatar avatar={profile?.avatar} avatarAssets={avatarAssets} label={`${profile?.displayName ?? "Player"} avatar`} />
		<div className="player-status__identity"><div className="player-status__eyebrow">The Legend of Myself</div><h1 className="player-status__name">{profile?.displayName ?? "Player"}</h1></div>
		<div className="wallet-summary" aria-label="Wallet summary">{walletBalances.map(({currency, balance}) => <span className="wallet-chip" key={currency.id}>{balance} {currency.symbol}</span>)}</div>
	</header>;
}

export function BottomNavigation({tabs, selected, onSelect}) {
	return <nav className="bottom-navigation" aria-label="Primary navigation">
		{tabs.map((tab, index) => <button className="bottom-navigation__item" type="button" key={tab.name} onClick={() => onSelect(index)} aria-current={selected === index ? "page" : undefined}>
			<span className="bottom-navigation__symbol" aria-hidden="true">{tab.symbol}</span>{tab.label}
		</button>)}
	</nav>;
}

function GameShell({tabs, selected, onSelect, children}) {
	return <main className="game-shell"><div className="game-shell__frame"><PlayerStatus /><div className="game-shell__content">{children}</div><BottomNavigation tabs={tabs} selected={selected} onSelect={onSelect} /></div></main>;
}

export default GameShell;