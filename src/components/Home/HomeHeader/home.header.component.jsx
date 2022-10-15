import HomeHeaderTabComponent from "./HomeHeaderTab/home.header.tab.component";

const tabs = [ 
	{name:"Routines",icon:"fa fa-calendar-check-o"},
	{name:"Campain",icon:"psd psd-dragon"},
	{name:"Mission",icon:"fa fa-binoculars"},
	{name:"Oneshot",icon:"fa fa-check-square-o"},
	{name:"User",icon:"fa fa-user"}
]

function HomeHeaderComponent () {
	
	let tabComponents = tabs.length!==0 && tabs.map((v,i)=>{
		return <HomeHeaderTabComponent
			name={v.name}
			icon={v.icon}
			className="p-3 col"
			borderRight={i<tabs.length-1?true:false}
		/>
	})
	
	return <div 
		style={{
			borderBottom: "1px black solid"
		}}>
			<div className="container">
				<div className="row">
					{tabComponents}
				</div>
			</div>
	</div>
}

export default HomeHeaderComponent;