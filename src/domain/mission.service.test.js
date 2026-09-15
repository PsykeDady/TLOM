import GoalConstants from "../constants/goal.const";
import { GoalOccurrenceStatus } from "../models/goal-occurrence.model";
import { createMission, MissionProgressStrategy } from "../models/mission.model";
import { getMissionProgress, getMissionSupportingGoals } from "./mission.service";

describe("missions", () => {
	const goals = [
		{id: "read-docs", goalType: GoalConstants.ONESHOTS},
		{id: "configure-workspace", goalType: GoalConstants.ONESHOTS},
		{id: "daily-review", goalType: GoalConstants.ROUTINES}
	];
	const occurrences = [
		{id: "read-docs-once", goalId: "read-docs", status: GoalOccurrenceStatus.COMPLETED},
		{id: "configure-once", goalId: "configure-workspace", status: GoalOccurrenceStatus.PENDING},
		{id: "review-15", goalId: "daily-review", status: GoalOccurrenceStatus.COMPLETED}
	];

	it("creates a mission with supporting goal references", () => {
		const mission = createMission({
			id: "onboarding",
			name: "Complete onboarding",
			goalIds: ["read-docs", "configure-workspace"],
			progressStrategy: MissionProgressStrategy.ACTIVITY_COMPLETION
		});

		expect(getMissionSupportingGoals(mission, goals).map(goal => goal.id)).toEqual(["read-docs", "configure-workspace"]);
	});

	it("derives activity mission progress from completed associated oneshots", () => {
		const mission = createMission({
			id: "onboarding",
			name: "Complete onboarding",
			goalIds: ["read-docs", "configure-workspace"],
			progressStrategy: MissionProgressStrategy.ACTIVITY_COMPLETION
		});

		expect(getMissionProgress(mission, goals, occurrences)).toEqual({
			current: 1,
			target: 2,
			ratio: 0.5,
			percentage: 50,
			completed: false
		});
	});

	it("completes an activity mission when all associated oneshots are completed", () => {
		const mission = createMission({
			id: "onboarding",
			name: "Complete onboarding",
			goalIds: ["read-docs", "configure-workspace"],
			progressStrategy: MissionProgressStrategy.ACTIVITY_COMPLETION
		});
		const completedOccurrences = occurrences.map(occurrence =>
			occurrence.goalId === "configure-workspace" ? {...occurrence, status: GoalOccurrenceStatus.COMPLETED} : occurrence
		);

		expect(getMissionProgress(mission, goals, completedOccurrences).completed).toBe(true);
	});

	it("keeps manual mission progress independent from its supporting goals", () => {
		const mission = createMission({
			id: "project-target",
			name: "Publish first project",
			goalIds: ["daily-review"],
			progressStrategy: MissionProgressStrategy.MANUAL,
			progress: {current: 1, target: 4}
		});
		const allGoalsCompleted = occurrences.map(occurrence => ({...occurrence, status: GoalOccurrenceStatus.COMPLETED}));

		expect(getMissionProgress(mission, goals, allGoalsCompleted)).toEqual({
			current: 1,
			target: 4,
			ratio: 0.25,
			percentage: 25,
			completed: false
		});
	});

	it("bounds manual progress and handles an undefined target explicitly", () => {
		const overTarget = createMission({id: "over", name: "Over", progress: {current: 8, target: 4}});
		const zeroTarget = createMission({id: "zero", name: "Zero", progress: {current: -3, target: 0}});

		expect(getMissionProgress(overTarget, goals, occurrences)).toMatchObject({current: 4, target: 4, percentage: 100, completed: true});
		expect(getMissionProgress(zeroTarget, goals, occurrences)).toMatchObject({current: 0, target: 0, percentage: 0, completed: false});
	});

	it("treats activity-based missions without oneshots as incomplete", () => {
		const mission = createMission({
			id: "routine-support",
			name: "Keep a review habit",
			goalIds: ["daily-review"],
			progressStrategy: MissionProgressStrategy.ACTIVITY_COMPLETION
		});

		expect(getMissionProgress(mission, goals, occurrences)).toMatchObject({current: 0, target: 0, percentage: 0, completed: false});
	});
});