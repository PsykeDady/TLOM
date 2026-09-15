import { getCampaignProgress } from "./campaign.service";

describe("getCampaignProgress", () => {
	it("calculates campaign progress from occurrences linked to its goals", () => {
		const campaign = {goalIds: [1, 2, 3]};
		const occurrences = [
			{id: "one", goalId: 1, status: "COMPLETED"},
			{id: "two", goalId: 2, status: "PENDING"},
			{id: "three", goalId: 3, status: "COMPLETED"},
			{id: "four", goalId: 4, status: "COMPLETED"}
		];

		expect(getCampaignProgress(campaign, occurrences)).toEqual({
			completedOccurrences: 2,
			totalOccurrences: 3,
			percentage: 67
		});
	});
});