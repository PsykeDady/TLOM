import React, { useMemo, useState } from "react";
import { CampaignOwnership, createCampaign } from "../models/campaign.model";

export const CampaignsContext = React.createContext({
	campaigns: []
});

function CampaignsProvider(props) {
	const [campaigns] = useState([
		createCampaign({
			id: "first-steps",
			name: "First Steps",
			description: "Build a consistent daily rhythm.",
			ownership: CampaignOwnership.PERSONAL,
			missionIds: ["complete-onboarding", "publish-first-project"]
		})
	]);

	const value = useMemo(() => ({campaigns}), [campaigns]);

	return <CampaignsContext.Provider value={value}>
		{props.children}
	</CampaignsContext.Provider>;
}

export default CampaignsProvider;