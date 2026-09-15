import { useContext } from "react";
import { GoalsContext } from "../../../context/goals.context";
import { MissionsContext } from "../../../context/missions.context";
import { MissionProgressStrategy } from "../../../models/mission.model";
import { getMissionProgress, getMissionSupportingGoals } from "../../../domain/mission.service";

function MissionsTabComponent () {
	const {missions} = useContext(MissionsContext);
	const {goals, occurrences} = useContext(GoalsContext);

	return <div className="container pt-3">
		<div className="row">
			<div className="col-12">
				<h2 className="h4">Missions</h2>
				{missions.map(mission => {
					const progress = getMissionProgress(mission, goals, occurrences);
					const supportingGoals = getMissionSupportingGoals(mission, goals);
					const strategyLabel = mission.progressStrategy === MissionProgressStrategy.ACTIVITY_COMPLETION ? "Activity progress" : "Manual progress";

					return <article key={mission.id} className="dark-primary-bg border border-secondary rounded p-3 mb-3">
						<div className="d-flex justify-content-between align-items-start gap-2">
							<div>
								<h3 className="h5 mb-1">{mission.name}</h3>
								{mission.description && <p className="mb-2 light-accent-fg">{mission.description}</p>}
							</div>
							<span className="badge accent-bg background-fg">{progress.completed ? "Completed" : "In progress"}</span>
						</div>
						<p className="small inactive-fg mb-2">{strategyLabel}</p>
						<progress className="w-100" aria-label={`${mission.name} progress`} value={progress.current} max={progress.target || 1}>
							{progress.percentage}%
						</progress>
						<p className="small inactive-fg mb-0 mt-2">{progress.current} of {progress.target}</p>
						{supportingGoals.length > 0 && <p className="small mb-0 mt-2">Supporting: {supportingGoals.map(goal => goal.name).join(", ")}</p>}
					</article>;
				})}
			</div>
		</div>
	</div>;
}

export default MissionsTabComponent;