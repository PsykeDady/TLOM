import { useContext, useEffect, useState } from "react";
import GoalConstants from "../../../constants/goal.const";
import { GoalsContext } from "../../../context/goals.context";
import AddTaskComponent from "../../misc/addtask.component";
import ShowTaskComponent from "./ShowTask/showtask.component";

function OneshotsTabComponent (props){

	const goalsContext = useContext(GoalsContext);
	let [addModal,flagAddModal]=useState(false); 

	useEffect(()=>{},[goalsContext.oneshots])

	let onAddClick = () => {
		flagAddModal(true)
	}

	return addModal ? <AddTaskComponent
		onBackdropClick={()=>flagAddModal(false)}
		title="Add Oneshot"
		onAddClick={goalsContext.addOneshot}
	></AddTaskComponent> : <div className="container">		
		<div className="row">
			<div className="col-12">
				<ShowTaskComponent
					tasks={goalsContext.goals.filter(v=>v.goalType===GoalConstants.ONESHOTS)}
					header={["Name","Description","Timeline"]}
					formatdate="yyyy/mm/dd hh:mm"
				>
				</ShowTaskComponent>
			</div>
		</div>
		<div className="row">
			<div className="col-12 p-3">
				<button className=" accent-bg  pull-right light-primary-fg circle-shape fa fa-plus blur-box-inactive" onClick={()=>onAddClick()}>
				</button>
				</div>
		</div>
	</div>;
} export default OneshotsTabComponent