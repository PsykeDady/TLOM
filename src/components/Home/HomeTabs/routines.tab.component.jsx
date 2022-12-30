
import {useContext,useEffect,useState} from "react";
import { GoalsContext } from "../../../context/goals.context";
import GoalConstants from "../../../constants/goal.const";
import AddTaskComponent from "../../misc/addtask.component";
import ShowTaskComponent from "./ShowTask/showtask.component";


function RoutinesTabComponent () {
	const goalsContext = useContext(GoalsContext);
	let [addModal,flagAddModal]=useState(false); 

	useEffect(()=>{},[goalsContext.oneshots])

	let onAddClick = () => {
		flagAddModal(true)
	}

	return addModal ? <AddTaskComponent
		onBackdropClick={()=>flagAddModal(false)}
		title="Add Routine"
		onAddClick={goalsContext.addRoutine}
		routines
	></AddTaskComponent> : <div className="container">		
		<div className="row">
			<div className="col-12">
				<ShowTaskComponent
					tasks={goalsContext.goals.filter(v=>v.goalType===GoalConstants.ROUTINES)}
					header={["Name","Description","Repeat on"]}
					formatdate=""
				/>
			</div>
		</div>
		<div className="row">
			<div className="col-12 p-3">
				<button className=" accent-bg  pull-right light-primary-fg circle-shape fa fa-plus blur-box-inactive" onClick={()=>onAddClick()}>
				</button>
				</div>
		</div>
	</div>;
} export default RoutinesTabComponent