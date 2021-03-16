const mysql = require('mysql2/promise');

const dotenv = require('dotenv');
dotenv.config();

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB,
    MYSQL_POOL
} = process.env;

const pool = mysql.createPool({
    host : MYSQL_HOST,
    user : MYSQL_USER,
    password : MYSQL_PASSWORD,
    database : MYSQL_DB,
    connectionLimit : MYSQL_POOL
});

module.exports = pool;