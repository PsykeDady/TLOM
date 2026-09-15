import { GoalsBuilder } from "../models/goal.model";
import { createGoalOccurrence, GoalOccurrenceStatus } from "../models/goal-occurrence.model";
import { createExperienceReward } from "../models/reward.model";
import {
	completeGoalOccurrence,
	getActionableGoalOccurrences,
	postponeGoalOccurrence,
	skipGoalOccurrence
} from "./goal.service";

describe("goal occurrences", () => {
	const goals = [{id: "daily-walk", name: "Daily walk", rewards: [createExperienceReward({id: "walk-xp", amount: 10})], goalType: "ROUTINES"}];
	const today = "2026-09-15T18:00:00.000Z";
	const tomorrow = "2026-09-16T18:00:00.000Z";

	it("completes a pending occurrence and assigns its configured XP", () => {
		const occurrences = [{id: "walk-15", goalId: "daily-walk", occursAt: today, status: GoalOccurrenceStatus.PENDING, remindAt: null}];

		const result = completeGoalOccurrence(goals, occurrences, "walk-15");

		expect(result.occurrences[0].status).toBe(GoalOccurrenceStatus.COMPLETED);
		expect(result.completion.experience).toBe(10);
	});

	it("is idempotent for the same occurrence", () => {
		const occurrences = [{id: "walk-15", goalId: "daily-walk", occursAt: today, status: GoalOccurrenceStatus.PENDING, remindAt: null}];
		const completed = completeGoalOccurrence(goals, occurrences, "walk-15");
		const repeated = completeGoalOccurrence(goals, completed.occurrences, "walk-15");

		expect(repeated.completion).toBeNull();
		expect(repeated.occurrences).toBe(completed.occurrences);
	});

	it("skips only the selected occurrence without changing the routine definition", () => {
		const occurrences = [{id: "walk-15", goalId: "daily-walk", occursAt: today, status: GoalOccurrenceStatus.PENDING, remindAt: null}];

		const result = skipGoalOccurrence(occurrences, "walk-15");

		expect(result.occurrences[0].status).toBe(GoalOccurrenceStatus.SKIPPED);
		expect(goals[0]).not.toHaveProperty("checked");
		expect(goals[0]).not.toHaveProperty("skipped");
	});

	it("hides a postponed occurrence until its reminder time", () => {
		const occurrences = [{id: "walk-15", goalId: "daily-walk", occursAt: today, status: GoalOccurrenceStatus.PENDING, remindAt: null}];
		const reminder = new Date("2026-09-15T19:00:00.000Z");
		const postponed = postponeGoalOccurrence(occurrences, "walk-15", reminder);

		expect(getActionableGoalOccurrences(goals, postponed.occurrences, new Date("2026-09-15T18:30:00.000Z"))).toEqual([]);
		expect(getActionableGoalOccurrences(goals, postponed.occurrences, new Date("2026-09-15T19:00:00.000Z"))).toHaveLength(1);
	});

	it("keeps different occurrences of the same routine independent and rewards each one", () => {
		const occurrences = [
			{id: "walk-15", goalId: "daily-walk", occursAt: today, status: GoalOccurrenceStatus.PENDING, remindAt: null},
			{id: "walk-16", goalId: "daily-walk", occursAt: tomorrow, status: GoalOccurrenceStatus.PENDING, remindAt: null}
		];
		const firstCompletion = completeGoalOccurrence(goals, occurrences, "walk-15");
		const secondCompletion = completeGoalOccurrence(goals, firstCompletion.occurrences, "walk-16");

		expect(firstCompletion.occurrences[1].status).toBe(GoalOccurrenceStatus.PENDING);
		expect(secondCompletion.completion.experience).toBe(10);
		expect(secondCompletion.occurrences.every(item => item.status === GoalOccurrenceStatus.COMPLETED)).toBe(true);
	});

	it("models operational state as one explicit occurrence status, not boolean combinations", () => {
		const definition = new GoalsBuilder().name("Daily walk").goalType("ROUTINES").build();
		const occurrence = createGoalOccurrence({goalId: definition.id, occursAt: today});

		expect(definition).not.toHaveProperty("checked");
		expect(definition).not.toHaveProperty("skipped");
		expect(occurrence).not.toHaveProperty("checked");
		expect(occurrence).not.toHaveProperty("skipped");
		expect(occurrence.status).toBe(GoalOccurrenceStatus.PENDING);
	});
});