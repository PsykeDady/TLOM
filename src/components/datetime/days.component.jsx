import React from "react";

import { generateDays,WEEKDAYS } from "../../utils/dateutils.util";
import { splitArray } from "../../utils/arrays.util";

const days=splitArray(generateDays(),7); 


const selected = [
	0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0
];


let tdize = (value,index) => {
	
	return `<td class="days-cal ${selected[index]?"selected":""} ${value!=0?"selectable":""}" onClick="()=>{console.log(1)}">${value==0?"":value}</td>`;
} 

let trize = () => {
	return `<tr class="">`; 
}

function DaysComponent () {
	
	return <table className="m-2 col-12">
		<thead>
			{WEEKDAYS.map(weekday=>{
				return <th className="days-cal"> <strong>
					{weekday}
				</strong></th>
			})}
		</thead>
		<tbody>
			{days.map((row)=>{
				return <tr>
					{row.map((day,index) => { 
						return <td className={`days-cal ${selected[index]?"selected":""} ${day!=0?"selectable":""}`}>
							{day==0?"":day}
						</td>
					})}
				</tr>
			})}
		</tbody>
	</table>
	;
}

export default DaysComponent;