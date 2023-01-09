import { useState } from "react";

function WeeklyComponent () {
	let [activeWeeks, flagActiveWeeks] = useState([false,false,false,false])

	let flagActiveWeek = (index) => {
		flagActiveWeeks(activeWeeks.map((v,i)=>i!=index?v:!v));
	}

	return <div className="container p-3">
		<div className="row">
			<div className="col-12">Every: </div>
			<br />
			<br />
			<ul className="list-group list-group-flush">
				<li 
					className={`list-group-item selectable ${activeWeeks[0]? "selected":""}`}
					onClick={()=>flagActiveWeek(0)}
				>1st week</li>
				<li 
					className={`list-group-item selectable ${activeWeeks[1]? "selected":""}`}
					onClick={()=>flagActiveWeek(1)}
				>2nd week</li>
				<li 
					className={`list-group-item selectable ${activeWeeks[2]? "selected":""}`}
					onClick={()=>flagActiveWeek(2)}
				>3rd week</li>
				<li 
					className={`list-group-item selectable ${activeWeeks[3]? "selected":""}`}
					onClick={()=>flagActiveWeek(3)}
				>4th week</li>
			</ul>
		</div>
	</div>
}

export default WeeklyComponent; 