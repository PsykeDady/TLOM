import React, { useMemo, useState } from "react";
import { installActivityPackage } from "../domain/activity-package.service";
import { activityPackageCatalog } from "../packages/activity-package-catalog";

export const ActivityPackagesContext = React.createContext({
	catalog: [],
	installations: [],
	content: {currencies: [], campaigns: [], missions: [], goals: [], stores: [], storeItems: []},
	installPackage: () => {},
	isInstalled: () => false
});

function ActivityPackagesProvider(props) {
	const [installedResults, setInstalledResults] = useState(() => [installActivityPackage({packageDefinition: activityPackageCatalog[0], installations: [], installedAt: new Date().toISOString()})]);
	const installations = installedResults.map(result => result.installation);
	const content = useMemo(() => ["currencies", "campaigns", "missions", "goals", "stores", "storeItems"].reduce((allContent, name) => ({...allContent, [name]: installedResults.flatMap(result => result[name] || [])}), {}), [installedResults]);
	const value = useMemo(() => {
		const isInstalled = packageDefinition => installations.some(installation => installation.packageId === packageDefinition.id && installation.packageVersion === packageDefinition.version);
		const installPackage = packageId => {
			const packageDefinition = activityPackageCatalog.find(item => item.id === packageId);
			if (!packageDefinition || isInstalled(packageDefinition)) return;
			const result = installActivityPackage({packageDefinition, installations, installedAt: new Date().toISOString()});
			if (result.installation) setInstalledResults(currentResults => currentResults.concat(result));
		};
		return {catalog: activityPackageCatalog, installations, content, installPackage, isInstalled};
	}, [installations, content]);

	return <ActivityPackagesContext.Provider value={value}>{props.children}</ActivityPackagesContext.Provider>;
}

export default ActivityPackagesProvider;