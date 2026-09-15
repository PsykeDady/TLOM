export function createPurchase({id, requestId, storeId, storeItemId, price, createdAt}) {
	return {id, requestId, storeId, storeItemId, price: {...price}, createdAt};
}