export function createActivityPackage({id, version, name, description, author = "TLOM", currencies = [], campaigns = [], missions = [], goals = [], stores = [], storeItems = []}) {
	return {id, version, name, description, author, currencies, campaigns, missions, goals, stores, storeItems};
}

export function createPackageInstallation({id, packageId, packageVersion, installedAt}) {
	return {id, packageId, packageVersion, installedAt};
}