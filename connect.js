const mysql2=require('mysql2/promise');
const { DB_PASS } = require('./config');
const db=mysql2.createPool({
    host:'localhost',
    user:'root',
    database:'JOB',
    password:DB_PASS,
    waitForConnections:true
});
module.exports=db;
