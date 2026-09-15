import { GoalOccurrenceStatus } from "../models/goal-occurrence.model";

export function getCampaignProgress(campaign, occurrences) {
	const campaignOccurrences = occurrences.filter(occurrence => campaign.goalIds.includes(occurrence.goalId));
	const completedOccurrences = campaignOccurrences.filter(occurrence => occurrence.status === GoalOccurrenceStatus.COMPLETED).length;
	const totalOccurrences = campaignOccurrences.length;

	return {
		completedOccurrences,
		totalOccurrences,
		percentage: totalOccurrences === 0 ? 0 : Math.round((completedOccurrences / totalOccurrences) * 100)
	};
}