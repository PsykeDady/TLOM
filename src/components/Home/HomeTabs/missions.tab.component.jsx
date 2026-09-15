import { useContext } from "react";
import { GoalsContext } from "../../../context/goals.context";
import { MissionsContext } from "../../../context/missions.context";
import { MissionProgressStrategy } from "../../../models/mission.model";
import { getMissionProgress, getMissionSupportingGoals } from "../../../domain/mission.service";
import { ProgressDisplay } from "../../GameShell/game-ui.component";

function MissionsTabComponent () {
	const {missions} = useContext(MissionsContext);
	const {goals, occurrences} = useContext(GoalsContext);

	return <section className="game-page"><p className="section-eyebrow">Your objectives</p><h2 className="game-page__heading">Missions</h2><p className="game-page__intro">Track the objectives that give your adventures direction.</p>
				{missions.map(mission => {
					const progress = getMissionProgress(mission, goals, occurrences);
					const supportingGoals = getMissionSupportingGoals(mission, goals);
					const strategyLabel = mission.progressStrategy === MissionProgressStrategy.ACTIVITY_COMPLETION ? "Activity progress" : "Manual progress";

					return <article key={mission.id} className="game-card"><div className="split-line"><h3>{mission.name}</h3><span className={`status-badge ${progress.completed ? "status-badge--completed" : "status-badge--pending"}`}>{progress.completed ? "Completed" : "In progress"}</span></div>{mission.description && <p className="muted">{mission.description}</p>}<p className="section-eyebrow">{strategyLabel}</p><ProgressDisplay progress={progress} label={`${mission.name} progress`} />{supportingGoals.length > 0 && <p className="muted">Supporting goals: {supportingGoals.map(goal => goal.name).join(", ")}</p>}
					</article>;
				})}
	</section>;
}

export default MissionsTabComponent;