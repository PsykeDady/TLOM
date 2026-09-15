import React, { useContext, useMemo } from "react";
import { ActivityPackagesContext } from "./activity-packages.context";

export const CampaignsContext = React.createContext({
	campaigns: []
});

function CampaignsProvider(props) {
	const {content} = useContext(ActivityPackagesContext);
	const {campaigns} = content;

	const value = useMemo(() => ({campaigns}), [campaigns]);

	return <CampaignsContext.Provider value={value}>
		{props.children}
	</CampaignsContext.Provider>;
}

export default CampaignsProvider;