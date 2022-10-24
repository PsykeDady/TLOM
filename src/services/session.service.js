import StatusConstants from "../constants/status.const";
import SessionModel from "../models/session.model";
import UserService from "./users.service";

class SessionService {
	static _session; 


	static get session() {
		if(!SessionService._session || SessionService._session === undefined){
			SessionService._session = new SessionModel()
		} 
		return SessionService._session; 
	}

	static login () {
		SessionService._session.firstTime = true;
		SessionService._session.loggedToken = new Date().getTime();
		SessionService._session.loggedUser=UserService.user;  
		SessionService._session.status=StatusConstants.STATUS_HOME;
	}

	static logout(){
		this._session = null; 
	}
}
export default SessionService