function HomeHeaderTabComponent (props) {
	return <span 
		style={{
			borderRight:props.borderRight?"1px var(--bg-color) solid":"none",
			cursor:"pointer"
		}}
		className={`text-center notselectable s-text ${props.icon} ${props.className??""} ${props.selected?"light-accent-fg primary-bg":"dark-primary-bg inactive-fg"}`}
		onClick={()=>{props.onSelect(props.index)}}
	>
		<br/><br/>{props.name.toUpperCase()}
	</span>
}
export default HomeHeaderTabComponent;