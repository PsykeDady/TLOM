export function createStore({id, name, itemIds = []}) {
	return {id, name, itemIds};
}

export function createStoreItem({id, name, description = "", price}) {
	return {id, name, description, price};
}