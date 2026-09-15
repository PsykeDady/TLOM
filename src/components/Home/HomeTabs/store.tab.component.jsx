import { useContext } from "react";
import { GoalsContext } from "../../../context/goals.context";
import { getStoreItems } from "../../../domain/store.service";

function StoreTabComponent() {
	const goalsContext = useContext(GoalsContext);
	const currenciesById = new Map(goalsContext.currencies.map(currency => [currency.id, currency]));
	let purchaseFeedback = null;
	if (goalsContext.lastPurchase?.error === "INSUFFICIENT_FUNDS") {
		purchaseFeedback = "Not enough funds for this item.";
	} else if (goalsContext.lastPurchase?.error) {
		purchaseFeedback = "This item is not available.";
	} else if (goalsContext.lastPurchase?.purchase) {
		purchaseFeedback = `${goalsContext.lastPurchase.purchase.storeItemId} purchased.`;
	}

	return <div className="container pt-3">
		<h2 className="h4">Store</h2>
		{goalsContext.lastPurchase &&
			<output className={`alert ${goalsContext.lastPurchase.error ? "alert-warning" : "alert-success"}`}>
				{purchaseFeedback}
			</output>
		}
		{goalsContext.stores.map(store =>
			<div key={store.id} className="mb-4">
				<h3 className="h5">{store.name}</h3>
				{getStoreItems(store, goalsContext.storeItems).map(item => {
					const currency = currenciesById.get(item.price.currencyId);
					const balance = goalsContext.walletBalances.find(itemBalance => itemBalance.currency.id === item.price.currencyId)?.balance ?? 0;
					return <div key={item.id} className="border-bottom py-2 d-flex justify-content-between align-items-center gap-2">
						<div><strong>{item.name}</strong><div className="xs-text inactive-fg">{item.description}</div></div>
						<button type="button" className="btn btn-sm btn-outline-light" onClick={() => goalsContext.purchaseStoreItem(store.id, item.id)} disabled={balance < item.price.amount}>
							{item.price.amount} {currency?.symbol ?? item.price.currencyId}
						</button>
					</div>;
				})}
			</div>
		)}
		{goalsContext.purchases.length > 0 && <div><h3 className="h5">Purchases</h3>{goalsContext.purchases.map(purchase => <div key={purchase.id} className="border-bottom py-1">{purchase.storeItemId} - {purchase.price.amount} {currenciesById.get(purchase.price.currencyId)?.symbol ?? purchase.price.currencyId}</div>)}</div>}
	</div>;
}

export default StoreTabComponent;