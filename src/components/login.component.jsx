import React, { useContext, useState } from "react";
import { SessionContext } from "../context/session.context";

const defaultValues = {
	name:"",
	psk:"",
	email:""
}


function LoginComponent (props) {

	let sessionContext = useContext(SessionContext)

	// set mode registration
	let [registration, flagRegistration] = useState(false); 

	let [credential, setCredential ] = useState({...defaultValues}) 

	let onChangeName = (event) => {
		setCredential({
			...credential,
			name: event.target.value
		})
	}

	let onChangeEmail = (event) => {
		setCredential({
			...credential,
			email: event.target.value
		})
	}


	let onChangePassword = (event) => {
		setCredential({
			...credential,
			psk: event.target.value
		})
	}

	let onFlagRegistration = () => {
		setCredential({
			...credential,
			email: ""
		})
		flagRegistration(!registration)
	}

	let onResetOrForgot = () =>  {
		if(registration){
			setCredential({...defaultValues})
		} else {
			alert("Feature non implementata"); 
			setCredential({...defaultValues})
		}
	}

	let onSignupOrLogin = () => {
		if(registration){
			alert("registration not ready");
			flagRegistration(false); 
		} else {
			sessionContext.login(credential.name, credential.psk)
		}
	}

	let keyHandling = (event) => {
		switch(event.type){
			case "keyup" : 
				
				break ;;  
			case "keydown" : 
				if(event.key === "Enter") {
					onSignupOrLogin();
				}
				break ;;
			default : break;; 
		}
	}

	//only in registration mode
	let email = registration &&  (<React.Fragment> 
			<label className="col-10 offset-1 mt-2 small inactive-fg">
					<span className="ms-2">
						{"Email"}
					</span>
			</label>
			<div className="col-10 offset-1 mt-1"> 
				<input 
				className="form-control smallinputtext"
				type={"text"} 
				placeholder={"insert email here..."}
				value={credential.email}
				onChange={onChangeEmail}
				/>
			</div>
		</React.Fragment>); 

	return <div className="container rounded primary-bg pb-3 pt-1">
		<div className="row">
			<div className="col-12 text-center foreground-fg">
				<h2>{"Login/Registration"}</h2>
			</div>
		</div>
		<div className="row">
			<div className="col-10 offset-1">
				<hr className="foreground-fg"/>
			</div>
		</div>
		<form className="row">
			<label className="col-10 offset-1 small inactive-fg">
				<span className="ms-2">
					{"Username"}
				</span>
			</label>
			<div className="col-10 offset-1 mt-1">
				<input 
					className="form-control smallinputtext"
					type={"text"} 
					placeholder={"insert username here..."}
					value={credential.name}
					onChange={onChangeName}
					onKeyDown={keyHandling}
				/>
			</div>

			{email}

			<label className="col-10 offset-1 mt-2 small inactive-fg">
				<span className="ms-2">{"Password"}</span>
			</label>
			<div className="col-10 offset-1">
				<input 
					className="form-control smallinputtext"
					type={"password"} 
					placeholder={"insert password here..."}
					autoComplete="suggest"
					value={credential.psk}
					onChange={onChangePassword}
					onKeyDown={keyHandling}
				/>
			</div>
		</form>
		<div className="row mt-5 mb-2">
			<div className="col-12">
				<button className="btn btn-success col-10 offset-1 fw-bolder" onClick={onSignupOrLogin}>
					{registration ? "Signup" : "Login"}
				</button>
			</div>
			<div className="col-12 mt-2">
				<button className="col-10 offset-1 btn btn-primary fw-bolder" 
					onClick={onFlagRegistration}
					>
					{registration? "Already Registered?" : "Are you new? Register"}
				</button>
			</div>
			<div className="col-12 mt-3">
				<button className="btn btn-secondary col-10 offset-1 fw-bolder" onClick={onResetOrForgot}>
					<small>
						{registration ? "Reset fields" : "Forgot password"}
					</small>
				</button>
			</div>
		</div>
	</div>
} export default LoginComponent; 