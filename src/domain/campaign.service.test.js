import { getCampaignProgress } from "./campaign.service";

describe("getCampaignProgress", () => {
	it("calculates campaign progress from its linked goals", () => {
		const campaign = {goalIds: [1, 2, 3]};
		const goals = [
			{id: 1, checked: true},
			{id: 2, checked: false},
			{id: 3, checked: true},
			{id: 4, checked: true}
		];

		expect(getCampaignProgress(campaign, goals)).toEqual({
			completedGoals: 2,
			totalGoals: 3,
			percentage: 67
		});
	});
});