import { useContext } from "react";
import { GoalsContext } from "../../../context/goals.context";
import { getGoalOccurrenceItems } from "../../../domain/goal.service";
import GoalConstants from "../../../constants/goal.const";
import { GoalOccurrenceStatus } from "../../../models/goal-occurrence.model";
import { RewardBadges, StatusBadge } from "../../GameShell/game-ui.component";

function TodayTabComponent ({onNavigate}) {
	const goalsContext = useContext(GoalsContext);
	const occurrences = getGoalOccurrenceItems(goalsContext.goals, goalsContext.occurrences).sort((left, right) => Number(left.occurrence.status !== GoalOccurrenceStatus.PENDING) - Number(right.occurrence.status !== GoalOccurrenceStatus.PENDING));

	return <section className="game-page">
		<p className="section-eyebrow">Player adventure</p><h2 className="game-page__heading">Today</h2><p className="game-page__intro">Choose your next move. Each completed goal adds its real reward to your legend.</p>
				{goalsContext.lastCompletion &&
					<output className="notice"><div className="split-line"><strong>{goalsContext.lastCompletion.goalName} completed</strong><button type="button" className="game-button game-button--secondary" onClick={goalsContext.dismissCompletion} aria-label="Dismiss completion reward">Close</button></div><RewardBadges rewards={goalsContext.lastCompletion.rewards} currencies={goalsContext.currencies} /></output>
				}
				{occurrences.length === 0 ? <div className="game-card empty-state">No adventures for today. Your next move is yours.</div> : occurrences.map(({goal, occurrence}) => {
					const resolved = occurrence.status !== GoalOccurrenceStatus.PENDING;
					return <article className="game-card" key={occurrence.id}><div className="split-line"><span className="type-badge">{goal.goalType === GoalConstants.ROUTINES ? "Routine" : "Oneshot"}</span><StatusBadge occurrence={occurrence} /></div><h3>{goal.name}</h3>{goal.description && <p className="muted">{goal.description}</p>}<RewardBadges rewards={goal.rewards} currencies={goalsContext.currencies} />{!resolved && <div className="action-row"><button type="button" className="game-button" onClick={() => goalsContext.completeGoalOccurrence(occurrence.id)}>Complete</button><button type="button" className="game-button game-button--secondary" onClick={() => goalsContext.skipGoalOccurrence(occurrence.id)}>Skip</button><button type="button" className="game-button game-button--warning" onClick={() => goalsContext.postponeGoalOccurrence(occurrence.id)}>Remind later</button></div>}</article>;
				})}
			<div className="action-row"><button type="button" className="game-button game-button--secondary" onClick={() => onNavigate(GoalConstants.ROUTINES)}>All routines</button><button type="button" className="game-button game-button--secondary" onClick={() => onNavigate(GoalConstants.ONESHOTS)}>All oneshots</button></div>
	</section>;
}

export default TodayTabComponent;