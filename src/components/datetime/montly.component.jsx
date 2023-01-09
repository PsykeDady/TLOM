import { useState } from "react"
import { splitArray } from "../../utils/arrays.util"

const MONTHS = [
	"GEN","FEB","MAR",
	"APR","MAY","JUN",
	"JUL","AUG","SEP",
	"OCT","NOV","DEC"
]

function MonthlyComponent() {
	/**
	 * TODO 
	 * allora il daily è sbagliato, va scelto tipo "ogni tot giorno del mese" e non si riferisce ad un mese preciso 
	 * 
	 * 
	 * il weekly va messo a multi scelta
	 * idem per monthly
	 */

	let [monthsSelected, setMonthsSelected] = useState([
		false,false,false,
		false,false,false,
		false,false,false,
		false,false,false
	])

	let setMonthSelected = (index) => {
		setMonthsSelected( monthsSelected.map((v,i)=> i!==index ? v : !v) )
	}

	return <table className="col-12">
		<tbody>
			{splitArray(MONTHS,3).map((v,i)=>{
				return <tr className="months-row">
					{v.map((v,j)=> {
						let cell=i*3+j;
						return <td
							className={`months-cal ${monthsSelected[cell]?"selected":""}`} 
							onClick={()=>setMonthSelected(cell)}
						>
							{v}
						</td>
					})}
				</tr>
			})}
		</tbody>
	</table>
}


export default MonthlyComponent;