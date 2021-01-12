import React from 'react';
import {Link} from "react-router-dom";
const Home = () => {
	return (
		<div class='container'>
			<div class='row'>
				<div class='col-6 bg-info'>
			        <Link to="/customers"><button type='button' class='btn btn-light'>View Customers</button></Link>
			    </div>
			    <div class='col-6 bg-success'>
			        <Link to="/transactions"><button type='button' class='btn btn-light'>View Transaction history</button></Link>
		        </div>
	        </div>
		</div>
		);
}

export default Home;