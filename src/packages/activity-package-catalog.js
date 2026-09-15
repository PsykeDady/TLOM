import GoalConstants from "../constants/goal.const";
import { MissionProgressStrategy } from "../models/mission.model";
import { RewardType } from "../models/reward.model";
import { createActivityPackage } from "../models/activity-package.model";

export const activityPackageCatalog = [
	createActivityPackage({
		id: "healthy-lifestyle", version: "1", name: "Healthy Lifestyle", description: "Build a steady daily rhythm.",
		currencies: [{id: "healthy-coin", name: "Healthy Coin", symbol: "HC"}],
		goals: [
			{id: "daily-walk", name: "Daily walk", description: "Take a walk and keep the rhythm.", goalType: GoalConstants.ROUTINES, schedule: {type: "CRON", expression: "0 9 * * *"}, rewards: [{id: "walk-hc", type: RewardType.CURRENCY, currencyId: "healthy-coin", amount: 1}]},
			{id: "healthy-plan", name: "Plan a healthy meal", description: "Prepare one mindful meal.", goalType: GoalConstants.ONESHOTS, scheduledAt: null, rewards: [{id: "plan-xp", type: RewardType.EXPERIENCE, amount: 10}]}
		],
		missions: [{id: "daily-health", name: "Daily health", description: "Complete the first healthy choices.", goalIds: ["healthy-plan"], progressStrategy: MissionProgressStrategy.ACTIVITY_COMPLETION}],
		campaigns: [{id: "healthy-life", name: "Healthy Lifestyle", description: "A long-term journey for your everyday wellbeing.", missionIds: ["daily-health"]}],
		stores: [{id: "healthy-store", name: "Healthy Store", itemIds: ["pizza"]}],
		storeItems: [{id: "pizza", name: "Pizza", description: "A personal reward after building your rhythm.", price: {currencyId: "healthy-coin", amount: 1}}]
	}),
	createActivityPackage({
		id: "study-focus", version: "1", name: "Study Focus", description: "Make time for deliberate learning.",
		currencies: [{id: "study-token", name: "Study Token", symbol: "ST"}],
		goals: [{id: "study-session", name: "Focused study session", description: "Read, practice, or learn without distractions.", goalType: GoalConstants.ONESHOTS, scheduledAt: null, rewards: [{id: "study-st", type: RewardType.CURRENCY, currencyId: "study-token", amount: 1}, {id: "study-xp", type: RewardType.EXPERIENCE, amount: 10}]}],
		missions: [{id: "study-session", name: "Study session", description: "Complete your first focused session.", goalIds: ["study-session"], progressStrategy: MissionProgressStrategy.ACTIVITY_COMPLETION}],
		campaigns: [{id: "study-campaign", name: "Study Focus", description: "A campaign for purposeful learning.", missionIds: ["study-session"]}],
		stores: [{id: "study-rewards", name: "Study Rewards", itemIds: ["gaming-break"]}],
		storeItems: [{id: "gaming-break", name: "Gaming break", description: "Take a well-earned short break.", price: {currencyId: "study-token", amount: 1}}]
	})
];