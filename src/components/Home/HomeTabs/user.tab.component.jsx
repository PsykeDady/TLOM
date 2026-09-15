import { SessionContext } from "../../../context/session.context";
import { UserContext } from "../../../context/users.context";
import { useContext } from "react";
import { GoalsContext } from "../../../context/goals.context";


function UserTabComponent (props){

	let sessionContext = useContext(SessionContext);
	let userContext = useContext (UserContext);
	let goalsContext = useContext (GoalsContext);

	let stats = [
		["Username", `${sessionContext.loggedUser}`,"fa fa-user"],
		["Job",`${userContext.job}`,"fa fa-suitcase"],
		["Life",`${userContext.lifepoint}/${userContext.hpmax}`,"fa fa-heartbeat"],
		["Level", `${userContext.lvl}`,"fa fa-level-up"],
		["Exp", `${userContext.experience}/100000`,"fa fa-bar-chart"],
	]

	return <div className="container">
		<div className="row">

			<div className="col-5 text-center mt-auto mb-auto">
				<img src={userContext.avatar} className="img-fluid" alt="Player avatar"/>
			</div>
			
			<div className="col-7 mt-2">
					<div className="container">
						{stats.map(v =>  <div key={v[0]} className="row">
							<div className={`col-1 mt-auto mb-auto ${v[2]}`}></div>
							<div className="col-5 xs-text fw-bold align-self-center">{v[0]}</div>
							<div className="col-5 accent-fg text-center
							mt-auto
							mb-auto">
								{v[1]}
								
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-12">
				<h2 className="h5">Wallet</h2>
				{goalsContext.walletBalances.map(({currency, balance}) =>
					<div key={currency.id} className="d-flex justify-content-between border-bottom py-1">
						<span>{currency.name}</span>
						<span className="accent-fg">{balance} {currency.symbol}</span>
					</div>
				)}
			</div>
		</div>
	</div>;
} export default UserTabComponent