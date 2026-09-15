import React, { useState } from "react";
import GoalConstants from "../constants/goal.const";
import { GoalsBuilder } from "../models/goal.model";
import { createGoalOccurrence, GoalOccurrenceStatus } from "../models/goal-occurrence.model";
import { createCurrency } from "../models/currency.model";
import { createCurrencyReward, createExperienceReward } from "../models/reward.model";
import {
	completeGoalOccurrenceAndAccountRewards,
	getWalletBalances
} from "../domain/economy.service";
import {
	postponeGoalOccurrence as postponeGoalOccurrenceInDomain,
	skipGoalOccurrence as skipGoalOccurrenceInDomain
} from "../domain/goal.service";


export const GoalsContext = React.createContext({
	goals: [],
	occurrences: [],
	ledgerEntries: [],
	currencies: [],
	walletBalances: [],
	addOneshot: (name,description,rewards,date)=>{},
	addRoutine : (name,description,rewards,date) => {},
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
			.rewards([createCurrencyReward("study-token", 1)])
			.goalType(GoalConstants.ONESHOTS)
			.build(),
		new GoalsBuilder()
			.name("Configure workspace")
			.description("Set up the local development environment.")
			.scheduledAt(new Date())
			.rewards([createExperienceReward(10), createCurrencyReward("healthy-coin", 1)])
			.goalType(GoalConstants.ONESHOTS)
			.build(),
		new GoalsBuilder()
			.name("Complete security training")
			.description("Finish the required security training.")
			.scheduledAt(new Date())
			.rewards([])
			.goalType(GoalConstants.ONESHOTS)
			.build(),
		new GoalsBuilder()
			.name("Daily project review")
			.description("Spend time reviewing the next project step.")
			.schedule({type: "CRON", expression: "* * 1/14 * *"})
			.rewards([createCurrencyReward("healthy-coin", 1)])
			.goalType(GoalConstants.ROUTINES)
			.build()
	]);
	const [activityState, setActivityState] = useState({occurrences: [
		createGoalOccurrence({id: "read-docs-once", goalId: 0, occursAt: new Date(), status: GoalOccurrenceStatus.COMPLETED}),
		createGoalOccurrence({id: "configure-workspace-once", goalId: 1, occursAt: new Date()}),
		createGoalOccurrence({id: "security-training-once", goalId: 2, occursAt: new Date()}),
		createGoalOccurrence({id: "project-review-today", goalId: 3, occursAt: new Date()})
	], ledgerEntries: []});
	const currencies = [
		createCurrency({id: "healthy-coin", name: "Healthy Coin", symbol: "HC"}),
		createCurrency({id: "study-token", name: "Study Token", symbol: "ST"})
	];
	let [lastCompletion, setLastCompletion] = useState(null);

	let addOneshot =  (name,description,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.scheduledAt(date)
			.goalType(GoalConstants.ONESHOTS)
			.rewards(Array.isArray(rewards) ? rewards : [])
			.build()
		setGoals(currentGoals => currentGoals.concat(goal));
		setActivityState(currentState => ({
			...currentState,
			occurrences: currentState.occurrences.concat(createGoalOccurrence({goalId: goal.id, occursAt: date}))
		}));
	}


	let addRoutine =  (name,description,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.scheduledAt(date)
			.goalType(GoalConstants.ROUTINES)
			.rewards(Array.isArray(rewards) ? rewards : [])
			.build()
		setGoals(currentGoals => currentGoals.concat(goal));
		setActivityState(currentState => ({
			...currentState,
			occurrences: currentState.occurrences.concat(createGoalOccurrence({goalId: goal.id, occursAt: date}))
		}));
	}

	let completeGoalOccurrence = (occurrenceId) => {
		setActivityState(currentState => {
			const result = completeGoalOccurrenceAndAccountRewards({
				goals,
				occurrences: currentState.occurrences,
				ledgerEntries: currentState.ledgerEntries,
				occurrenceId,
				createdAt: new Date().toISOString()
			});
			setLastCompletion(result.completion);
			return {occurrences: result.occurrences, ledgerEntries: result.ledgerEntries};
		});
	}

	let skipGoalOccurrence = (occurrenceId) => {
		setActivityState(currentState => ({
			...currentState,
			occurrences: skipGoalOccurrenceInDomain(currentState.occurrences, occurrenceId).occurrences
		}));
	}

	let postponeGoalOccurrence = (occurrenceId) => {
		const remindAt = new Date(Date.now() + 60 * 60 * 1000);
		setActivityState(currentState => ({
			...currentState,
			occurrences: postponeGoalOccurrenceInDomain(currentState.occurrences, occurrenceId, remindAt).occurrences
		}));
	}

	return <GoalsContext.Provider value={{
		goals: goals,
		occurrences: activityState.occurrences,
		ledgerEntries: activityState.ledgerEntries,
		currencies: currencies,
		walletBalances: getWalletBalances(activityState.ledgerEntries, currencies),
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




