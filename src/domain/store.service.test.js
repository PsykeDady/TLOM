import { createLedgerEntry, LedgerSourceType } from "../models/ledger-entry.model";
import { createStore, createStoreItem } from "../models/store.model";
import { getWalletBalance } from "./economy.service";
import { getStoreItems, isValidStoreItemPrice, purchaseStoreItem } from "./store.service";

describe("store purchases", () => {
	const store = createStore({id: "healthy-store", name: "Healthy Store", itemIds: ["pizza"]});
	const pizza = createStoreItem({id: "pizza", name: "Pizza", description: "A personal reward.", price: {currencyId: "healthy-coin", amount: 3}});
	const createdAt = "2026-09-15T18:00:00.000Z";
	const earnedCoins = [createLedgerEntry({id: "earn", currencyId: "healthy-coin", amount: 3})];

	it("creates a store with more than one item reference and keeps price currency explicit", () => {
		const expandedStore = createStore({id: "healthy-store", name: "Healthy Store", itemIds: ["pizza", "tea"]});
		expect(getStoreItems(expandedStore, [pizza, {id: "tea"}]).map(item => item.id)).toEqual(["pizza", "tea"]);
		expect(pizza.price).toEqual({currencyId: "healthy-coin", amount: 3});
	});

	it("rejects invalid prices", () => {
		expect(isValidStoreItemPrice({currencyId: "healthy-coin", amount: 0})).toBe(false);
		expect(isValidStoreItemPrice({currencyId: "healthy-coin", amount: 1.5})).toBe(false);
		expect(isValidStoreItemPrice({amount: 3})).toBe(false);
	});

	it("purchases with exact funds and records a separate purchase and ledger debit", () => {
		const result = purchaseStoreItem({stores: [store], storeItems: [pizza], purchases: [], ledgerEntries: earnedCoins, storeId: store.id, storeItemId: pizza.id, requestId: "request-1", createdAt});
		expect(result.purchase.price).toEqual({currencyId: "healthy-coin", amount: 3});
		expect(result.createdEntry).toMatchObject({amount: -3, sourceType: LedgerSourceType.STORE_PURCHASE, sourceId: "request-1"});
		expect(getWalletBalance(result.ledgerEntries, "healthy-coin")).toBe(0);
	});

	it("does not mutate economic state for insufficient or wrong-currency funds", () => {
		const insufficient = purchaseStoreItem({stores: [store], storeItems: [pizza], purchases: [], ledgerEntries: [createLedgerEntry({currencyId: "healthy-coin", amount: 2})], storeId: store.id, storeItemId: pizza.id, requestId: "request-1", createdAt});
		const wrongCurrency = purchaseStoreItem({stores: [store], storeItems: [pizza], purchases: [], ledgerEntries: [createLedgerEntry({currencyId: "study-token", amount: 10})], storeId: store.id, storeItemId: pizza.id, requestId: "request-2", createdAt});
		expect(insufficient.error).toBe("INSUFFICIENT_FUNDS");
		expect(wrongCurrency.error).toBe("INSUFFICIENT_FUNDS");
		expect(insufficient.purchases).toEqual([]);
		expect(wrongCurrency.ledgerEntries).toHaveLength(1);
	});

	it("is idempotent per request but permits a new request for the same item", () => {
		const first = purchaseStoreItem({stores: [store], storeItems: [pizza], purchases: [], ledgerEntries: [createLedgerEntry({currencyId: "earn", currencyId: "healthy-coin", amount: 6})], storeId: store.id, storeItemId: pizza.id, requestId: "request-1", createdAt});
		const retry = purchaseStoreItem({stores: [store], storeItems: [pizza], purchases: first.purchases, ledgerEntries: first.ledgerEntries, storeId: store.id, storeItemId: pizza.id, requestId: "request-1", createdAt});
		const second = purchaseStoreItem({stores: [store], storeItems: [pizza], purchases: retry.purchases, ledgerEntries: retry.ledgerEntries, storeId: store.id, storeItemId: pizza.id, requestId: "request-2", createdAt});
		expect(retry.purchases).toHaveLength(1);
		expect(retry.createdEntry).toBeNull();
		expect(second.purchases).toHaveLength(2);
		expect(getWalletBalance(second.ledgerEntries, "healthy-coin")).toBe(0);
	});

	it("keeps a purchase price snapshot after an item price changes", () => {
		const result = purchaseStoreItem({stores: [store], storeItems: [pizza], purchases: [], ledgerEntries: earnedCoins, storeId: store.id, storeItemId: pizza.id, requestId: "request-1", createdAt});
		const changedPizza = {...pizza, price: {currencyId: "healthy-coin", amount: 5}};
		expect(result.purchase.price.amount).toBe(3);
		expect(changedPizza.price.amount).toBe(5);
	});
});