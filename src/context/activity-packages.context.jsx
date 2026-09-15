import React, { useMemo, useState } from "react";
import { installActivityPackage, resolveActivityPackage } from "../domain/activity-package.service";
import { createPackageInstallationConfiguration } from "../models/activity-package.model";
import { activityPackageCatalog } from "../packages/activity-package-catalog";

export const ActivityPackagesContext = React.createContext({
	catalog: [],
	installations: [],
	content: {currencies: [], campaigns: [], missions: [], goals: [], stores: [], storeItems: []},
	installPackage: () => ({errors: []}),
	isInstalled: () => false
});

function ActivityPackagesProvider(props) {
	const [installedResults, setInstalledResults] = useState(() => {
		const packageDefinition = activityPackageCatalog[0];
		const resolved = resolveActivityPackage(packageDefinition);
		return [installActivityPackage({packageDefinition: resolved.packageDefinition, installations: [], installedAt: new Date().toISOString(), configuration: resolved.configuration})];
	});
	const installations = installedResults.map(result => result.installation);
	const content = useMemo(() => ["currencies", "campaigns", "missions", "goals", "stores", "storeItems"].reduce((allContent, name) => ({...allContent, [name]: installedResults.flatMap(result => result[name] || [])}), {}), [installedResults]);
	const value = useMemo(() => {
		const isInstalled = packageDefinition => installations.some(installation => installation.packageId === packageDefinition.id && installation.packageVersion === packageDefinition.version);
		const installPackage = (packageId, values = {}) => {
			const packageDefinition = activityPackageCatalog.find(item => item.id === packageId);
			if (!packageDefinition) return {installation: null, errors: ["package:not-found"]};
			const configuration = createPackageInstallationConfiguration({packageId, packageVersion: packageDefinition.version, values});
			const resolved = resolveActivityPackage(packageDefinition, configuration);
			if (!resolved.packageDefinition) return {installation: null, errors: resolved.errors};
			const result = installActivityPackage({packageDefinition: resolved.packageDefinition, installations, installedAt: new Date().toISOString(), configuration: resolved.configuration});
			if (result.installation && !result.alreadyInstalled) setInstalledResults(currentResults => currentResults.concat(result));
			return result;
		};
		return {catalog: activityPackageCatalog, installations, content, installPackage, isInstalled};
	}, [installations, content]);

	return <ActivityPackagesContext.Provider value={value}>{props.children}</ActivityPackagesContext.Provider>;
}

export default ActivityPackagesProvider;