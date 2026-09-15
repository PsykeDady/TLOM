import { useContext } from "react";
import { CampaignsContext } from "../../../context/campaigns.context";
import { GoalsContext } from "../../../context/goals.context";
import { MissionsContext } from "../../../context/missions.context";
import { getCampaignMissions } from "../../../domain/campaign.service";
import { getMissionProgress } from "../../../domain/mission.service";

function CampaignsTabComponent () {
	const {campaigns} = useContext(CampaignsContext);
	const {missions} = useContext(MissionsContext);
	const {goals, occurrences} = useContext(GoalsContext);

	return <div className="container pt-3">
		<div className="row">
			<div className="col-12">
				<h2 className="h4">Campaigns</h2>
				{campaigns.map(campaign => {
					const campaignMissions = getCampaignMissions(campaign, missions);

					return <article key={campaign.id} className="dark-primary-bg border border-secondary rounded p-3 mb-3">
						<div className="d-flex justify-content-between align-items-start gap-2">
							<div>
								<h3 className="h5 mb-1">{campaign.name}</h3>
								<p className="mb-2 light-accent-fg">{campaign.description}</p>
							</div>
							<span className="badge accent-bg background-fg">Personal</span>
						</div>
						<p className="small inactive-fg mb-2">{campaignMissions.length} missions</p>
						<ul className="mb-0 ps-3">
							{campaignMissions.map(mission => {
								const progress = getMissionProgress(mission, goals, occurrences);
								return <li key={mission.id}>{mission.name}: {progress.percentage}%</li>;
							})}
						</ul>
					</article>;
				})}
			</div>
		</div>
	</div>;
}

export default CampaignsTabComponent;