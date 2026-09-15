let nextGoalId=0;

class Goal {
	id=nextGoalId++;
	name=""
	description=""
	goalType=""
	rewards=[]
	scheduledAt=null
	schedule=null;
}
export default Goal;

/**
 * A Builder for Goals
 */
export class GoalsBuilder {
	_name=""
	_description=""
	_goalType=""
	_rewards=[]
	_scheduledAt=null
	_schedule=null;

	name(name) {
		this._name= name;
		return this;
	}
	
	description(description) {
		this._description=description;
		return this;
	}
	goalType(goalType) {
		this._goalType=goalType;
		return this;
	}
	rewards(rewards) {
		this._rewards=rewards;
		return this;
	}
	scheduledAt(scheduledAt) {
		this._scheduledAt=scheduledAt;
		return this;
	}
	schedule(schedule) {
		this._schedule=schedule;
		return this;
	}

	build() {
		let goal = new Goal(); 
		goal.name=this._name; 
		goal.description=this._description
		goal.goalType=this._goalType
		goal.rewards=this._rewards
		goal.scheduledAt=this._scheduledAt
		goal.schedule=this._schedule

		return goal; 
	}

}
