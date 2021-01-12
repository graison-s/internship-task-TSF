/*
This is the serverside code made using node.js and express.js
*/

const http = require('http');
const express = require('express');
const mysql = require('mysql');
var date = require('node-datetime');
var cors = require('cors');

//connecting to the database.
const db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'password',
	database : 'banking_system'
});

db.connect((err) => {
	if(err){
		console.log(err);
	}
	else
		console.log('Mysql Connected');
});

const app = express();

app.use(cors());

//making different api endpoints.
app.get('/',(req,res) =>{
	res.send('connected to the server');
})
app.get('/showcustomers',(req,res) => {
	let sql = 'select * from customers';
	db.query(sql, (err,result) => {
		if(err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	})
})
app.get('/showcustomers/:customerid',(req,res) => {
	let sql = 'select * from customers where id='+req.params.customerid;
	db.query(sql, (err,result) => {
		if(err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	})
})
app.get('/showtransfers',(req,res) => {
	let sql = 'select transfers.id,c1.name as sender,c2.name as receiver,amount,date_format(date_of_transfer,"%d/%m/%Y") as date_of_transfer from transfers,customers as c1,customers as c2 where transfers.sender=c1.id and transfers.receiver=c2.id order by date_of_transfer desc,id desc';
	db.query(sql, (err,result) => {
		if(err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	})
})
app.get('/transfer/:id1/:id2/:amount',(req,res) => {
	let sql1 = 'update customers set current_balance = current_balance - '+req.params.amount+' where id='+req.params.id1;
	let sql2 = 'update customers set current_balance = current_balance + '+req.params.amount+' where id='+req.params.id2;
	var dt = date.create().format('Y/m/d');
	let sql3 = 'insert into transfers (sender,receiver,amount,date_of_transfer) values('+req.params.id1+','+req.params.id2+','+req.params.amount+',"'+dt+'")';
	db.query(sql1, (err,result) => {
		if(err)
			throw(err);
	})
	db.query(sql2);
	db.query(sql3);
	console.log('transaction successful');
	res.send('transaction successful');
})

//starting server on the port 9000.
app.listen('9000',() =>{
	console.log('Server started on port 9000');
});
