import React, { useState } from "react";
import GoalConstants from "../constants/goal.const";
import { GoalsBuilder } from "../models/goal.model";
import {
	completeGoal as completeGoalInDomain,
	DEFAULT_GOAL_EXPERIENCE,
	postponeGoal as postponeGoalInDomain,
	skipGoal as skipGoalInDomain
} from "../domain/goal.service";


export const GoalsContext = React.createContext({
	goals: [],
	addOneshot: (name,description,exp,rewards,date)=>{},
	addRoutine : (name,description,exp,rewards,date) => {},
	completeGoal: (goalId) => {},
	skipGoal: (goalId) => {},
	postponeGoal: (goalId) => {},
	lastCompletion: null,
	dismissCompletion: () => {}
})


const GoalsProvider = (props) => {

	let [goals, setGoals] = useState([
		new GoalsBuilder()
			.name("Task 1")
			.description("My first Task")
			.date(new Date())
			.exp(25)
			.checked(false)
			.goalType(GoalConstants.ONESHOTS)
			.build(),
		new GoalsBuilder()
			.name("Routine 1")
			.description("My first Routine")
			.cron("* * 1/14 * *")
			.exp(DEFAULT_GOAL_EXPERIENCE)
			.checked(false)
			.goalType(GoalConstants.ROUTINES)
			.build()
	]);
	let [lastCompletion, setLastCompletion] = useState(null);

	let addOneshot =  (name,description,exp,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.date(date)
			.exp(exp || DEFAULT_GOAL_EXPERIENCE)
			.goalType(GoalConstants.ONESHOTS)
			.rewards(rewards)
			.build()
		setGoals(currentGoals => currentGoals.concat(goal))
	}


	let addRoutine =  (name,description,exp,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.date(date)
			.exp(exp || DEFAULT_GOAL_EXPERIENCE)
			.goalType(GoalConstants.ROUTINES)
			.rewards(rewards)
			.build()
		setGoals(currentGoals => currentGoals.concat(goal))
	}

	let completeGoal = (goalId) => {
		setGoals(currentGoals => {
			const result = completeGoalInDomain(currentGoals, goalId);
			setLastCompletion(result.completion);
			return result.goals;
		});
	}

	let skipGoal = (goalId) => {
		setGoals(currentGoals => skipGoalInDomain(currentGoals, goalId).goals);
	}

	let postponeGoal = (goalId) => {
		const remindAt = new Date(Date.now() + 60 * 60 * 1000);
		setGoals(currentGoals => postponeGoalInDomain(currentGoals, goalId, remindAt).goals);
	}

	return <GoalsContext.Provider value={{
		goals: goals,
		addOneshot:addOneshot,
		addRoutine:addRoutine,
		completeGoal:completeGoal,
		skipGoal:skipGoal,
		postponeGoal:postponeGoal,
		lastCompletion:lastCompletion,
		dismissCompletion:() => setLastCompletion(null),
	}}>
		{props.children}
	</GoalsContext.Provider>
}

export default GoalsProvider; 




