export const DEFAULT_GOAL_EXPERIENCE = 10;

export function getActionableGoals(goals, now = new Date()) {
	return goals.filter(goal =>
		!goal.checked &&
		!goal.skipped &&
		(!goal.remindAt || new Date(goal.remindAt) <= now)
	);
}

export function completeGoal(goals, goalId) {
	const completedGoal = goals.find(goal => goal.id === goalId);

	if (!completedGoal || completedGoal.checked) {
		return {goals, completion: null};
	}

	return {
		goals: goals.map(goal =>
			goal.id === goalId ? {...goal, checked: true} : goal
		),
		completion: {
			goalId: completedGoal.id,
			goalName: completedGoal.name,
			experience: completedGoal.exp
		}
	};
}

export function skipGoal(goals, goalId) {
	const skippedGoal = goals.find(goal => goal.id === goalId);

	if (!skippedGoal || skippedGoal.checked || skippedGoal.skipped) {
		return {goals, skippedGoal: null};
	}

	return {
		goals: goals.map(goal =>
			goal.id === goalId ? {...goal, skipped: true} : goal
		),
		skippedGoal
	};
}

export function postponeGoal(goals, goalId, remindAt) {
	const postponedGoal = goals.find(goal => goal.id === goalId);

	if (!postponedGoal || postponedGoal.checked || postponedGoal.skipped) {
		return {goals, postponedGoal: null};
	}

	return {
		goals: goals.map(goal =>
			goal.id === goalId ? {...goal, remindAt} : goal
		),
		postponedGoal: {...postponedGoal, remindAt}
	};
}