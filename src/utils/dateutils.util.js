export const WEEKDAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
export function generateDays (monthn = -1) {

	const calSize= 35; //settings to 35 in order to make space for padding 

	let date = new Date();

	let month = new Date(date.getFullYear(),monthn<0|| monthn>11?date.getMonth():month,1);

	let days = new Array(calSize).fill(0,0,calSize); 


	for(let i=0; i<days.length; i++){
		let j= i%WEEKDAYS.length;
		if((month.getDay()+6)%7==j && month.getMonth() == date.getMonth()) {
			days[i]=month.getDate()
			month=new Date(month.getFullYear(),month.getMonth(),month.getDate()+1)
		} else {
			days[i]=0
		}

	}
	return days;
}
