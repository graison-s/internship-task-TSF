import {Component} from "react";
import {Link} from "react-router-dom";

class Transactions extends Component{

  constructor(props) {
    super(props);
    this.state = {
      transactions : [],
      isLoading : false,
      isError : false
    }
  }
  async  componentDidMount() {
    this.setState({isLoading:true});
    const url = "http://localhost:9000/showtransfers";
    const response = await fetch(url);
    if (response.ok) {
      const transactions = await response.json();
      this.setState({ transactions : transactions , isLoading : false});
    }
    else {
      this.setState({isError : true, isLoading : false})
    }
  }

  renderTableHeader = () => {
    return Object.keys(this.state.transactions[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>);
  }

  renderTableRows = () => {
    return this.state.transactions.map(transaction =>{
      return(
        <tr key={transaction.id}>
          <td>{transaction.id}</td>
          <td>{transaction.sender}</td>
          <td>{transaction.receiver}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.date_of_transfer}</td>
        </tr>
      );
    });
  }

  render(){
    const {transactions, isLoading, isError} = this.state;
    if(isLoading) {
      return <div>Loading...</div>
    }
    if(isError) {
      return <div>Error</div>
    }
    return transactions.length > 0 ? (
      <div>
      <div><Link to="/">back to home</Link></div>
      <div class="container ">
        <table class="table table-dark table-hover">
          <thead class="thead-dark">
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      </div>
      </div>
      ) : (
      <div>
        <Link to="/">back to home</Link>
        <div>No Transactions data</div>
      </div>
      );
  }
}

export default Transactions;