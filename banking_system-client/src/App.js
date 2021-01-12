/*
The front end is developed using react.js and styled using bootstrap.
This file App.js renders the different components in the front end.
*/

import {Component} from "react";
import './App.css';
import {Route, BrowserRouter as Router,Switch} from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/main';
import Customers from './components/customers';
import Customer from './components/customer';
import Transactions from './components/transactions';
import Transfer from './components/transfer';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      selectedCustomer : {
        id : null,
        name : null,
        balance : null
      }
    }
    this.selectCustomer = this.selectCustomer.bind(this);
  }

  selectCustomer =  (customerId,customerName,current_balance)  => {
    this.setState({selectedCustomer : {id : customerId,name : customerName,balance : current_balance}});
  }

  render(){
    return (
      <div class="App">
        <div class='content'>
          <Header/>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/customers" component={() => <Customers clickHandler={this.selectCustomer}/>}/>
              <Route path="/customer" component={() => <Customer customerId={this.state.selectedCustomer.id}/>}/>
              <Route path="/transactions" component={Transactions}/>
              <Route path="/transfer" component={() =><Transfer customer={this.state.selectedCustomer}/>}/>
            </Switch>
          </Router>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
