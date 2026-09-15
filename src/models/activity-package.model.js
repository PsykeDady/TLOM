export const PackageParameterType = {
	INTEGER: "INTEGER"
};

export const PackageBindingTargetType = {
	GOAL_REWARD_AMOUNT: "GOAL_REWARD_AMOUNT"
};

export function createActivityPackage({id, version, name, description, author = "TLOM", currencies = [], campaigns = [], missions = [], goals = [], stores = [], storeItems = [], parameters = [], bindings = []}) {
	return {id, version, name, description, author, currencies, campaigns, missions, goals, stores, storeItems, parameters, bindings};
}

export function createPackageInstallationConfiguration({packageId, packageVersion, values = {}}) {
	return {packageId, packageVersion, values: {...values}};
}

export function createPackageInstallation({id, packageId, packageVersion, installedAt, configuration = {}}) {
	return {id, packageId, packageVersion, installedAt, configuration: {...configuration}};
}