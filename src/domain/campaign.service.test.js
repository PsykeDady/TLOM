import { getCampaignMissions } from "./campaign.service";


describe("getCampaignMissions", () => {
	it("returns the missions explicitly associated with a campaign", () => {
		const campaign = {missionIds: ["onboarding", "project"]};
		const missions = [
			{id: "onboarding"},
			{id: "project"},
			{id: "outside-campaign"}
		];

		expect(getCampaignMissions(campaign, missions).map(mission => mission.id)).toEqual(["onboarding", "project"]);
	});
});