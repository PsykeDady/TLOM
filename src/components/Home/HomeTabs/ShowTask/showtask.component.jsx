import { dateFormattingTool } from "../../../../utils/formatting.utils";

const ShowTaskComponent = (props) => {
	const formatting_date="yyyy/mm/dd hh:mm"
	return <>
		<table className="d-none d-sm-table table mt-2 table">
			<thead><tr className="text-fg text-center fw-bold">
					<th>
						<span className="fa fa-check-square">
						&nbsp; 
						</span>
					</th>
					<th>Name</th>
					<th>Description</th>
					<th>Date</th>
					<th>
						<span className="fa fa-pencil-square">
								&nbsp; 
						</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{props.oneshots.map(v=>
					{
						let date=dateFormattingTool(v.date,formatting_date);
						return <tr key={v.id} className="text-fg text-center">
							<td>
								<button className="btn fa fa-check text-bg background-fg"></button>
							</td>
							<td>
								{v.name}
							</td>
							<td>
								{v.description}
							</td>
							<td>
								{date}
							</td>
							<td>
								<button className="btn fa fa-pencil btn-warning">
								</button>
							</td>
						</tr>
					}
				)}
			</tbody>
		</table>
		<div className="container d-sm-none mt-3">
			{props.oneshots.map(v=> {
				let date=dateFormattingTool(v.date,formatting_date);
				return <div className="row rounded border border-secondary dark-primary-bg p-1 mb-2">
					<div className="col-10 m-0 p-0">
						<div className="container">
							<div className="row">
								<h4 className="col-12">{v.name}</h4>
							</div>
							<div className="row">
								<span className="col-12 light-accent-fg small">
									{v.description==""?"-":v.description}
								</span>
							</div>
							<div className="row">
								<div className="col-12">
									<small className=" inactive-fg xs-text">
										{date}
									</small>
								</div>
							</div>
						</div>
					</div>
					<div className="col-2 p-2">
						
						<button className="col-12 btn background-fg fa fa-check mb-2" />

						<button className="col-12 btn btn-warning
						fa fa-pencil"/>
					</div>
				</div>
			})}
		</div>
	</>;
};
export default ShowTaskComponent; 