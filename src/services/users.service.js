import UserModel from "../models/user.model";
import SessionService from "./session.service";

class UserService {
	static _user; 
	static _logged;



	static  get user () {
		if(!UserService._user || UserService._user===undefined){
			UserService._user = new UserModel("","")
		}
		return UserService._user;
	}

	static get logged () {
		return UserService._logged;
	}

	static login(user, psk){
		UserService._logged=true;
		SessionService.login()
	}

	static register(user){
		UserService._user=user;
	}
}


export default UserService;