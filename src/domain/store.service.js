import { getWalletBalance } from "./economy.service";
import { LedgerSourceType, createLedgerEntry } from "../models/ledger-entry.model";
import { createPurchase } from "../models/purchase.model";

export function isValidStoreItemPrice(price) {
	return Boolean(price) && typeof price.currencyId === "string" && price.currencyId.length > 0 && Number.isInteger(price.amount) && price.amount > 0;
}

export function getStoreItems(store, storeItems) {
	const itemIds = new Set(store.itemIds);
	return storeItems.filter(item => itemIds.has(item.id));
}

export function purchaseStoreItem({stores, storeItems, purchases, ledgerEntries, storeId, storeItemId, requestId, createdAt}) {
	const existingPurchase = purchases.find(purchase => purchase.requestId === requestId);
	if (existingPurchase) {
		return {purchases, ledgerEntries, purchase: existingPurchase, createdEntry: null, error: null};
	}

	const store = stores.find(item => item.id === storeId);
	const storeItem = storeItems.find(item => item.id === storeItemId);
	if (!store || !storeItem || !store.itemIds.includes(storeItem.id) || !isValidStoreItemPrice(storeItem.price)) {
		return {purchases, ledgerEntries, purchase: null, createdEntry: null, error: "INVALID_ITEM"};
	}

	const balance = getWalletBalance(ledgerEntries, storeItem.price.currencyId);
	if (balance < storeItem.price.amount) {
		return {purchases, ledgerEntries, purchase: null, createdEntry: null, error: "INSUFFICIENT_FUNDS"};
	}

	const purchase = createPurchase({
		id: requestId,
		requestId,
		storeId,
		storeItemId,
		price: storeItem.price,
		createdAt
	});
	const createdEntry = createLedgerEntry({
		currencyId: storeItem.price.currencyId,
		amount: -storeItem.price.amount,
		sourceType: LedgerSourceType.STORE_PURCHASE,
		sourceId: purchase.id,
		sourceKey: `STORE_PURCHASE:${purchase.id}`,
		reason: `Purchased ${storeItem.name}`,
		createdAt
	});

	return {purchases: purchases.concat(purchase), ledgerEntries: ledgerEntries.concat(createdEntry), purchase, createdEntry, error: null};
}