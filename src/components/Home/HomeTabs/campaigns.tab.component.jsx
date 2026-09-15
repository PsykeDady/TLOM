import { useContext } from "react";
import { CampaignsContext } from "../../../context/campaigns.context";
import { GoalsContext } from "../../../context/goals.context";
import { MissionsContext } from "../../../context/missions.context";
import { getCampaignMissions } from "../../../domain/campaign.service";
import { getMissionProgress } from "../../../domain/mission.service";
import { ProgressDisplay } from "../../GameShell/game-ui.component";

function CampaignsTabComponent () {
	const {campaigns} = useContext(CampaignsContext);
	const {missions} = useContext(MissionsContext);
	const {goals, occurrences} = useContext(GoalsContext);

	return <section className="game-page"><p className="section-eyebrow">Long journeys</p><h2 className="game-page__heading">Campaigns</h2><p className="game-page__intro">Each campaign is a larger story shaped by its missions.</p>
				{campaigns.map(campaign => {
					const campaignMissions = getCampaignMissions(campaign, missions);

					return <article key={campaign.id} className="game-card"><div className="split-line"><h3>{campaign.name}</h3><span className="type-badge">Personal</span></div><p className="muted">{campaign.description}</p><p className="section-eyebrow">{campaignMissions.length} missions</p>{campaignMissions.map(mission => { const progress = getMissionProgress(mission, goals, occurrences); return <div className="campaign-mission" key={mission.id}><strong>{mission.name}</strong><ProgressDisplay progress={progress} label={`${mission.name} progress`} /></div>; })}
					</article>;
				})}
	</section>;
}

export default CampaignsTabComponent;