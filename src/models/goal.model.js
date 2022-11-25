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
}
export default Goal; 