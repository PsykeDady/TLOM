import React, { useState } from "react";
import DailyComponent from "../datetime/daily.component";


import MonthlyComponent from "../datetime/montly.component";
import WeeklyComponent from "../datetime/weekly.component";

function ChooseFrequencyComponent (props) {

	let [selection,setSelection] = useState([])

	let [chooseDays, flagChooseDays] = useState(false);

	let backOrGo = selection.length==0? 
		<div className="col-12 header p-2 text-center" onClick={props.onBack}>
			&larr; 
		</div> : <>
			<div className="col-6 header p-2 text-center" onClick={props.onBack}>
				&larr; 
			</div>
			<div className="col-6 header p-2 text-center" onClick={props.onBack}>
				&#10003;
			</div>
		</>

	return <div className="container">
		<div className="row">
			{backOrGo}
			<div className="col-12">
				{props["weekly"]?<WeeklyComponent/>:""}
				{props["monthly"]?<MonthlyComponent/>:""}
			</div>
		</div>

	</div>
}

export default ChooseFrequencyComponent;