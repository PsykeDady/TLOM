function HomeHeaderTabComponent (props) {
	return <span 
		style={{borderRight:"1px var()"}}
		className={`primary-bg ${props.icon} ${props.className??""}`}
	>
		{props.name.toUpperCase()}
	</span>
}
export default HomeHeaderTabComponent;