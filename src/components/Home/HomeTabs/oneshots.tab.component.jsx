import { useContext, useEffect, useState } from "react";
import { GoalsContext } from "../../../context/goals.context";
import AddTaskComponent from "../../misc/addtask.component";
import ShowTaskComponent from "./ShowTask/showtask.component";

function OneshotsTabComponent (props){

	const goalsContext = useContext(GoalsContext);
	let [addModal,flagAddModal]=useState(false); 

	useEffect(()=>{
		console.log(goalsContext.oneshots)
	},[goalsContext.oneshots])

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
					oneshots={goalsContext.oneshots}
				>
				</ShowTaskComponent>
			</div>
		</div>
		<div className="row">
			<div className="col-12 p-3">
				<button className="btn border-0 rounded-circle pull-right fa-2x fa fa-plus-circle text-fg" onClick={()=>onAddClick()}>
				</button>
				</div>
		</div>
	</div>;
} export default OneshotsTabComponent