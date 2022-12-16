import { LittleJSonH } from "littlejsonh";

export let sId=0;

class Goal {
	id=sId++;
	name=""
	description=""
	goalType=""
	checked=false; 
	rewards=[]
	exp=0
	date=new Date()
	cron=null;
}
export default Goal;

/**
 * A Builder for Goals
 */
export class GoalsBuilder {
	_name=""
	_description=""
	_goalType=""
	_checked=false; 
	_rewards=[]
	_exp=0
	_date=new Date()
	_cron=null;

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
	checked(checked) {
		this._checked=checked;
		return this;
	}
	rewards(rewards) {
		this._rewards=rewards;
		return this;
	}
	exp(exp) {
		this._exp=exp;
		return this;
	}
	date(date) {
		this._date=date;
		return this;
	}
	cron(cron) {
		this._cron=new LittleJSonH(cron)
		this._date=this._cron.human;
		return this;
	}

	build() {
		let goal = new Goal(); 
		goal.name=this._name; 
		goal.description=this._description
		goal.goalType=this._goalType
		goal.checked=this._checked
		goal.rewards=this._rewards
		goal.exp=this._exp
		goal.date=this._date
		goal.cron=this._cron

		return goal; 
	}

}
