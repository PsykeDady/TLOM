import TabsConstants from "../../../constants/tabs.const";
import RoutinesTabComponent from "./routines.tab.component";
import CampaignsTabComponent from "./campaigns.tab.component";
import MissionsTabComponent from "./missions.tab.component";
import OneshotsTabComponent from "./oneshots.tab.component";
import UserTabComponent from "./user.tab.component";


function SelectedTabComponent (props) {

	let selectedTab; 

	switch (props.selected){
		case TabsConstants.ROUTINES: selectedTab = <RoutinesTabComponent></RoutinesTabComponent>; break;
		case TabsConstants.CAMPAIGNS: selectedTab = <CampaignsTabComponent></CampaignsTabComponent>; break;
		case TabsConstants.MISSIONS: selectedTab = <MissionsTabComponent></MissionsTabComponent>; break;
		case TabsConstants.ONESHOTS: selectedTab = <OneshotsTabComponent></OneshotsTabComponent>; break;
		default : selectedTab = <UserTabComponent></UserTabComponent> ;
	}

	return selectedTab; 

} export default SelectedTabComponent;