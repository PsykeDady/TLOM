import { useState } from "react";
import HomeHeaderComponent from "./HomeHeader/home.header.component";
import TabsConstants from "../../constants/tabs.const"
import SelectedTabComponent from "./HomeTabs/selected.tab.component";
import GoalsProvider from "../../context/goals.context";
import CampaignsProvider from "../../context/campaigns.context";
import MissionsProvider from "../../context/missions.context";


const tabs = [ 
	{name:TabsConstants.TODAY,icon:"fa fa-sun-o"},
	{name:TabsConstants.ONESHOTS,icon:"fa fa-check-square-o"},
	{name:TabsConstants.ROUTINES,icon:"fa fa-calendar-check-o"},
	{name:TabsConstants.MISSIONS,icon:"fa fa-binoculars"},
	{name:TabsConstants.CAMPAIGNS,icon:"psd psd-dragon"},
	{name:TabsConstants.STORE,icon:"fa fa-shopping-bag"},
	{name:TabsConstants.USER,icon:"fa fa-user"},
]


function HomeComponent () {

	let [selected,setSelected] = useState(0)

	let selectedTab = tabs.filter((_,i) => {
			return selected===i
	}).map(v=><SelectedTabComponent
				key={v.name}
				selected={v.name}
		/>)[0]

	return <GoalsProvider>
		<MissionsProvider>
		<CampaignsProvider>
		<div className="container rounded primary-bg foreground-fg pb-3">

			<div className="row">
				<div className="col-12 dark-primary-bg rounded-top p-0">
					<HomeHeaderComponent
						tabs={tabs}
						selected={selected}
						onSelect={setSelected}
					></HomeHeaderComponent>
				</div>
			</div>

			<div className="row">
				{selectedTab}
			</div>
		</div>
		</CampaignsProvider>
		</MissionsProvider>
	</GoalsProvider>
}
export default HomeComponent; 