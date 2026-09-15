import { completeGoalOccurrence } from "./goal.service";
import { LedgerSourceType, createLedgerEntry } from "../models/ledger-entry.model";
import { RewardType } from "../models/reward.model";

function isValidCurrencyAmount(amount) {
	return Number.isInteger(amount) && amount !== 0;
}

function getCurrencyRewards(rewards) {
	return (Array.isArray(rewards) ? rewards : []).filter(reward =>
		reward.type === RewardType.CURRENCY &&
		typeof reward.currencyId === "string" &&
		isValidCurrencyAmount(reward.amount)
	);
}

export function accountGoalOccurrenceRewards(ledgerEntries, completion, createdAt) {
	if (!completion) {
		return {ledgerEntries, createdEntries: []};
	}

	const existingSourceKeys = new Set(ledgerEntries.map(entry => entry.sourceKey));
	const createdEntries = getCurrencyRewards(completion.rewards)
		.map((reward, rewardIndex) => ({reward, rewardIndex}))
		.filter(({rewardIndex}) => !existingSourceKeys.has(`GOAL_OCCURRENCE:${completion.occurrenceId}:${rewardIndex}`))
		.map(({reward, rewardIndex}) => createLedgerEntry({
			currencyId: reward.currencyId,
			amount: reward.amount,
			sourceType: LedgerSourceType.GOAL_OCCURRENCE,
			sourceId: completion.occurrenceId,
			sourceKey: `GOAL_OCCURRENCE:${completion.occurrenceId}:${rewardIndex}`,
			reason: `Completed ${completion.goalName}`,
			createdAt
		}));

	return {ledgerEntries: ledgerEntries.concat(createdEntries), createdEntries};
}

export function getWalletBalance(ledgerEntries, currencyId) {
	return ledgerEntries
		.filter(entry => entry.currencyId === currencyId)
		.reduce((balance, entry) => balance + entry.amount, 0);
}

export function getWalletBalances(ledgerEntries, currencies) {
	return currencies.map(currency => ({
		currency,
		balance: getWalletBalance(ledgerEntries, currency.id)
	}));
}

export function completeGoalOccurrenceAndAccountRewards({goals, occurrences, ledgerEntries, occurrenceId, createdAt}) {
	const completionResult = completeGoalOccurrence(goals, occurrences, occurrenceId);
	const accountingResult = accountGoalOccurrenceRewards(ledgerEntries, completionResult.completion, createdAt);

	return {
		occurrences: completionResult.occurrences,
		ledgerEntries: accountingResult.ledgerEntries,
		completion: completionResult.completion,
		createdEntries: accountingResult.createdEntries
	};
}