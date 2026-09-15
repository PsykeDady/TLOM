export const RewardType = {
	EXPERIENCE: "EXPERIENCE",
	CURRENCY: "CURRENCY"
};

export function createExperienceReward(amount) {
	return {type: RewardType.EXPERIENCE, amount};
}

export function createCurrencyReward(currencyId, amount) {
	return {type: RewardType.CURRENCY, currencyId, amount};
}

export function getExperienceRewardAmount(rewards) {
	return (Array.isArray(rewards) ? rewards : [])
		.filter(reward => reward.type === RewardType.EXPERIENCE && Number.isInteger(reward.amount) && reward.amount > 0)
		.reduce((total, reward) => total + reward.amount, 0);
}
