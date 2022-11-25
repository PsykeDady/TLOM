import { useContext, useEffect, useState } from 'react';
import './App.css';

import HeaderComponent from './components/header.component';
import HomeComponent from './components/Home/home.component';
import LoginComponent from './components/login.component';
import StatusConstants from './constants/status.const';
import SessionProvider, { SessionContext } from './context/session.context';

function AppProvided () {
	/** STATES */
	let sessionContext = useContext(SessionContext); 
	let [currentPage,setCurrentPage] =useState()


	useEffect(() => {
		let cpage;

		switch(sessionContext.status){
			case StatusConstants.STATUS_INITIAL : cpage=(<LoginComponent/>);  break; 
			case StatusConstants.STATUS_HOME: cpage=<HomeComponent/> ;break;
			default : cpage= <></>;
		}

		setCurrentPage(cpage)
		 
	}, [sessionContext.status])
	

	/** EVENTS */

	/** COMPONENTS */
	let header = <HeaderComponent />;

	return (
		<div
			style={{height:"100vh"}} 
			className='background-bg'>
			{header}

			<br/>
			{sessionContext.logged() ? currentPage : <LoginComponent/>}
		</div>
	);
} 

function App() {
	return <SessionProvider>
		<AppProvided/>
	</SessionProvider>
}

export default App;
