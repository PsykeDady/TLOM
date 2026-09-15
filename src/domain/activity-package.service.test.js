import { activityPackageCatalog } from "../packages/activity-package-catalog";
import { installActivityPackage, resolveActivityPackage, validateActivityPackage, validatePackageConfiguration } from "./activity-package.service";
import { createPackageInstallationConfiguration } from "../models/activity-package.model";

describe("activity packages", () => {
	const healthy = activityPackageCatalog[0];
	const study = activityPackageCatalog[1];
	const installedAt = "2026-09-15T18:00:00.000Z";

	it("validates a complete package", () => expect(validateActivityPackage(healthy)).toEqual({valid: true, errors: []}));
	it("rejects duplicate package-local IDs", () => expect(validateActivityPackage({...healthy, goals: [healthy.goals[0], {...healthy.goals[0]}]}).valid).toBe(false));
	it("rejects duplicate reward identities across package goals", () => expect(validateActivityPackage({...healthy, goals: [healthy.goals[0], {...healthy.goals[1], rewards: [{...healthy.goals[0].rewards[0], type: "EXPERIENCE"}]}]}).valid).toBe(false));
	it("rejects invalid parameter definitions and bindings", () => {
		expect(validateActivityPackage({...healthy, parameters: [healthy.parameters[0], {...healthy.parameters[0]}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, parameters: [{...healthy.parameters[0], type: "STRING"}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, parameters: [{...healthy.parameters[0], defaultValue: 1.5}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, parameters: [{...healthy.parameters[0], defaultValue: 0}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, bindings: [{...healthy.bindings[0], parameterId: "missing"}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, bindings: [{...healthy.bindings[0], targetType: "OBJECT_PATH"}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, bindings: [{...healthy.bindings[0], targetId: "missing"}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, bindings: [{...healthy.bindings[0], rewardId: "missing"}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, bindings: [healthy.bindings[0], {...healthy.bindings[0]}]}).valid).toBe(false);
	});
	it("rejects missing currency references in rewards and prices", () => {
		expect(validateActivityPackage({...healthy, goals: [{...healthy.goals[0], rewards: [{...healthy.goals[0].rewards[0], currencyId: "missing"}]}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, storeItems: [{...healthy.storeItems[0], price: {currencyId: "missing", amount: 1}}]}).valid).toBe(false);
	});
	it("rejects missing mission, goal and store item references", () => {
		expect(validateActivityPackage({...healthy, campaigns: [{...healthy.campaigns[0], missionIds: ["missing"]}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, missions: [{...healthy.missions[0], goalIds: ["missing"]}]}).valid).toBe(false);
		expect(validateActivityPackage({...healthy, stores: [{...healthy.stores[0], itemIds: ["missing"]}]}).valid).toBe(false);
	});
	it("rejects invalid packages before installation", () => expect(installActivityPackage({packageDefinition: {...healthy, version: ""}, installations: [], installedAt})).toMatchObject({installation: null}));
	it("installs definitions with deterministic namespaced runtime IDs", () => {
		const result = installActivityPackage({packageDefinition: healthy, installations: [], installedAt});
		expect(result.goals[0].id).toBe("healthy-lifestyle::goal::daily-walk");
		expect(result.goals[0].rewards[0].currencyId).toBe("healthy-lifestyle::currency::healthy-coin");
		expect(result.storeItems[0].price.currencyId).toBe("healthy-lifestyle::currency::healthy-coin");
		expect(result.currencies[0]).toMatchObject({name: "Healthy Coin", symbol: "HC"});
	});
	it("keeps different packages separate and makes equal-version installs idempotent", () => {
		const first = installActivityPackage({packageDefinition: healthy, installations: [], installedAt});
		const retry = installActivityPackage({packageDefinition: healthy, installations: [first.installation], installedAt});
		const second = installActivityPackage({packageDefinition: study, installations: [first.installation], installedAt});
		expect(retry.alreadyInstalled).toBe(true);
		expect(second.currencies[0].id).not.toBe(first.currencies[0].id);
	});
	it("does not mutate package definitions when runtime data changes", () => {
		const before = JSON.stringify(healthy);
		const installed = installActivityPackage({packageDefinition: healthy, installations: [], installedAt});
		installed.goals[0].name = "Played goal";
		installed.storeItems[0].price.amount = 9;
		expect(JSON.stringify(healthy)).toBe(before);
	});
	it("validates configuration values, defaults and unknown parameters", () => {
		const valid = validatePackageConfiguration(healthy, createPackageInstallationConfiguration({packageId: healthy.id, packageVersion: healthy.version, values: {"walk-reward": 3}}));
		expect(valid).toEqual({valid: true, errors: [], values: {"walk-reward": 3}});
		expect(validatePackageConfiguration(healthy).values).toEqual({"walk-reward": 1});
		expect(validatePackageConfiguration(healthy, {packageId: "other", packageVersion: healthy.version, values: {}}).valid).toBe(false);
		expect(validatePackageConfiguration(healthy, {packageId: healthy.id, packageVersion: "2", values: {}}).valid).toBe(false);
		const requiredPackage = {...healthy, parameters: [{...healthy.parameters[0], defaultValue: undefined, required: true}]};
		expect(validatePackageConfiguration(requiredPackage, {packageId: healthy.id, packageVersion: healthy.version, values: {}}).valid).toBe(false);
		expect(validatePackageConfiguration(healthy, {packageId: healthy.id, packageVersion: healthy.version, values: {unknown: 2}}).valid).toBe(false);
		expect(validatePackageConfiguration(healthy, {packageId: healthy.id, packageVersion: healthy.version, values: {"walk-reward": "3"}}).valid).toBe(false);
		expect(validatePackageConfiguration(healthy, {packageId: healthy.id, packageVersion: healthy.version, values: {"walk-reward": 0}}).valid).toBe(false);
		expect(validatePackageConfiguration(healthy, {packageId: healthy.id, packageVersion: healthy.version, values: {"walk-reward": 11}}).valid).toBe(false);
	});
	it("resolves reward amounts without changing structural identity or inputs", () => {
		const configuration = {packageId: healthy.id, packageVersion: healthy.version, values: {"walk-reward": 3}};
		const beforePackage = JSON.stringify(healthy);
		const beforeConfiguration = JSON.stringify(configuration);
		const resolved = resolveActivityPackage(healthy, configuration);
		expect(resolved.packageDefinition.goals[0].rewards[0]).toMatchObject({id: "walk-hc", type: "CURRENCY", currencyId: "healthy-coin", amount: 3});
		expect(resolved.packageDefinition.id).toBe(healthy.id);
		expect(resolved.packageDefinition.goals[0].id).toBe(healthy.goals[0].id);
		expect(resolved.packageDefinition.currencies[0].id).toBe(healthy.currencies[0].id);
		expect(validateActivityPackage(resolved.packageDefinition).valid).toBe(true);
		expect(JSON.stringify(healthy)).toBe(beforePackage);
		expect(JSON.stringify(configuration)).toBe(beforeConfiguration);
	});
	it("installs resolved configuration snapshots and never silently reconfigures", () => {
		const input = {packageId: healthy.id, packageVersion: healthy.version, values: {"walk-reward": 3}};
		const resolved = resolveActivityPackage(healthy, input);
		const installed = installActivityPackage({packageDefinition: resolved.packageDefinition, installations: [], installedAt, configuration: resolved.configuration});
		input.values["walk-reward"] = 8;
		const retryResolved = resolveActivityPackage(healthy, {packageId: healthy.id, packageVersion: healthy.version, values: {"walk-reward": 5}});
		const retry = installActivityPackage({packageDefinition: retryResolved.packageDefinition, installations: [installed.installation], installedAt, configuration: retryResolved.configuration});
		expect(installed.installation.configuration).toEqual({"walk-reward": 3});
		expect(installed.goals[0].rewards[0].amount).toBe(3);
		expect(retry).toMatchObject({installation: installed.installation, alreadyInstalled: true});
		expect(retry.installation.configuration).toEqual({"walk-reward": 3});
	});
	it("installs non-configurable packages without a configuration", () => expect(installActivityPackage({packageDefinition: study, installations: [], installedAt}).installation).toBeTruthy());
});