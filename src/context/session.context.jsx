import React,{ useState } from "react";
import StatusConstants from "../constants/status.const";

export const SessionContext = React.createContext({
		firstTime :true,
		loggedToken:"",
		loggedUser:"",
		login: (username, psk) => {}, 
		logout: () => {},
		logged:false,
		status:StatusConstants.STATUS_INITIAL, /* last application page */
});


function SessionProvider (props) {

	let [user,setUser] = useState (""); 
	let [token,setToken] = useState (""); 
	let [status, setStatus] = useState(StatusConstants.STATUS_INITIAL) 

	let login = (username, psk) => {
		setUser(username)
		setToken("T"+Math.floor(Math.random()*1000)) // tmp
		console.log("username", username)
		console.log("psk", psk)
		setStatus(StatusConstants.STATUS_HOME)
	}
	
	let logout = () => {
		setUser("")
		setToken("")
		setStatus(StatusConstants.STATUS_INITIAL)
	}

	let logged = () => {
		return user!=="" || token !== ""; 
	}

	return <SessionContext.Provider value={{
			firstTime :true,
			loggedToken:token,
			loggedUser:user,
			login: login, 
			logout: logout,
			logged:logged,
			status:status, /* last application page */
		}}>
		{props.children}
	</SessionContext.Provider>; 
} export default SessionProvider; 