import { useState } from 'react';
import './App.css';

import HeaderComponent from './components/header.component';
import HomeComponent from './components/Home/home.component';
import LoginComponent from './components/login.component';
import StatusConstants from './constants/status.const';
import SessionModel from "./models/session.model"

function App() {
	 /** STATES */
	let [session, setSession ]= useState(new SessionModel());
	let [currentPage,setCurrentPage] =useState(()=>{
		let cpage = <div className='container'>

		</div>;
		switch(session.status){
			case StatusConstants.STATUS_INITIAL : cpage=(<LoginComponent />);  break; 
			case StatusConstants.STATUS_HOME: cpage=<HomeComponent/> ;break;

		}
		 
		return cpage;
	})

	/** EVENTS */

	/** COMPONENTS */
	let header = <HeaderComponent />;

	return (
		<div
			style={{height:"100vh"}} 
			className='background-bg'>
			{header}

			<br/>
			{currentPage}
		</div>
	);
}

export default App;
