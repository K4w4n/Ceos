const config = require('dotenv').config();
const mysql = require('mysql2');
exports.connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password
});
exports.mysql = mysql;