import GoalConstants from "../constants/goal.const";
import { GoalOccurrenceStatus } from "../models/goal-occurrence.model";
import { MissionProgressStrategy } from "../models/mission.model";

function getBoundedProgress(current, target) {
	const safeTarget = Number.isFinite(target) && target > 0 ? target : 0;
	const safeCurrent = Number.isFinite(current) && current > 0 ? current : 0;
	const boundedCurrent = safeTarget === 0 ? 0 : Math.min(safeCurrent, safeTarget);
	const ratio = safeTarget === 0 ? 0 : boundedCurrent / safeTarget;

	return {
		current: boundedCurrent,
		target: safeTarget,
		ratio,
		percentage: Math.round(ratio * 100),
		completed: safeTarget > 0 && boundedCurrent === safeTarget
	};
}

function getActivityCompletionProgress(mission, goals, occurrences) {
	const associatedGoalIds = new Set(mission.goalIds);
	const activityGoals = goals.filter(goal =>
		associatedGoalIds.has(goal.id) && goal.goalType === GoalConstants.ONESHOTS
	);
	const completedGoalIds = new Set(
		occurrences
			.filter(occurrence => occurrence.status === GoalOccurrenceStatus.COMPLETED)
			.map(occurrence => occurrence.goalId)
	);
	const completedActivities = activityGoals.filter(goal => completedGoalIds.has(goal.id)).length;

	return getBoundedProgress(completedActivities, activityGoals.length);
}

export function getMissionSupportingGoals(mission, goals) {
	const goalsById = new Map(goals.map(goal => [goal.id, goal]));

	return mission.goalIds
		.map(goalId => goalsById.get(goalId))
		.filter(Boolean);
}

export function getMissionProgress(mission, goals, occurrences) {
	if (mission.progressStrategy === MissionProgressStrategy.ACTIVITY_COMPLETION) {
		return getActivityCompletionProgress(mission, goals, occurrences);
	}

	return getBoundedProgress(mission.progress?.current, mission.progress?.target);
}