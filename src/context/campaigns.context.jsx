import React, { useState } from "react";
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
			goalIds: [0, 1]
		})
	]);

	return <CampaignsContext.Provider value={{campaigns}}>
		{props.children}
	</CampaignsContext.Provider>;
}

export default CampaignsProvider;