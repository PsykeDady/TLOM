function HomeHeaderTabComponent (props) {
	return <span 
		style={{
			borderRight:props.borderRight?"1px var(--bg-color) solid":"none",
			cursor:"pointer"
		}}
		className={`text-center primary-bg notselectable xs-text ${props.icon} ${props.className??""} ${props.selected?"accent-fg":""}`}
		onClick={()=>{props.onSelect(props.index)}}
	>
		<br/><br/>{props.name.toUpperCase()}
	</span>
}
export default HomeHeaderTabComponent;