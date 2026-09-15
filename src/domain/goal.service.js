import { GoalOccurrenceStatus } from "../models/goal-occurrence.model";
import { getExperienceRewardAmount } from "../models/reward.model";

export function getActionableGoalOccurrences(goals, occurrences, now = new Date()) {
	const goalsById = new Map(goals.map(goal => [goal.id, goal]));

	return occurrences
		.filter(occurrence =>
			occurrence.status === GoalOccurrenceStatus.PENDING &&
			(!occurrence.remindAt || new Date(occurrence.remindAt) <= now) &&
			goalsById.has(occurrence.goalId)
		)
		.map(occurrence => ({goal: goalsById.get(occurrence.goalId), occurrence}));
}

export function getGoalOccurrenceItems(goals, occurrences, goalType) {
	const goalsById = new Map(goals.map(goal => [goal.id, goal]));

	return occurrences
		.filter(occurrence => {
			const goal = goalsById.get(occurrence.goalId);
			return goal && (!goalType || goal.goalType === goalType);
		})
		.map(occurrence => ({goal: goalsById.get(occurrence.goalId), occurrence}));
}

export function completeGoalOccurrence(goals, occurrences, occurrenceId) {
	const occurrence = occurrences.find(item => item.id === occurrenceId);
	const goal = occurrence && goals.find(item => item.id === occurrence.goalId);

	if (!goal || !occurrence || occurrence.status !== GoalOccurrenceStatus.PENDING) {
		return {occurrences, completion: null};
	}

	return {
		occurrences: occurrences.map(item =>
			item.id === occurrenceId ? {...item, status: GoalOccurrenceStatus.COMPLETED} : item
		),
		completion: {
			goalId: goal.id,
			occurrenceId: occurrence.id,
			goalName: goal.name,
			experience: getExperienceRewardAmount(goal.rewards),
			rewards: goal.rewards
		}
	};
}

export function skipGoalOccurrence(occurrences, occurrenceId) {
	const occurrence = occurrences.find(item => item.id === occurrenceId);

	if (!occurrence || occurrence.status !== GoalOccurrenceStatus.PENDING) {
		return {occurrences, skippedOccurrence: null};
	}

	return {
		occurrences: occurrences.map(item =>
			item.id === occurrenceId ? {...item, status: GoalOccurrenceStatus.SKIPPED} : item
		),
		skippedOccurrence: occurrence
	};
}

export function postponeGoalOccurrence(occurrences, occurrenceId, remindAt) {
	const occurrence = occurrences.find(item => item.id === occurrenceId);

	if (!occurrence || occurrence.status !== GoalOccurrenceStatus.PENDING) {
		return {occurrences, postponedOccurrence: null};
	}

	return {
		occurrences: occurrences.map(item =>
			item.id === occurrenceId ? {...item, remindAt} : item
		),
		postponedOccurrence: {...occurrence, remindAt}
	};
}