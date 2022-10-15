import HomeHeaderTabComponent from "./HomeHeaderTab/home.header.tab.component";

const tabs = [ 
	{name:"Routines",icon:"fa fa-calendar-check"},
	{name:"Campain",icon:"fa fa-swords"},
	{name:"Mission",icon:"fa fa-binoculars"},
	{name:"Oneshot",icon:"fa fa-square-check"},
	{name:"User",icon:"fa fa-user"}
]

function HomeHeaderComponent () {
	
	let tabComponents = tabs.length!=0 && tabs.map((v,i)=>{
		return <HomeHeaderTabComponent
			name={v.name}
			icon={v.icon}
			className="p-3"
			borderRight={i<tabs.length-1?true:false}
		/>
	})
	
	return <div 
		style={{
			borderBottom: "1px black solid"
		}}>

		{tabComponents}
			
	</div>
}

export default HomeHeaderComponent;