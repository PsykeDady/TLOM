import { useContext } from "react";
import { GoalsContext } from "../../../context/goals.context";
import { getActionableGoalOccurrences } from "../../../domain/goal.service";
import ShowTaskComponent from "./ShowTask/showtask.component";

function TodayTabComponent () {
	const goalsContext = useContext(GoalsContext);
	const actionableGoals = getActionableGoalOccurrences(goalsContext.goals, goalsContext.occurrences);

	return <div className="container pt-3">
		<div className="row">
			<div className="col-12">
				<h2 className="h4">Today</h2>
				{goalsContext.lastCompletion &&
					<output className="alert alert-success d-flex justify-content-between align-items-center">
						<span>{goalsContext.lastCompletion.goalName} completed. +{goalsContext.lastCompletion.experience} XP</span>
						<button
							type="button"
							className="btn-close"
							onClick={goalsContext.dismissCompletion}
							aria-label="Dismiss completion message"
						/>
					</output>
				}
				{actionableGoals.length === 0 ?
					<p className="inactive-fg">No activities are waiting for you.</p> :
					<ShowTaskComponent
						tasks={actionableGoals}
						header={["Name", "Description", "When"]}
						formatdate="yyyy/mm/dd hh:mm"
					/>
				}
			</div>
		</div>
	</div>;
}

export default TodayTabComponent;