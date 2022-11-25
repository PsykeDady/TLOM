import { useState, useContext, useEffect } from "react";
import { GoalsContext } from "../../../context/goals.context";
import { dateFormattingTool } from "../../../utils/formatting.utils";
import AddTaskComponent from "../../misc/addtask.component";
import AlertComponent from "../../misc/alert.component";


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
				<table className="table mt-2 table">
					<thead><tr className="text-fg text-center fw-bold">
							<th>
								<span className="fa fa-check-square">
								&nbsp; 
								</span>
							</th>
							<th>Name</th>
							<th>Description</th>
							<th>Date</th>
							<th>
								<span className="fa fa-pencil-square">
										&nbsp; 
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{goalsContext.oneshots.map(v=>
							<tr key={v.id} className="text-fg text-center">
								<td>
									<button className="btn fa fa-check text-fg accent-bg"></button>
								</td>
								<td>
									{v.name}
								</td>
								<td>
									{v.description}
								</td>
								<td>
									{dateFormattingTool(v.date,"yyyy/MM/dd-hh:mm")}
								</td>
								<td>
									<button className="btn fa fa-pencil btn-warning">
									</button>
								</td>
							</tr>
						)}
					</tbody>
				</table>
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