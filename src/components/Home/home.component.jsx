import { useState } from "react";
import TabsConstants from "../../constants/tabs.const"
import SelectedTabComponent from "./HomeTabs/selected.tab.component";
import GameShell from "../GameShell/game-shell.component";
import GoalsProvider from "../../context/goals.context";
import CampaignsProvider from "../../context/campaigns.context";
import MissionsProvider from "../../context/missions.context";


const tabs = [ 
	{name:TabsConstants.TODAY, label:"Today", symbol:"✦"},
	{name:TabsConstants.MISSIONS, label:"Missions", symbol:"◈"},
	{name:TabsConstants.CAMPAIGNS, label:"Campaigns", symbol:"⚑"},
	{name:TabsConstants.STORE, label:"Store", symbol:"◇"},
	{name:TabsConstants.USER, label:"Player", symbol:"●"},
]


function HomeComponent () {

	let [selected,setSelected] = useState(TabsConstants.TODAY)

	let selectedTab = <SelectedTabComponent selected={selected} onNavigate={setSelected} />;

	return <GoalsProvider>
		<MissionsProvider>
		<CampaignsProvider>
		<GameShell tabs={tabs} selected={tabs.findIndex(tab => tab.name === selected)} onSelect={index => setSelected(tabs[index].name)}>{selectedTab}</GameShell>
		</CampaignsProvider>
		</MissionsProvider>
	</GoalsProvider>
}
export default HomeComponent; 