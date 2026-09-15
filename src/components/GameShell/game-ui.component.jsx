import { RewardType } from "../../models/reward.model";
import { GoalOccurrenceStatus } from "../../models/goal-occurrence.model";

export function RewardBadges({rewards, currencies}) {
	const currenciesById = new Map(currencies.map(currency => [currency.id, currency]));
	const visibleRewards = rewards.filter(reward => reward.type === RewardType.EXPERIENCE || reward.type === RewardType.CURRENCY);
	return <div className="reward-list" aria-label="Rewards">{visibleRewards.map(reward => {
		if (reward.type === RewardType.EXPERIENCE) {
			return <span className="reward-badge reward-badge--xp" key={reward.id}>+{reward.amount} XP</span>;
		}
		const currency = currenciesById.get(reward.currencyId);
		return <span className="reward-badge" key={reward.id}>+{reward.amount} {currency?.symbol ?? reward.currencyId}</span>;
	})}</div>;
}

export function StatusBadge({occurrence}) {
	if (occurrence.status === GoalOccurrenceStatus.COMPLETED) return <span className="status-badge status-badge--completed">Completed</span>;
	if (occurrence.status === GoalOccurrenceStatus.SKIPPED) return <span className="status-badge status-badge--skipped">Skipped</span>;
	if (occurrence.remindAt) return <span className="status-badge status-badge--reminder">Reminder set</span>;
	return <span className="status-badge status-badge--pending">Ready</span>;
}

export function ProgressDisplay({progress, label}) {
	return <div><progress className="progress-track" aria-label={label} value={progress.current} max={progress.target || 1}>{progress.percentage}%</progress><div className="progress-label"><span>{progress.current} of {progress.target}</span><span>{progress.percentage}%</span></div></div>;
}