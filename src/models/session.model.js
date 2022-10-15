import StatusConstants from "../constants/status.const"

class SessionModel {
	firstTime =true;
	loggedToken=null;
	loggedUser=null;  
	status=StatusConstants.STATUS_HOME; /* last application page */

	constructor(){}
}
export default SessionModel; 