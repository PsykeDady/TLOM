import GoalConstants from "../constants/goal.const";
import { MissionProgressStrategy, createMission } from "../models/mission.model";
import { createCampaign } from "../models/campaign.model";
import { createCurrency } from "../models/currency.model";
import { createStore, createStoreItem } from "../models/store.model";
import { RewardType } from "../models/reward.model";
import { createPackageInstallation } from "../models/activity-package.model";
import { isValidStoreItemPrice } from "./store.service";

function hasUniqueIds(items) {
	const ids = items.map(item => item.id);
	return ids.every(id => typeof id === "string" && id.length > 0) && new Set(ids).size === ids.length;
}

function addReferenceErrors(errors, items, references, label) {
	const ids = new Set(items.map(item => item.id));
	references.forEach(reference => {
		if (!ids.has(reference.id)) errors.push(`${label}:${reference.id}`);
	});
}

export function validateActivityPackage(packageDefinition) {
	const errors = [];
	if (!packageDefinition || typeof packageDefinition.id !== "string" || packageDefinition.id.length === 0) errors.push("package:id");
	if (!packageDefinition || typeof packageDefinition.version !== "string" || packageDefinition.version.length === 0) errors.push("package:version");
	const collections = ["currencies", "campaigns", "missions", "goals", "stores", "storeItems"];
	collections.forEach(name => {
		if (!Array.isArray(packageDefinition?.[name]) || !hasUniqueIds(packageDefinition[name] || [])) errors.push(`${name}:ids`);
	});
	if (errors.length > 0) return {valid: false, errors};

	const currencies = packageDefinition.currencies;
	const missions = packageDefinition.missions;
	const goals = packageDefinition.goals;
	const storeItems = packageDefinition.storeItems;
	const rewards = goals.flatMap(goal => Array.isArray(goal.rewards) ? goal.rewards : []);
	if (!hasUniqueIds(rewards)) errors.push("rewards:ids");
	packageDefinition.campaigns.forEach(campaign => addReferenceErrors(errors, missions, (campaign.missionIds || []).map(id => ({id})), "campaign:mission"));
	missions.forEach(mission => {
		if (!Object.values(MissionProgressStrategy).includes(mission.progressStrategy)) errors.push(`mission:strategy:${mission.id}`);
		addReferenceErrors(errors, goals, (mission.goalIds || []).map(id => ({id})), "mission:goal");
	});
	goals.forEach(goal => {
		if (![GoalConstants.ROUTINES, GoalConstants.ONESHOTS].includes(goal.goalType)) errors.push(`goal:type:${goal.id}`);
		(goal.rewards || []).forEach(reward => {
			if (!Object.values(RewardType).includes(reward.type)) errors.push(`reward:type:${reward.id}`);
			if (reward.type === RewardType.CURRENCY) addReferenceErrors(errors, currencies, [{id: reward.currencyId}], "reward:currency");
		});
	});
	packageDefinition.stores.forEach(store => addReferenceErrors(errors, storeItems, (store.itemIds || []).map(id => ({id})), "store:item"));
	storeItems.forEach(item => {
		if (!isValidStoreItemPrice(item.price)) errors.push(`store-item:price:${item.id}`);
		else addReferenceErrors(errors, currencies, [{id: item.price.currencyId}], "store-item:currency");
	});
	return {valid: errors.length === 0, errors};
}

function runtimeId(packageDefinition, type, localId) {
	return `${packageDefinition.id}::${type}::${localId}`;
}

function materializeGoal(packageDefinition, goal) {
	return {
		...goal,
		id: runtimeId(packageDefinition, "goal", goal.id),
		rewards: goal.rewards.map(reward => ({
			...reward,
			id: runtimeId(packageDefinition, "reward", reward.id),
			...(reward.type === RewardType.CURRENCY ? {currencyId: runtimeId(packageDefinition, "currency", reward.currencyId)} : {})
		}))
	};
}

export function installActivityPackage({packageDefinition, installations, installedAt}) {
	const validation = validateActivityPackage(packageDefinition);
	if (!validation.valid) return {installation: null, errors: validation.errors};
	const existing = installations.find(item => item.packageId === packageDefinition.id && item.packageVersion === packageDefinition.version);
	if (existing) return {installation: existing, errors: [], alreadyInstalled: true};

	const installation = createPackageInstallation({id: runtimeId(packageDefinition, "installation", packageDefinition.version), packageId: packageDefinition.id, packageVersion: packageDefinition.version, installedAt});
	return {
		installation,
		errors: [],
		alreadyInstalled: false,
		currencies: packageDefinition.currencies.map(currency => createCurrency({...currency, id: runtimeId(packageDefinition, "currency", currency.id)})),
		goals: packageDefinition.goals.map(goal => materializeGoal(packageDefinition, goal)),
		missions: packageDefinition.missions.map(mission => createMission({...mission, id: runtimeId(packageDefinition, "mission", mission.id), goalIds: mission.goalIds.map(id => runtimeId(packageDefinition, "goal", id))})),
		campaigns: packageDefinition.campaigns.map(campaign => createCampaign({...campaign, id: runtimeId(packageDefinition, "campaign", campaign.id), missionIds: campaign.missionIds.map(id => runtimeId(packageDefinition, "mission", id))})),
		stores: packageDefinition.stores.map(store => createStore({...store, id: runtimeId(packageDefinition, "store", store.id), itemIds: store.itemIds.map(id => runtimeId(packageDefinition, "store-item", id))})),
		storeItems: packageDefinition.storeItems.map(item => createStoreItem({...item, id: runtimeId(packageDefinition, "store-item", item.id), price: {...item.price, currencyId: runtimeId(packageDefinition, "currency", item.price.currencyId)}}))
	};
}