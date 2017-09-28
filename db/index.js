const repos = require('./repos');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bank_api_test',
});

const db = {
  user: new repos.User(connection, 'users'),
  customer: new repos.Customer(connection, 'customers'),
  transaction: new repos.Transaction(connection, 'transactions'),
};

module.exports = db;
