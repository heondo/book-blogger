const mysql = require('mysql');
const mysqlCreds = require('./mysql_creds');

const db = mysql.createConnection(mysqlCreds);

module.exports = db;
