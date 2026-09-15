import { dateFormattingTool } from "../../../../utils/formatting.utils";
import { useContext } from "react";
import { GoalsContext } from "../../../../context/goals.context";
import { GoalOccurrenceStatus } from "../../../../models/goal-occurrence.model";

const ShowTaskComponent = (props) => {
	const goalsContext = useContext(GoalsContext);
	const formatting_date=props.formatdate??"yyyy/mm/dd hh:mm";

	return <>
		<table className="d-none d-sm-table table mt-2 table">
			<thead><tr className="foreground-fg text-center fw-bold">
					<th>
						<span className="fa fa-check-square">
						&nbsp; 
						</span>
					</th>
					{props?.header.map(v=><th key={v}>
						{v}
					</th>)}
					<th>
						<span className="fa fa-pencil-square">
								&nbsp; 
						</span>
					</th>
					<th>
						<span className="fa fa-clock-o">
								&nbsp;
						</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{props.tasks.map(({goal, occurrence}) =>
					{
						let date=dateFormattingTool(occurrence.occursAt,formatting_date);
						let resolved = occurrence.status !== GoalOccurrenceStatus.PENDING;
						return <tr key={occurrence.id} className="foreground-fg text-center">
							<td>
								<button
									type="button"
									className={`btn fa ${occurrence.status === GoalOccurrenceStatus.COMPLETED ? "fa-check-circle" : "fa-check"} background-fg foreground-bg`}
									onClick={() => goalsContext.completeGoalOccurrence(occurrence.id)}
									disabled={resolved}
									aria-label={resolved ? `${goal.name} resolved` : `Complete ${goal.name}`}
								></button>
							</td>
							<td>
								{goal.name}
							</td>
							<td>
								{goal.description}
							</td>
							<td>
								{date}
							</td>
							<td>
								<button
									type="button"
									className="btn fa fa-times btn-warning"
									onClick={() => goalsContext.skipGoalOccurrence(occurrence.id)}
									disabled={resolved}
									aria-label={`Skip ${goal.name}`}
								>
								</button>
							</td>
							<td>
								<button
									type="button"
									className="btn fa fa-clock-o btn-info"
									onClick={() => goalsContext.postponeGoalOccurrence(occurrence.id)}
									disabled={resolved}
									aria-label={`Remind me later about ${goal.name}`}
								></button>
							</td>
						</tr>
					}
				)}
			</tbody>
		</table>
		<div className="container d-sm-none mt-3">
			{props.tasks.map(({goal, occurrence})=> {
				let date=dateFormattingTool(occurrence.occursAt,formatting_date);
				let resolved = occurrence.status !== GoalOccurrenceStatus.PENDING;
				return <div key={occurrence.id} className="row rounded border border-secondary dark-primary-bg p-1 mb-2">
					<div className="col-10 m-0 p-0">
						<div className="container">
							<div className="row">
								<h4 className="col-12">{goal.name}</h4>
							</div>
							<div className="row">
								<span className="col-12 light-accent-fg small">
									{goal.description===""?"-":goal.description}
								</span>
							</div>
							<div className="row">
								<div className="col-12">
									<small className=" inactive-fg xs-text">
										{props.header?props.header[2]:""}&nbsp;{date}
									</small>
								</div>
							</div>
						</div>
					</div>
					<div className="col-2 p-2">
						
						<button
							type="button"
							className={`col-12 btn foreground-bg fa ${occurrence.status === GoalOccurrenceStatus.COMPLETED ? "fa-check-circle" : "fa-check"} mb-2`}
							onClick={() => goalsContext.completeGoalOccurrence(occurrence.id)}
							disabled={resolved}
							aria-label={resolved ? `${goal.name} resolved` : `Complete ${goal.name}`}
						/>

						<button
							type="button"
							className="col-12 btn btn-warning fa fa-times mb-2"
							onClick={() => goalsContext.skipGoalOccurrence(occurrence.id)}
							disabled={resolved}
							aria-label={`Skip ${goal.name}`}
						/>

						<button
							type="button"
							className="col-12 btn btn-info fa fa-clock-o"
							onClick={() => goalsContext.postponeGoalOccurrence(occurrence.id)}
							disabled={resolved}
							aria-label={`Remind me later about ${goal.name}`}
						/>
					</div>
				</div>
			})}
		</div>
	</>;
};
export default ShowTaskComponent; 