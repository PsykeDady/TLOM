import { useState,useEffect } from 'react';
import './App.css';

import HeaderComponent from './components/header.component';
import HomeComponent from './components/Home/home.component';
import LoginComponent from './components/login.component';
import StatusConstants from './constants/status.const';
import SessionService from './services/session.service';

function App() {
	 /** STATES */
	let [session, setSession]= useState(SessionService.session);
	let [currentPage,setCurrentPage] =useState()


	useEffect(() => {
		let cpage;

		switch(session.status){
			case StatusConstants.STATUS_INITIAL : cpage=(<LoginComponent onLogin={()=>{
				console.log("SessionService.session",SessionService.session)
				setSession(SessionService.session)
				console.log("session=",session)
				console.log("session status=",session.status)
				setCurrentPage(cpage);
			}} />);  break; 
			case StatusConstants.STATUS_HOME: cpage=<HomeComponent/> ;break;
			default : cpage= <></>;
		}

		console.log("session=",session)
		console.log("session status=",session.status)
		 
	}, [session])
	

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
