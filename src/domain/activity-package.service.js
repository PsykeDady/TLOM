import GoalConstants from "../constants/goal.const";
import { MissionProgressStrategy, createMission } from "../models/mission.model";
import { createCampaign } from "../models/campaign.model";
import { createCurrency } from "../models/currency.model";
import { createStore, createStoreItem } from "../models/store.model";
import { RewardType } from "../models/reward.model";
import { PackageBindingTargetType, PackageParameterType, createPackageInstallation, createPackageInstallationConfiguration } from "../models/activity-package.model";
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

function isValidIntegerValue(parameter, value) {
	return Number.isInteger(value) &&
		(typeof parameter.min !== "number" || value >= parameter.min) &&
		(typeof parameter.max !== "number" || value <= parameter.max) &&
		(typeof parameter.step !== "number" || (value - (parameter.min || 0)) % parameter.step === 0);
}

function validateIntegerParameter(parameter, errors) {
	if (parameter.min !== undefined && !Number.isInteger(parameter.min)) errors.push(`parameter:min:${parameter.id}`);
	if (parameter.max !== undefined && !Number.isInteger(parameter.max)) errors.push(`parameter:max:${parameter.id}`);
	if (Number.isInteger(parameter.min) && Number.isInteger(parameter.max) && parameter.min > parameter.max) errors.push(`parameter:range:${parameter.id}`);
	if (parameter.step !== undefined && (!Number.isInteger(parameter.step) || parameter.step <= 0)) errors.push(`parameter:step:${parameter.id}`);
	if (parameter.defaultValue !== undefined && !isValidIntegerValue(parameter, parameter.defaultValue)) errors.push(`parameter:default:${parameter.id}`);
}

function validateParameterDefinitions(packageDefinition, errors) {
	const parameters = packageDefinition.parameters;
	if (!Array.isArray(parameters) || !hasUniqueIds(parameters)) {
		errors.push("parameters:ids");
		return;
	}
	parameters.forEach(parameter => {
		if (!Object.values(PackageParameterType).includes(parameter.type)) errors.push(`parameter:type:${parameter.id}`);
		if (typeof parameter.label !== "string" || parameter.label.length === 0) errors.push(`parameter:label:${parameter.id}`);
		if (parameter.type === PackageParameterType.INTEGER) validateIntegerParameter(parameter, errors);
	});
}

function validateBindings(packageDefinition, errors) {
	if (!Array.isArray(packageDefinition.bindings)) {
		errors.push("bindings:array");
		return;
	}
	const parametersById = new Map(packageDefinition.parameters.map(parameter => [parameter.id, parameter]));
	const goalsById = new Map(packageDefinition.goals.map(goal => [goal.id, goal]));
	const targets = new Set();
	packageDefinition.bindings.forEach(binding => {
		const parameter = parametersById.get(binding.parameterId);
		if (!parameter) errors.push(`binding:parameter:${binding.parameterId}`);
		if (binding.targetType !== PackageBindingTargetType.GOAL_REWARD_AMOUNT) {
			errors.push(`binding:type:${binding.targetType}`);
			return;
		}
		if (parameter?.type !== PackageParameterType.INTEGER) errors.push(`binding:parameter-type:${binding.parameterId}`);
		const goal = goalsById.get(binding.targetId);
		if (!goal) errors.push(`binding:goal:${binding.targetId}`);
		if (!goal?.rewards?.some(reward => reward.id === binding.rewardId)) errors.push(`binding:reward:${binding.rewardId}`);
		const targetKey = `${binding.targetType}:${binding.targetId}:${binding.rewardId}`;
		if (targets.has(targetKey)) errors.push(`binding:conflict:${targetKey}`);
		targets.add(targetKey);
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
	validateParameterDefinitions(packageDefinition, errors);
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
	validateBindings(packageDefinition, errors);
	return {valid: errors.length === 0, errors};
}

export function validatePackageConfiguration(packageDefinition, configuration) {
	const definitionValidation = validateActivityPackage(packageDefinition);
	if (!definitionValidation.valid) return {...definitionValidation, values: {}};
	const candidate = configuration || createPackageInstallationConfiguration({packageId: packageDefinition.id, packageVersion: packageDefinition.version});
	const errors = [];
	if (candidate.packageId !== packageDefinition.id) errors.push("configuration:package-id");
	if (candidate.packageVersion !== packageDefinition.version) errors.push("configuration:package-version");
	if (!candidate.values || typeof candidate.values !== "object" || Array.isArray(candidate.values)) errors.push("configuration:values");
	const values = {};
	const parametersById = new Map(packageDefinition.parameters.map(parameter => [parameter.id, parameter]));
	Object.keys(candidate.values || {}).forEach(id => {
		if (!parametersById.has(id)) errors.push(`configuration:unknown:${id}`);
	});
	packageDefinition.parameters.forEach(parameter => {
		const value = candidate.values?.[parameter.id] === undefined ? parameter.defaultValue : candidate.values[parameter.id];
		if (value === undefined && parameter.required) errors.push(`configuration:required:${parameter.id}`);
		else if (value !== undefined && parameter.type === PackageParameterType.INTEGER && !isValidIntegerValue(parameter, value)) errors.push(`configuration:integer:${parameter.id}`);
		else if (value !== undefined) values[parameter.id] = value;
	});
	return {valid: errors.length === 0, errors, values};
}

function cloneActivityPackage(packageDefinition) {
	return {
		...packageDefinition,
		currencies: packageDefinition.currencies.map(currency => ({...currency})),
		campaigns: packageDefinition.campaigns.map(campaign => ({...campaign, missionIds: [...campaign.missionIds]})),
		missions: packageDefinition.missions.map(mission => ({...mission, goalIds: [...mission.goalIds], progress: mission.progress && {...mission.progress}})),
		goals: packageDefinition.goals.map(goal => ({...goal, schedule: goal.schedule && {...goal.schedule}, rewards: goal.rewards.map(reward => ({...reward}))})),
		stores: packageDefinition.stores.map(store => ({...store, itemIds: [...store.itemIds]})),
		storeItems: packageDefinition.storeItems.map(item => ({...item, price: {...item.price}})),
		parameters: packageDefinition.parameters.map(parameter => ({...parameter})),
		bindings: packageDefinition.bindings.map(binding => ({...binding}))
	};
}

export function resolveActivityPackage(packageDefinition, configuration) {
	const validation = validatePackageConfiguration(packageDefinition, configuration);
	if (!validation.valid) return {packageDefinition: null, configuration: null, errors: validation.errors};
	const resolvedPackage = cloneActivityPackage(packageDefinition);
	resolvedPackage.bindings.forEach(binding => {
		if (binding.targetType !== PackageBindingTargetType.GOAL_REWARD_AMOUNT) return;
		const goal = resolvedPackage.goals.find(item => item.id === binding.targetId);
		const reward = goal.rewards.find(item => item.id === binding.rewardId);
		reward.amount = validation.values[binding.parameterId];
	});
	const resolvedValidation = validateActivityPackage(resolvedPackage);
	return resolvedValidation.valid
		? {packageDefinition: resolvedPackage, configuration: {...validation.values}, errors: []}
		: {packageDefinition: null, configuration: null, errors: resolvedValidation.errors};
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

export function installActivityPackage({packageDefinition, installations, installedAt, configuration = {}}) {
	const validation = validateActivityPackage(packageDefinition);
	if (!validation.valid) return {installation: null, errors: validation.errors};
	const existing = installations.find(item => item.packageId === packageDefinition.id && item.packageVersion === packageDefinition.version);
	if (existing) return {installation: existing, errors: [], alreadyInstalled: true};

	const installation = createPackageInstallation({id: runtimeId(packageDefinition, "installation", packageDefinition.version), packageId: packageDefinition.id, packageVersion: packageDefinition.version, installedAt, configuration});
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