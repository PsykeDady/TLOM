export const RewardType = {
	EXPERIENCE: "EXPERIENCE",
	CURRENCY: "CURRENCY"
};

export function createExperienceReward({id, amount}) {
	return {id, type: RewardType.EXPERIENCE, amount};
}

export function createCurrencyReward({id, currencyId, amount}) {
	return {id, type: RewardType.CURRENCY, currencyId, amount};
}

export function getExperienceRewardAmount(rewards) {
	return (Array.isArray(rewards) ? rewards : [])
		.filter(reward => reward.type === RewardType.EXPERIENCE && Number.isInteger(reward.amount) && reward.amount > 0)
		.reduce((total, reward) => total + reward.amount, 0);
}
