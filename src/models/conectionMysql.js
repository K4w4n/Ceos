const config = require('dotenv').config();
const mysql = require('mysql2');
exports.connection = mysql.createConnection({
    host: process.env.host || 'localhost',
    user: process.env.user || 'app',
    database: process.env.database || 'db_ceos',
    password: process.env.password || '1RP9n3yCi&Y8jpdD2PLf@g@%^LKu5tVcQSL&4ASeSOpt%4UoHe'
});
exports.mysql = mysql;