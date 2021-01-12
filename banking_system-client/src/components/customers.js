import {Component} from "react";
import {Link} from "react-router-dom";

class Customers extends Component{

  constructor(props){
    super(props);
    this.state = {
      cus_id : 100,
      customers : [],
      isLoading : false,
      isError : false
    }
  }

  async  componentDidMount() {
    this.setState({isLoading:true});
    const url = "http://localhost:9000/showcustomers";
    const response = await fetch(url);
    if (response.ok) {
      const users = await response.json();
      this.setState({ customers : users , isLoading : false});
    }
    else {
      this.setState({isError : true, isLoading : false})
    }
  }

  renderTableHeader = () => {
    return Object.keys(this.state.customers[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>);
  }

  renderTableRows = () => {
    return this.state.customers.map(customer =>{
      return(
        <tr key={customer.id}>
          <Link to='/customer' onClick={() => this.props.clickHandler(customer.id,customer.name,customer.current_balance)}><td>{customer.id}</td></Link>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.current_balance}</td>
        </tr>
      );
    });
  }

  render(){
    const {customers, isLoading, isError} = this.state;
    if(isLoading) {
      return <div>Loading...</div>
    }
    if(isError) {
      return <div>Error</div>
    }
    return customers.length > 0 ? (
      <div>
        <div><Link to="/">back to home</Link></div>
        <div class="container">
          <table class='table table-dark table-hover'>
            <thead class='thead-dark'>
              <tr>{this.renderTableHeader()}</tr>
            </thead>
            <tbody>
              {this.renderTableRows()}
            </tbody>
          </table>
        </div>
      </div>
      ) : (
      <div>No Customers data</div>
      );
  }
}

export default Customers;