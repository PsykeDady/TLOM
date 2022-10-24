function HomeHeaderTabComponent (props) {
	return <span 
		style={{
			borderRight:props.borderRight?"1px var(--bg-color) solid":"none",
			fontSize:"calc(100vw/50)",
			cursor:"pointer"
		}}
		className={`text-center primary-bg notselectable ${props.icon} ${props.className??""} ${props.selected?"accent-fg":""}`}
		onClick={()=>{props.onSelect(props.index)}}
	>
		<br/><br/>{props.name.toUpperCase()}
	</span>
}
export default HomeHeaderTabComponent;