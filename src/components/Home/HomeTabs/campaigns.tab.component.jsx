import { useContext } from "react";
import { CampaignsContext } from "../../../context/campaigns.context";
import { GoalsContext } from "../../../context/goals.context";
import { getCampaignProgress } from "../../../domain/campaign.service";

function CampaignsTabComponent () {
	const {campaigns} = useContext(CampaignsContext);
	const {goals} = useContext(GoalsContext);

	return <div className="container pt-3">
		<div className="row">
			<div className="col-12">
				<h2 className="h4">Campaigns</h2>
				{campaigns.map(campaign => {
					const progress = getCampaignProgress(campaign, goals);

					return <article key={campaign.id} className="dark-primary-bg border border-secondary rounded p-3 mb-3">
						<div className="d-flex justify-content-between align-items-start gap-2">
							<div>
								<h3 className="h5 mb-1">{campaign.name}</h3>
								<p className="mb-2 light-accent-fg">{campaign.description}</p>
							</div>
							<span className="badge accent-bg background-fg">Personal</span>
						</div>
						<div className="progress" role="progressbar" aria-label={`${campaign.name} progress`} aria-valuenow={progress.percentage} aria-valuemin="0" aria-valuemax="100">
							<div className="progress-bar accent-bg background-fg" style={{width: `${progress.percentage}%`}}>{progress.percentage}%</div>
						</div>
						<p className="small inactive-fg mb-0 mt-2">{progress.completedGoals} of {progress.totalGoals} goals completed</p>
					</article>;
				})}
			</div>
		</div>
	</div>;
}

export default CampaignsTabComponent;