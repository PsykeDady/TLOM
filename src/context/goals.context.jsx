import React, { useState } from "react";
import GoalConstants from "../constants/goal.const";
import { GoalsBuilder } from "../models/goal.model";
import { createGoalOccurrence, GoalOccurrenceStatus } from "../models/goal-occurrence.model";
import {
	completeGoalOccurrence as completeGoalOccurrenceInDomain,
	postponeGoalOccurrence as postponeGoalOccurrenceInDomain,
	skipGoalOccurrence as skipGoalOccurrenceInDomain
} from "../domain/goal.service";


export const GoalsContext = React.createContext({
	goals: [],
	occurrences: [],
	addOneshot: (name,description,exp,rewards,date)=>{},
	addRoutine : (name,description,exp,rewards,date) => {},
	completeGoalOccurrence: (occurrenceId) => {},
	skipGoalOccurrence: (occurrenceId) => {},
	postponeGoalOccurrence: (occurrenceId) => {},
	lastCompletion: null,
	dismissCompletion: () => {}
})


const GoalsProvider = (props) => {

	let [goals, setGoals] = useState([
		new GoalsBuilder()
			.name("Read documentation")
			.description("Review the project documentation.")
			.scheduledAt(new Date())
			.exp(0)
			.goalType(GoalConstants.ONESHOTS)
			.build(),
		new GoalsBuilder()
			.name("Configure workspace")
			.description("Set up the local development environment.")
			.scheduledAt(new Date())
			.exp(0)
			.goalType(GoalConstants.ONESHOTS)
			.build(),
		new GoalsBuilder()
			.name("Complete security training")
			.description("Finish the required security training.")
			.scheduledAt(new Date())
			.exp(0)
			.goalType(GoalConstants.ONESHOTS)
			.build(),
		new GoalsBuilder()
			.name("Daily project review")
			.description("Spend time reviewing the next project step.")
			.schedule({type: "CRON", expression: "* * 1/14 * *"})
			.exp(0)
			.goalType(GoalConstants.ROUTINES)
			.build()
	]);
	let [occurrences, setOccurrences] = useState([
		createGoalOccurrence({id: "read-docs-once", goalId: 0, occursAt: new Date(), status: GoalOccurrenceStatus.COMPLETED}),
		createGoalOccurrence({id: "configure-workspace-once", goalId: 1, occursAt: new Date()}),
		createGoalOccurrence({id: "security-training-once", goalId: 2, occursAt: new Date()}),
		createGoalOccurrence({id: "project-review-today", goalId: 3, occursAt: new Date()})
	]);
	let [lastCompletion, setLastCompletion] = useState(null);

	let addOneshot =  (name,description,exp,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.scheduledAt(date)
			.exp(exp)
			.goalType(GoalConstants.ONESHOTS)
			.rewards(rewards)
			.build()
		setGoals(currentGoals => currentGoals.concat(goal));
		setOccurrences(currentOccurrences => currentOccurrences.concat(
			createGoalOccurrence({goalId: goal.id, occursAt: date})
		));
	}


	let addRoutine =  (name,description,exp,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.scheduledAt(date)
			.exp(exp)
			.goalType(GoalConstants.ROUTINES)
			.rewards(rewards)
			.build()
		setGoals(currentGoals => currentGoals.concat(goal));
		setOccurrences(currentOccurrences => currentOccurrences.concat(
			createGoalOccurrence({goalId: goal.id, occursAt: date})
		));
	}

	let completeGoalOccurrence = (occurrenceId) => {
		setOccurrences(currentOccurrences => {
			const result = completeGoalOccurrenceInDomain(goals, currentOccurrences, occurrenceId);
			setLastCompletion(result.completion);
			return result.occurrences;
		});
	}

	let skipGoalOccurrence = (occurrenceId) => {
		setOccurrences(currentOccurrences => skipGoalOccurrenceInDomain(currentOccurrences, occurrenceId).occurrences);
	}

	let postponeGoalOccurrence = (occurrenceId) => {
		const remindAt = new Date(Date.now() + 60 * 60 * 1000);
		setOccurrences(currentOccurrences => postponeGoalOccurrenceInDomain(currentOccurrences, occurrenceId, remindAt).occurrences);
	}

	return <GoalsContext.Provider value={{
		goals: goals,
		occurrences: occurrences,
		addOneshot:addOneshot,
		addRoutine:addRoutine,
		completeGoalOccurrence:completeGoalOccurrence,
		skipGoalOccurrence:skipGoalOccurrence,
		postponeGoalOccurrence:postponeGoalOccurrence,
		lastCompletion:lastCompletion,
		dismissCompletion:() => setLastCompletion(null),
	}}>
		{props.children}
	</GoalsContext.Provider>
}

export default GoalsProvider; 




