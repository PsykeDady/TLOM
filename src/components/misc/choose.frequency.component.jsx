function ChooseFrequencyComponent (props) {



	return <div className="container">
		<div className="row">
			<div className="col-1 p-1">
				<button className="btn" onClick={props.onBack}>
					&larr; 
				</button>
			</div>
			<div className="col-10">
				{props["daily"]} <br/>
				{props["monthly"]} <br/>
				{props["weekly"]}
			</div>
		</div>

	</div>
}

export default ChooseFrequencyComponent;