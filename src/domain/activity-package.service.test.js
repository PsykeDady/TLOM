import { activityPackageCatalog } from "../packages/activity-package-catalog";
import { installActivityPackage, validateActivityPackage } from "./activity-package.service";

describe("activity packages", () => {
	const healthy = activityPackageCatalog[0];
	const study = activityPackageCatalog[1];
	const installedAt = "2026-09-15T18:00:00.000Z";

	it("validates a complete package", () => expect(validateActivityPackage(healthy)).toEqual({valid: true, errors: []}));
	it("rejects duplicate package-local IDs", () => expect(validateActivityPackage({...healthy, goals: [healthy.goals[0], {...healthy.goals[0]}]}).valid).toBe(false));
	it("rejects duplicate reward identities across package goals", () => expect(validateActivityPackage({...healthy, goals: [healthy.goals[0], {...healthy.goals[1], rewards: [{...healthy.goals[0].rewards[0], type: "EXPERIENCE"}]}]}).valid).toBe(false));
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
});