import {Component} from "react";
import {Link} from "react-router-dom";
import Select from 'react-select';

class Transfer extends Component{

	constructor(){
		super();
		this.state = {
			id1 : null,
			id2 : null,
			amount : null,
			success : false,
			options :[],
			amountError : '',
			selectError : ''
		};

		this.transferMoney = this.transferMoney.bind(this);
	}

	async  componentDidMount() {
		this.setState({id1:this.props.customer.id});
	    const url = "http://localhost:9000/showcustomers";
	    const response = await fetch(url);
	    if (response.ok) {
	      const users = await response.json();
	      users.map(user =>{
	      	this.state.options.push({
	      		value : user.id,
	      		label : user.name
	      	})
	      })
	    }
  	}

  	validate = () => {
  		let amountError = "";
  		let selectError = "";
  		if(!this.state.amount) {
  			amountError = "enter amount to transfer";
  		}
  		if(this.props.customer.balance < this.state.amount){
  			amountError = "customer has not sufficient balance";
  		}
  		if(!this.state.id2) {
  			selectError = "select one customer";
  		}
  		if(amountError || selectError){
  			this.setState({amountError,selectError});
  			return false;
  		}
  		return true;
  	}

  	handleSubmit = (event) => {
  		event.preventDefault();
  		const isValid = this.validate();
  		if (isValid) {
  			this.transferMoney();
  			this.setState({amountError: '',selectError: ''});
  		}
  	}

	transferMoney() {
		console.log('transferring money');
		const url = `http://localhost:9000/transfer/${this.state.id1}/${this.state.id2}/${this.state.amount}`;
    	fetch(url);
    	alert('Transaction Successful');
      	this.setState({success : true});
	}

	handleChangeAmount = (event) => {
		this.setState({amount:event.target.value});
	}
	render(){
		return(
		<div>
			<div><Link to="/customer">go back</Link></div>
			<h2>Transfer Money</h2>
			<form onSubmit={this.handleSubmit}>
				<div class='container form-group'>
					<div class = "row">
						<div class='col-2'>
							<label for="from" >From : </label>
						</div>
						<div class='col-8'> 
							<Select id="from" class = "form-control" options={this.state.options} defaultValue={{value : this.props.customer.id,label : this.props.customer.name}} onChange={(value) => {
							this.setState({id1:value.value})}} />
						</div>
					</div> 
					<div class = "row">
						<div class='col-2'>
							<label for="to" >To : </label>
						</div>
						<div class='col-8'> 
							<Select id="to" class="form-control" options={this.state.options} onChange={(value) => {
							this.setState({id2:value.value})}}/> 
							<div style={{fontSize : 12, color : 'red','text-align':'left'}} >{this.state.selectError}</div>
						</div>
					</div>
					<div class='row '>
						<div class='col-2'>
							<label for="amount" >Amount : </label>
						</div>
						<div class='col-8'>
							<input class='form-control' placeholder='Enter amount' type='text' onChange={this.handleChangeAmount} id="amount"/>
							<div style={{fontSize : 12, color : 'red','text-align':'left'}} >{this.state.amountError}</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-2'></div>
						<div class='col-2'>
							<button class='btn btn-primary' type='submit'>Transfer</button>
						</div>
						<div class='col-2'>
							<Link to="/customers"><button class='btn btn-info'>View Customers</button></Link>
						</div>
					</div>
				</div>
			</form>
		</div>

		);
	}

}


export default Transfer;