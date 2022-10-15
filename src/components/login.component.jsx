import React, { useState } from "react";


function LoginComponent (props) {

	// set mode registration
	let [registration, flagRegistration] = useState(false); 

	let lemail = registration &&  (
		<label className="col-10 offset-1 mt-2 small inactive-fg">
				<span className="ms-2">
					{"Email"}
				</span>
	</label>); //only in registration mode
	let iemail = registration &&  ( 
		<div className="col-10 offset-1 mt-1"> 
			<input 
			className="form-control"
			type={"text"} 
			placeholder={"insert email here..."}
		/>
	</div>); //only in registration mode

	return <div className="container rounded primary-bg pb-3 pt-1">
		<div className="row">
			<div className="col-12 text-center text-fg">
				<h2>{"Login/Registration"}</h2>
			</div>
		</div>
		<div className="row">
			<div className="col-10 offset-1">
				<hr className="text-fg"/>
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
					className="form-control"
					type={"text"} 
					placeholder={"insert username here..."}
				/>
			</div>

			{lemail}
			{iemail}

			<label className="col-10 offset-1 mt-2 small inactive-fg">
				<span className="ms-2">{"Password"}</span>
			</label>
			<div className="col-10 offset-1">
				<input 
					className="form-control"
					type={"password"} 
					placeholder={"insert password here..."}
				/>
			</div>
		</form>
		<div className="row mt-5 mb-2">
			<div className="col-12">
				<button className="btn btn-success col-10 offset-1 fw-bolder">
					{registration ? "Signup" : "Login"}
				</button>
			</div>
			<div className="col-12 mt-2">
				<button className="col-10 offset-1 btn btn-primary fw-bolder" 
					onClick={()=>flagRegistration(!registration)}
					>
					{registration? "Already Registered?" : "Are you new? Register"}
				</button>
			</div>
			<div className="col-12 mt-3">
				<button className="btn btn-secondary col-10 offset-1 fw-bolder">
					<small>
						{registration ? "Reset fields" : "Forgot password"}
					</small>
				</button>
			</div>
		</div>
	</div>
} export default LoginComponent; 