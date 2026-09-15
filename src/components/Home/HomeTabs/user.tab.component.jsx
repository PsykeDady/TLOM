import { SessionContext } from "../../../context/session.context";
import { UserContext } from "../../../context/users.context";
import { useContext } from "react";
import { GoalsContext } from "../../../context/goals.context";


function UserTabComponent (){

	let sessionContext = useContext(SessionContext);
	let userContext = useContext (UserContext);
	let goalsContext = useContext (GoalsContext);

	const storeItemsById = new Map(goalsContext.storeItems.map(item => [item.id, item]));

	return <section className="game-page"><p className="section-eyebrow">Your legend</p><h2 className="game-page__heading">Player</h2><article className="game-card player-profile"><div className="player-profile__avatar"><img src={userContext.avatar} alt="Player avatar" /></div><div><h3>{sessionContext.loggedUser || "Player"}</h3><p className="muted">{userContext.job} · Level {userContext.lvl}</p><p className="muted">Life {userContext.lifepoint}/{userContext.hpmax} · {userContext.experience} XP</p></div></article><section className="game-card"><h3>Wallet</h3>
				{goalsContext.walletBalances.map(({currency, balance}) =>
					<div key={currency.id} className="split-line wallet-detail">
						<span>{currency.name}</span>
						<strong>{balance} {currency.symbol}</strong>
					</div>
				)}
			</section>{goalsContext.purchases.length > 0 && <section className="game-card"><h3>Purchase history</h3>{goalsContext.purchases.map(purchase => <div className="split-line wallet-detail" key={purchase.id}><span>{storeItemsById.get(purchase.storeItemId)?.name ?? purchase.storeItemId}</span><span className="muted">{purchase.price.amount} {goalsContext.currencies.find(currency => currency.id === purchase.price.currencyId)?.symbol ?? purchase.price.currencyId}</span></div>)}</section>}</section>;
} export default UserTabComponent