import React, { useState } from "react";
import GoalConstants from "../constants/goal.const";
import { GoalsBuilder } from "../models/goal.model";
import { createGoalOccurrence, GoalOccurrenceStatus } from "../models/goal-occurrence.model";
import { createCurrency } from "../models/currency.model";
import { createCurrencyReward, createExperienceReward } from "../models/reward.model";
import { createStore, createStoreItem } from "../models/store.model";
import {
	completeGoalOccurrenceAndAccountRewards,
	getWalletBalances
} from "../domain/economy.service";
import { purchaseStoreItem as purchaseStoreItemInDomain } from "../domain/store.service";
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
	stores: [],
	storeItems: [],
	purchases: [],
	addOneshot: (name,description,rewards,date)=>{},
	addRoutine : (name,description,rewards,date) => {},
	completeGoalOccurrence: (occurrenceId) => {},
	skipGoalOccurrence: (occurrenceId) => {},
	postponeGoalOccurrence: (occurrenceId) => {},
	purchaseStoreItem: (storeId, storeItemId) => {},
	lastCompletion: null,
	lastPurchase: null,
	dismissCompletion: () => {}
})


const GoalsProvider = (props) => {

	let [goals, setGoals] = useState(() => [
		new GoalsBuilder()
			.name("Read documentation")
			.description("Review the project documentation.")
			.scheduledAt(new Date())
			.rewards([createCurrencyReward({id: "read-docs-study", currencyId: "study-token", amount: 1})])
			.goalType(GoalConstants.ONESHOTS)
			.build(),
		new GoalsBuilder()
			.name("Configure workspace")
			.description("Set up the local development environment.")
			.scheduledAt(new Date())
			.rewards([createExperienceReward({id: "configure-xp", amount: 10}), createCurrencyReward({id: "configure-coin", currencyId: "healthy-coin", amount: 1})])
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
			.rewards([createCurrencyReward({id: "review-coin", currencyId: "healthy-coin", amount: 1})])
			.goalType(GoalConstants.ROUTINES)
			.build()
	].map((goal, index) => ({...goal, id: ["read-docs", "configure-workspace", "security-training", "project-review"][index]})));
	const [domainState, setDomainState] = useState({occurrences: [
		createGoalOccurrence({id: "read-docs-once", goalId: "read-docs", occursAt: new Date(), status: GoalOccurrenceStatus.COMPLETED}),
		createGoalOccurrence({id: "configure-workspace-once", goalId: "configure-workspace", occursAt: new Date()}),
		createGoalOccurrence({id: "security-training-once", goalId: "security-training", occursAt: new Date()}),
		createGoalOccurrence({id: "project-review-today", goalId: "project-review", occursAt: new Date()})
	], ledgerEntries: [], purchases: []});
	const currencies = [
		createCurrency({id: "healthy-coin", name: "Healthy Coin", symbol: "HC"}),
		createCurrency({id: "study-token", name: "Study Token", symbol: "ST"})
	];
	const stores = [createStore({id: "healthy-store", name: "Healthy Store", itemIds: ["pizza"]})];
	const storeItems = [createStoreItem({id: "pizza", name: "Pizza", description: "A personal reward after your project review.", price: {currencyId: "healthy-coin", amount: 1}})];
	let [lastCompletion, setLastCompletion] = useState(null);
	let [lastPurchase, setLastPurchase] = useState(null);

	let addOneshot =  (name,description,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.scheduledAt(date)
			.goalType(GoalConstants.ONESHOTS)
			.rewards(Array.isArray(rewards) ? rewards : [])
			.build()
		setGoals(currentGoals => currentGoals.concat(goal));
		setDomainState(currentState => ({
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
		setDomainState(currentState => ({
			...currentState,
			occurrences: currentState.occurrences.concat(createGoalOccurrence({goalId: goal.id, occursAt: date}))
		}));
	}

	let completeGoalOccurrence = (occurrenceId) => {
		setDomainState(currentState => {
			const result = completeGoalOccurrenceAndAccountRewards({
				goals,
				occurrences: currentState.occurrences,
				ledgerEntries: currentState.ledgerEntries,
				occurrenceId,
				createdAt: new Date().toISOString()
			});
			setLastCompletion(result.completion);
			return {...currentState, occurrences: result.occurrences, ledgerEntries: result.ledgerEntries};
		});
	}

	let skipGoalOccurrence = (occurrenceId) => {
		setDomainState(currentState => ({
			...currentState,
			occurrences: skipGoalOccurrenceInDomain(currentState.occurrences, occurrenceId).occurrences
		}));
	}

	let postponeGoalOccurrence = (occurrenceId) => {
		const remindAt = new Date(Date.now() + 60 * 60 * 1000);
		setDomainState(currentState => ({
			...currentState,
			occurrences: postponeGoalOccurrenceInDomain(currentState.occurrences, occurrenceId, remindAt).occurrences
		}));
	}

	let purchaseStoreItem = (storeId, storeItemId) => {
		setDomainState(currentState => {
			const result = purchaseStoreItemInDomain({
				stores,
				storeItems,
				purchases: currentState.purchases,
				ledgerEntries: currentState.ledgerEntries,
				storeId,
				storeItemId,
				requestId: `purchase-${Date.now()}`,
				createdAt: new Date().toISOString()
			});
			setLastPurchase(result);
			return {...currentState, purchases: result.purchases, ledgerEntries: result.ledgerEntries};
		});
	}

	return <GoalsContext.Provider value={{
		goals: goals,
		occurrences: domainState.occurrences,
		ledgerEntries: domainState.ledgerEntries,
		currencies: currencies,
		walletBalances: getWalletBalances(domainState.ledgerEntries, currencies),
		stores: stores,
		storeItems: storeItems,
		purchases: domainState.purchases,
		addOneshot:addOneshot,
		addRoutine:addRoutine,
		completeGoalOccurrence:completeGoalOccurrence,
		skipGoalOccurrence:skipGoalOccurrence,
		postponeGoalOccurrence:postponeGoalOccurrence,
		purchaseStoreItem:purchaseStoreItem,
		lastCompletion:lastCompletion,
		lastPurchase:lastPurchase,
		dismissCompletion:() => setLastCompletion(null),
	}}>
		{props.children}
	</GoalsContext.Provider>
}

export default GoalsProvider; 




