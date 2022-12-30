
/**
 * 
 * @param {any[]} arr array
 * @param {number} nele number of element in each new subarray 
 */
export function splitArray (arr,nele) {
	let narr=[];
	
	let subarr=[];
	for (let i in arr) {
		if(i%nele==0) {
			if(i!=0) narr.push(subarr)
			subarr=[];
		}
		subarr.push(arr[i])
	}
	narr.push(subarr)
	return narr; 
}