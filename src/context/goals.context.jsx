import React, { useContext, useEffect, useMemo, useState } from "react";
import GoalConstants from "../constants/goal.const";
import { GoalsBuilder } from "../models/goal.model";
import { createGoalOccurrence } from "../models/goal-occurrence.model";
import {
	completeGoalOccurrenceAndAccountRewards,
	getWalletBalances
} from "../domain/economy.service";
import { purchaseStoreItem as purchaseStoreItemInDomain } from "../domain/store.service";
import {
	postponeGoalOccurrence as postponeGoalOccurrenceInDomain,
	skipGoalOccurrence as skipGoalOccurrenceInDomain
} from "../domain/goal.service";
import { ActivityPackagesContext } from "./activity-packages.context";


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
	const {content} = useContext(ActivityPackagesContext);
	const [customGoals, setCustomGoals] = useState([]);
	const goals = useMemo(() => content.goals.concat(customGoals), [content.goals, customGoals]);
	const [domainState, setDomainState] = useState({occurrences: [], ledgerEntries: [], purchases: []});
	const {currencies, stores, storeItems} = content;
	let [lastCompletion, setLastCompletion] = useState(null);
	let [lastPurchase, setLastPurchase] = useState(null);

	useEffect(() => {
		setDomainState(currentState => {
			const existingGoalIds = new Set(currentState.occurrences.map(occurrence => occurrence.goalId));
			const generatedOccurrences = content.goals
				.filter(goal => !existingGoalIds.has(goal.id))
				.map(goal => createGoalOccurrence({id: `${goal.id}::occurrence::initial`, goalId: goal.id, occursAt: new Date()}));
			return generatedOccurrences.length === 0 ? currentState : {...currentState, occurrences: currentState.occurrences.concat(generatedOccurrences)};
		});
	}, [content.goals]);

	let addOneshot =  (name,description,rewards,date) => {
		let goal =  new GoalsBuilder()
			.name(name)
			.description(description)
			.scheduledAt(date)
			.goalType(GoalConstants.ONESHOTS)
			.rewards(Array.isArray(rewards) ? rewards : [])
			.build()
		setCustomGoals(currentGoals => currentGoals.concat(goal));
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
		setCustomGoals(currentGoals => currentGoals.concat(goal));
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




