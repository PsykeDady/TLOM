function HomeHeaderTabComponent (props) {
	return <span 
		style={{
			borderRight:props.borderRight?"1px var(--bg-color) solid":"none",
			fontSize:"calc(2vw + 2.1vh - 100%)"
		}}
		className={`text-center primary-bg ${props.icon} ${props.className??""}`}
	>
		<br/><br/>{props.name.toUpperCase()}
	</span>
}
export default HomeHeaderTabComponent;