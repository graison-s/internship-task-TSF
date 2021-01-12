import {Component} from "react";
import {Link} from "react-router-dom";

class Customer extends Component{

  constructor(props){
    super(props);
    this.state = {
      customer : [],
      isLoading : false,
      isError : false
    }
  }

  async  componentDidMount() {
    this.setState({isLoading:true});
    const url = `http://localhost:9000/showcustomers/${this.props.customerId}`;
    const response = await fetch(url);
    if (response.ok) {
      const user = await response.json();
      this.setState({ customer : user , isLoading : false});
    }
    else {
      this.setState({isError : true, isLoading : false})
    }
  }

  renderCustomer = () => {
  	return this.state.customer.map(cus =>{
      return(
          <div class='card'>
            <div class='card-header'><h3>Customer Details</h3></div>
            <div class='card-body'>
            	<p class='card-title'><b>Customer Id : {cus.id}</b></p>
            	<p>Name : {cus.name}</p>
            	<p>Email : {cus.email}</p>
            	<p>Current Balance : {cus.current_balance}</p>
            </div>
            <div class='card-footer'>
              <Link to='/transfer'><button class='btn btn-primary'>Transfer Money</button></Link>
            </div>
          </div> 
      );
    });
  }

  render(){
  	if(this.state.isError){
  		return(<div>Error</div>);
  	}
  	return(
  	<div>
  	<div><Link to="/customers">go back</Link></div>
  	{this.renderCustomer()}
  	</div>
  	);
  }

}

export default Customer;