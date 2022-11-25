import { SessionContext } from "../../../context/session.context";
import { UserContext } from "../../../context/users.context";
import { useContext } from "react";
import { RewardContext } from "../../../context/reward.context";


function UserTabComponent (props){

	let sessionContext = useContext(SessionContext);
	let userContext = useContext (UserContext);
	let rewardContext = useContext (RewardContext);

	let stats = [
		["Username", `${sessionContext.loggedUser}`,"fa fa-user"],
		["Job",`${userContext.job}`,"fa fa-suitcase"],
		["Life",`${userContext.lifepoint}/${userContext.hpmax}`,"fa fa-heartbeat"],
		["livello", `${userContext.lvl}`,"fa fa-level-up"],
		["Exp", `${userContext.experience}/100000`,"fa fa-bar-chart"],
		["Monxel", `${rewardContext.monxel}`,"fa fa-diamond"],
	]

	return <div className="container">
		<div className="row">

			<div className="col-5 text-center mt-auto mb-auto">
				<img src={userContext.avatar} className="img-fluid"/>
			</div>
			
			<div className="col-7 mt-2">
					<div className="container">
						{stats.map((v,i) =>  <div key={i} className="row">
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
	</div>;
} export default UserTabComponent