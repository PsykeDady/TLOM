import React, { useMemo, useState } from "react";
import { createMission, MissionProgressStrategy } from "../models/mission.model";

export const MissionsContext = React.createContext({
	missions: []
});

function MissionsProvider(props) {
	const [missions] = useState([
		createMission({
			id: "complete-onboarding",
			name: "Complete onboarding",
			description: "Finish the first steps for your workspace.",
			goalIds: [0, 1, 2],
			progressStrategy: MissionProgressStrategy.ACTIVITY_COMPLETION
		}),
		createMission({
			id: "publish-first-project",
			name: "Publish your first project",
			description: "A project outcome tracked independently from your daily support routine.",
			goalIds: [3],
			progressStrategy: MissionProgressStrategy.MANUAL,
			progress: {current: 1, target: 4}
		})
	]);

	const value = useMemo(() => ({missions}), [missions]);

	return <MissionsContext.Provider value={value}>
		{props.children}
	</MissionsContext.Provider>;
}

export default MissionsProvider;