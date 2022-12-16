
/**
 * 
 * @param {Date} date the date 
 * @param {"y"|"M"|"d"|"h"|"m"|"s"} datesymbol 
 * @param {number} n 
 * @returns {string} value of date 
 */
 function dateSymbolFormatting (date, datesymbol, n){
	let adding = ""

	switch(datesymbol){
		case "y": adding=""+date.getFullYear() ; break;
		case "M": adding=""+date.getMonth() ; break;
		case "d": adding=""+date.getDay() ; break;
		case "h": adding=""+date.getHours() ; break;
		case "m": adding=""+date.getMinutes() ; break;
		case "s": adding=""+date.getSeconds() ; break;
		default : ; 
	}
	while(adding.length<n){
		adding='0'+adding;
	}
	if (adding.length>n) {
		adding=adding.substring(adding.length-n,adding.length)
	}

	return adding;
}

/**
 * 
 * @param {Date} date 
 * @param {string} formatting 
 * @returns {string} date as string 
 */
export function dateFormattingTool (date, formatting ) {
	let output= "";
	let n = 0 ;
	let last = undefined

	if(!(date instanceof Date)) {
		return formatting+date
	}

	for(let j in formatting){
		let i = formatting.charAt(j);
		if (last && i===last) {
			n=n+1
			if(j==formatting.length-1){
				output+=dateSymbolFormatting(date,i,n)
			}
		} else {
			if(last) {
				output+=dateSymbolFormatting(date,last,n)
				last=undefined;
			}
			switch(i){
				case "y": case "M": case "d": case "h": 
				case "m": case "s": last=i; n=1; if(j==formatting.length-1){
					output+=dateSymbolFormatting(date,i,n)
				} break;
				
				default: output+=i; 
			}
		}
	}
	return output; 
}
	