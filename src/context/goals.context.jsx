import React, { useState } from "react";
import GoalConstants from "../constants/goal.const";
import { GoalsBuilder } from "../models/goal.model";


export const GoalsContext = React.createContext({
	goals: [],
	addOneshot: (name,description,exp,rewards,date)=>{},
	addRoutine : (name,description,exp,rewards,date) => {}
})


const GoalsProvider = (props) => {

	let [goals, setGoals] = useState([
		new GoalsBuilder()
			.name("Task 1")
			.description("My first Task")
			.date(new Date())
			.exp(0)
			.checked(false)
			.goalType(GoalConstants.ONESHOTS)
			.build(),
		new GoalsBuilder()
			.name("Routine 1")
			.description("My first Routine")
			.cron("* * 1/14 * *")
			.exp(0)
			.checked(false)
			.goalType(GoalConstants.ROUTINES)
			.build()
	]); 

	let addOneshot =  (name,description,exp,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.date(date)
			.exp(exp)
			.goalType(GoalConstants.ONESHOTS)
			.rewards(rewards)
			.build()
		setGoals(goals.map(v=>v).concat(goal))
	}


	let addRoutine =  (name,description,exp,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.date(date)
			.exp(exp)
			.goalType(GoalConstants.ROUTINES)
			.rewards(rewards)
			.build()
		setGoals(goals.map(v=>v).concat(goal))
	}

	return <GoalsContext.Provider value={{
		goals: goals,
		addOneshot:addOneshot,
		addRoutine:addRoutine,
	}}>
		{props.children}
	</GoalsContext.Provider>
}

export default GoalsProvider; 




