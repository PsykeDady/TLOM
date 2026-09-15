import { completeGoal, getActionableGoals, postponeGoal, skipGoal } from "./goal.service";

describe("completeGoal", () => {
	it("marks an incomplete goal as completed and returns its XP reward", () => {
		const goals = [{id: 1, name: "Walk", checked: false, exp: 10}];

		const result = completeGoal(goals, 1);

		expect(result.goals[0].checked).toBe(true);
		expect(result.completion).toEqual({goalId: 1, goalName: "Walk", experience: 10});
	});

	it("does not reward an already completed goal", () => {
		const goals = [{id: 1, name: "Walk", checked: true, exp: 10}];

		const result = completeGoal(goals, 1);

		expect(result.goals).toBe(goals);
		expect(result.completion).toBeNull();
	});

	it("skips an incomplete goal without awarding XP", () => {
		const goals = [{id: 1, name: "Walk", checked: false, skipped: false, exp: 10}];

		const result = skipGoal(goals, 1);

		expect(result.goals[0].skipped).toBe(true);
		expect(result.skippedGoal.name).toBe("Walk");
	});

	it("stores a reminder time for an incomplete goal", () => {
		const remindAt = new Date("2026-09-15T15:00:00.000Z");
		const goals = [{id: 1, name: "Walk", checked: false, skipped: false, exp: 10}];

		const result = postponeGoal(goals, 1, remindAt);

		expect(result.goals[0].remindAt).toBe(remindAt);
	});

	it("excludes postponed goals until their reminder time", () => {
		const now = new Date("2026-09-15T14:00:00.000Z");
		const goals = [
			{id: 1, checked: false, skipped: false, remindAt: new Date("2026-09-15T15:00:00.000Z")},
			{id: 2, checked: false, skipped: false, remindAt: new Date("2026-09-15T13:00:00.000Z")}
		];

		expect(getActionableGoals(goals, now).map(goal => goal.id)).toEqual([2]);
	});
});