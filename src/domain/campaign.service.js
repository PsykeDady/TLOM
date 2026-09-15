export function getCampaignMissions(campaign, missions) {
	const missionIds = new Set(campaign.missionIds);

	return missions.filter(mission => missionIds.has(mission.id));
}