export function getCampaignProgress(campaign, goals) {
	const campaignGoals = goals.filter(goal => campaign.goalIds.includes(goal.id));
	const completedGoals = campaignGoals.filter(goal => goal.checked).length;
	const totalGoals = campaignGoals.length;

	return {
		completedGoals,
		totalGoals,
		percentage: totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100)
	};
}