import { useState } from "react";
import UserService from "../../../services/users.service";


function UserTabComponent (props){

	let [user,setUser] = useState(UserService.user)

	return <div className="container">
		<div className="row">
			<div className="col-6">
				<img src="" alt="" className="img-fluid rounded" />
			</div>
			<div className="col-6">
				Username: {user.name}
				<br />
				Job: 

			</div>
		</div>
	</div>;
} export default UserTabComponent