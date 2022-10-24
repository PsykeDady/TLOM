import { useState } from "react";
import HomeHeaderComponent from "./HomeHeader/home.header.component";
import TabsConstants from "../../constants/tabs.const"
import SelectedTabComponent from "./HomeTabs/selected.tab.component";


const tabs = [ 
	{name:TabsConstants.ROUTINES,icon:"fa fa-calendar-check-o"},
	{name:TabsConstants.CAMPAIGNS,icon:"psd psd-dragon"},
	{name:TabsConstants.MISSIONS,icon:"fa fa-binoculars"},
	{name:TabsConstants.ONESHOTS,icon:"fa fa-check-square-o"},
	{name:TabsConstants.USER,icon:"fa fa-user"}
]


function HomeComponent () {

	let [selected,setSelected] = useState(tabs.length-1)

	let selectedTab = tabs.filter((v,i) => {
			return selected===i
	}).map(v=><SelectedTabComponent
				selected={v.name}	
		/>)[0]

	return <div className="container rounded primary-bg text-fg pb-3 pt-1">

		<div className="row">
			<div className="col-12">
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
}
export default HomeComponent; 