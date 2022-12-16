import HomeHeaderTabComponent from "./HomeHeaderTab/home.header.tab.component";


function HomeHeaderComponent (props) {
	
	let tabComponents = props.tabs.length!==0 && props.tabs.map((v,i)=>{
		return <HomeHeaderTabComponent
			name={v.name}
			icon={v.icon}
			index={i}
			className={`p-1 p-md-3 col ${i==0?"rounded-top-left":i==props.tabs.length-1?"rounded-top-right":""}`}
			borderRight={i<props.tabs.length-1?true:false}
			selected={props.selected===i}
			onSelect={props.onSelect}
			key={i}
		/>
	})
	
	return <div className="container">
		<div className="row">
			{tabComponents}
		</div>
	</div>
}

export default HomeHeaderComponent;