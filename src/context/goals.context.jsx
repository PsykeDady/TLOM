import React, { useState } from "react";
import Goal from "../models/goal.model";


export const GoalsContext = React.createContext({
	oneshots: [],
	addOneshot: (name,description,exp,rewards)=>{}
})


const GoalsProvider = (props) => {

	let [oneshots, setOneshots] = useState([]); 

	let addOneshot =  (name,description,exp,rewards) => {
		let goal = new Goal(); 
		goal.goalType="oneshot"
		goal.checked=false; 
		goal.rewards=rewards; 
		goal.name=name
		goal.description=description
		goal.exp=exp;
		
		setOneshots(oneshots.map(v=>v).concat(goal))
	}

	return <GoalsContext.Provider value={{
		oneshots: oneshots,
		addOneshot:addOneshot,
	}}>
		{props.children}
	</GoalsContext.Provider>
}

export default GoalsProvider; 




