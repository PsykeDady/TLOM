import React, { useContext, useMemo } from "react";
import { ActivityPackagesContext } from "./activity-packages.context";

export const MissionsContext = React.createContext({
	missions: []
});

function MissionsProvider(props) {
	const {content} = useContext(ActivityPackagesContext);
	const {missions} = content;

	const value = useMemo(() => ({missions}), [missions]);

	return <MissionsContext.Provider value={value}>
		{props.children}
	</MissionsContext.Provider>;
}

export default MissionsProvider;