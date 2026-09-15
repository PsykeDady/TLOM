import { useContext } from "react";
import { GoalsContext } from "../../../context/goals.context";
import { getStoreItems } from "../../../domain/store.service";

function StoreTabComponent() {
	const goalsContext = useContext(GoalsContext);
	const currenciesById = new Map(goalsContext.currencies.map(currency => [currency.id, currency]));
	const itemsById = new Map(goalsContext.storeItems.map(item => [item.id, item]));
	let purchaseFeedback = null;
	if (goalsContext.lastPurchase?.error === "INSUFFICIENT_FUNDS") {
		purchaseFeedback = "Not enough funds for this item.";
	} else if (goalsContext.lastPurchase?.error) {
		purchaseFeedback = "This item is not available.";
	} else if (goalsContext.lastPurchase?.purchase) {
		purchaseFeedback = `${itemsById.get(goalsContext.lastPurchase.purchase.storeItemId)?.name ?? "Item"} purchased. The price was recorded in your Wallet.`;
	}

	return <section className="game-page">
		<p className="section-eyebrow">Spend earned rewards</p><h2 className="game-page__heading">Store</h2><p className="game-page__intro">Choose a reward when your Wallet says you are ready.</p>
		{goalsContext.lastPurchase &&
			<output className={`notice ${goalsContext.lastPurchase.error ? "notice--warning" : ""}`}>
				{purchaseFeedback}
			</output>
		}
		{goalsContext.stores.map(store =>
			<section key={store.id}>
				<h3>{store.name}</h3>
				{getStoreItems(store, goalsContext.storeItems).map(item => {
					const currency = currenciesById.get(item.price.currencyId);
					const balance = goalsContext.walletBalances.find(itemBalance => itemBalance.currency.id === item.price.currencyId)?.balance ?? 0;
					const canAfford = balance >= item.price.amount;
					return <article key={item.id} className="game-card game-card--elevated store-item"><div className="art-slot" aria-hidden="true">◇</div><div className="store-item__content"><div className="split-line"><h4>{item.name}</h4><span className={`status-badge ${canAfford ? "status-badge--completed" : "status-badge--skipped"}`}>{canAfford ? "Available" : "Need more currency"}</span></div><p className="muted">{item.description}</p><p className="reward-badge">{item.price.amount} {currency?.symbol ?? item.price.currencyId}</p><button type="button" className="game-button" onClick={() => goalsContext.purchaseStoreItem(store.id, item.id)} disabled={!canAfford} aria-label={`Buy ${item.name} for ${item.price.amount} ${currency?.symbol ?? item.price.currencyId}`}>
							{canAfford ? "Buy reward" : "Not enough currency"}
						</button>
					</div></article>;
				})}
			</section>
		)}
	</section>;
}

export default StoreTabComponent;