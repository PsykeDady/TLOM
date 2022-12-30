import React from "react";


import DaysComponent from "../datetime/days.component";

function ChooseFrequencyComponent (props) {

	return <div className="container">
		<div className="row">
			<div className="col-1 p-1">
				<button className="btn" onClick={props.onBack}>
					&larr; 
				</button>
			</div>
			<div className="col-10">
				{props["daily"]?<DaysComponent/>:""}
			</div>
		</div>

	</div>
}

export default ChooseFrequencyComponent;