import { useState } from "react";

const AlertComponent = (props) => {


	let [name,setName] = useState("")
	let [description,setDescription] = useState("")

	return <div className="">

		<div className="backdrop" onClick={()=>props.onBackdropClick()}></div>

		<div className="position-absolute translate-middle top-50 start-50 rounded primary-bg p-3 w-75">
			<div className="container">
				<div className="row">
					<div className="col">
						<legend className="h2 border-bottom border-1">{props.title??""}</legend>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<input 
							className="form-control smallinputtext"
							type="text"
							placeholder={"insert task name here..."}
							value={name}
							onChange={(event)=>setName(event.target.value)}
						/>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-12">
						<textarea
							className="form-control smallinputtext"
							rows={4}
							placeholder={"insert task description here..."}
							value={description}
							onChange={(event)=>setDescription(event.target.value)}
						/>
					</div>
				</div>
				<hr className="foreground-fg" />
				<div className="row">
					<div className="col-12 p-1">
						<button className="btn btn-success col-12"
						onClick={()=>props.onAddClick()}>
							Add
						</button>
					</div>
					<div className="col-12 p-1">
						<button className="btn btn-danger col-12"  onClick={()=>props.onBackdropClick()}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
}
export default AlertComponent;