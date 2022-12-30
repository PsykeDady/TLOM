import React from "react";

import { generateDays,WEEKDAYS } from "../../utils/dateutils.util";
import { splitArray } from "../../utils/arrays.util";
import { useState } from "react";


function DaysComponent () {

	const days=splitArray(generateDays(),7); 

	const [selected,setSelected] = useState([
		0, 0, 0, 0, 0, 0, 0, 
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0
	]);

	let selectIndex = (index) => {
		if(days[index]==0) return;
		let nselected=[...selected]
		nselected[index]=!nselected[index]
		setSelected(nselected);
	}

	let tdize = (day,index) => {
		return <td 
				key={`${WEEKDAYS[index]}+${day}`}
				className={
					`days-cal
					${selected[index]?"selected":""} 
					${day!=0?"selectable":""}`
					}
				onClick={()=>selectIndex(index)}
			>
			{day==0?"":day}
		</td>
	}
	
	return <table className="m-2 col-12">
		<thead><tr>
			{WEEKDAYS.map(weekday=>{
				return <th key={weekday} className="days-cal">	
					{weekday}
				</th>
			})}
		</tr></thead>
		<tbody>
			{days.map((row,rindex)=>{
				return <tr key={`week ${row}`}>
					{row.map((day,index) => { 
						return tdize(day,(rindex*7)+index);
					})}
				</tr>
			})}
		</tbody>
	</table>
	;
}

export default DaysComponent;