import { GoalOccurrenceStatus } from "../models/goal-occurrence.model";
import { createCurrency } from "../models/currency.model";
import { createLedgerEntry } from "../models/ledger-entry.model";
import { createCurrencyReward, createExperienceReward } from "../models/reward.model";
import {
	accountGoalOccurrenceRewards,
	completeGoalOccurrenceAndAccountRewards,
	getWalletBalance,
	getWalletBalances
} from "./economy.service";

describe("economy", () => {
	const healthyCoin = createCurrency({id: "healthy-coin", name: "Healthy Coin", symbol: "HC"});
	const studyToken = createCurrency({id: "study-token", name: "Study Token", symbol: "ST"});
	const createdAt = "2026-09-15T18:00:00.000Z";
	const goals = [{
		id: "daily-walk",
		name: "Daily walk",
		rewards: [createExperienceReward({id: "walk-xp", amount: 10}), createCurrencyReward({id: "walk-coin", currencyId: "healthy-coin", amount: 1})]
	}];

	it("defines independent currencies", () => {
		expect(healthyCoin).toEqual({id: "healthy-coin", name: "Healthy Coin", symbol: "HC"});
		expect(studyToken.id).not.toBe(healthyCoin.id);
	});

	it("completes an occurrence and creates a currency ledger snapshot", () => {
		const result = completeGoalOccurrenceAndAccountRewards({
			goals,
			occurrences: [{id: "walk-15", goalId: "daily-walk", status: GoalOccurrenceStatus.PENDING}],
			ledgerEntries: [],
			occurrenceId: "walk-15",
			createdAt
		});

		expect(result.occurrences[0].status).toBe(GoalOccurrenceStatus.COMPLETED);
		expect(result.createdEntries).toMatchObject([{currencyId: "healthy-coin", amount: 1, sourceId: "walk-15", createdAt}]);
	});

	it("derives balances from ledger entries across independent currencies", () => {
		const entries = [
			createLedgerEntry({id: "one", currencyId: "healthy-coin", amount: 1}),
			createLedgerEntry({id: "two", currencyId: "healthy-coin", amount: 2}),
			createLedgerEntry({id: "three", currencyId: "study-token", amount: 4})
		];

		expect(getWalletBalance(entries, "healthy-coin")).toBe(3);
		expect(getWalletBalances(entries, [healthyCoin, studyToken]).map(item => item.balance)).toEqual([3, 4]);
	});

	it("does not duplicate accounting for the same occurrence source", () => {
		const completion = {occurrenceId: "walk-15", goalName: "Daily walk", rewards: [createCurrencyReward({id: "walk-coin", currencyId: "healthy-coin", amount: 1})]};
		const first = accountGoalOccurrenceRewards([], completion, createdAt);
		const retry = accountGoalOccurrenceRewards(first.ledgerEntries, completion, createdAt);

		expect(retry.createdEntries).toEqual([]);
		expect(getWalletBalance(retry.ledgerEntries, "healthy-coin")).toBe(1);
	});

	it("keeps completion and accounting idempotent across a retry", () => {
		const initialState = {
			goals,
			occurrences: [{id: "walk-15", goalId: "daily-walk", status: GoalOccurrenceStatus.PENDING}],
			ledgerEntries: [],
			occurrenceId: "walk-15",
			createdAt
		};
		const first = completeGoalOccurrenceAndAccountRewards(initialState);
		const retry = completeGoalOccurrenceAndAccountRewards({...initialState, occurrences: first.occurrences, ledgerEntries: first.ledgerEntries});

		expect(retry.completion).toBeNull();
		expect(retry.createdEntries).toEqual([]);
		expect(getWalletBalance(retry.ledgerEntries, "healthy-coin")).toBe(1);
	});

	it("accounts distinct occurrences and multiple currency rewards independently", () => {
		const first = accountGoalOccurrenceRewards([], {
			occurrenceId: "walk-15", goalName: "Daily walk", rewards: [createCurrencyReward({id: "walk-coin", currencyId: "healthy-coin", amount: 1}), createCurrencyReward({id: "walk-study", currencyId: "study-token", amount: 2})]
		}, createdAt);
		const second = accountGoalOccurrenceRewards(first.ledgerEntries, {
			occurrenceId: "walk-16", goalName: "Daily walk", rewards: [createCurrencyReward({id: "walk-coin", currencyId: "healthy-coin", amount: 1})]
		}, createdAt);

		expect(getWalletBalance(second.ledgerEntries, "healthy-coin")).toBe(2);
		expect(getWalletBalance(second.ledgerEntries, "study-token")).toBe(2);
	});

	it("keeps historical ledger amounts when a goal reward definition changes", () => {
		const first = accountGoalOccurrenceRewards([], {
			occurrenceId: "walk-15", goalName: "Daily walk", rewards: [createCurrencyReward({id: "walk-coin", currencyId: "healthy-coin", amount: 1})]
		}, createdAt);
		const changedDefinition = {occurrenceId: "walk-16", goalName: "Daily walk", rewards: [createCurrencyReward({id: "walk-coin", currencyId: "healthy-coin", amount: 2})]};
		const second = accountGoalOccurrenceRewards(first.ledgerEntries, changedDefinition, createdAt);

		expect(second.ledgerEntries.map(entry => entry.amount)).toEqual([1, 2]);
	});

	it("ignores zero and invalid currency rewards without creating economic value", () => {
		const result = accountGoalOccurrenceRewards([], {
			occurrenceId: "walk-15", goalName: "Daily walk", rewards: [createExperienceReward({id: "no-xp", amount: 0}), createCurrencyReward({id: "zero-coin", currencyId: "healthy-coin", amount: 0}), createCurrencyReward({id: "fractional-coin", currencyId: "healthy-coin", amount: 1.5})]
		}, createdAt);

		expect(result.createdEntries).toEqual([]);
	});

	it("keeps reward accounting stable when configured rewards are reordered", () => {
		const rewards = [
			createExperienceReward({id: "walk-xp", amount: 10}),
			createCurrencyReward({id: "walk-coin", currencyId: "healthy-coin", amount: 1}),
			createCurrencyReward({id: "walk-study", currencyId: "study-token", amount: 2})
		];
		const first = accountGoalOccurrenceRewards([], {occurrenceId: "walk-15", goalName: "Daily walk", rewards}, createdAt);
		const retry = accountGoalOccurrenceRewards(first.ledgerEntries, {occurrenceId: "walk-15", goalName: "Daily walk", rewards: [...rewards].reverse()}, createdAt);

		expect(first.createdEntries).toHaveLength(2);
		expect(retry.createdEntries).toEqual([]);
		expect(retry.ledgerEntries.map(entry => entry.sourceKey)).toEqual([
			"GOAL_OCCURRENCE:walk-15:walk-coin",
			"GOAL_OCCURRENCE:walk-15:walk-study"
		]);
	});

	it("includes negative entries in the wallet projection", () => {
		const entries = [
			createLedgerEntry({id: "earn", currencyId: "healthy-coin", amount: 5}),
			createLedgerEntry({id: "future-purchase", currencyId: "healthy-coin", amount: -2})
		];

		expect(getWalletBalance(entries, "healthy-coin")).toBe(3);
	});
});