import StatusConstants from "../constants/status.const"

class SessionModel {
	firstTime =true;
	loggedToken=null;
	loggedUser=null;  
	status=StatusConstants.STATUS_INITIAL; /* last application page */

	constructor(){
		this.firstTime =true;
		this.loggedToken=null;
		this.loggedUser=null;  
		this.status=StatusConstants.STATUS_INITIAL; 
	}
}
export default SessionModel; 