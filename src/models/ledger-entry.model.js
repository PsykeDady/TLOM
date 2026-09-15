let nextLedgerEntryId = 0;

export const LedgerSourceType = {
	GOAL_OCCURRENCE: "GOAL_OCCURRENCE",
	STORE_PURCHASE: "STORE_PURCHASE"
};

export function createLedgerEntry({id, currencyId, amount, sourceType, sourceId, sourceKey, reason, createdAt}) {
	return {
		id: id ?? `ledger-entry-${nextLedgerEntryId++}`,
		currencyId,
		amount,
		sourceType,
		sourceId,
		sourceKey,
		reason,
		createdAt
	};
}