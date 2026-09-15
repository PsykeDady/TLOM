let nextOccurrenceId = 0;

export const GoalOccurrenceStatus = {
	PENDING: "PENDING",
	COMPLETED: "COMPLETED",
	SKIPPED: "SKIPPED"
};

export function createGoalOccurrence({id, goalId, occursAt, status = GoalOccurrenceStatus.PENDING, remindAt = null}) {
	return {
		id: id ?? `occurrence-${nextOccurrenceId++}`,
		goalId,
		occursAt,
		status,
		remindAt
	};
}