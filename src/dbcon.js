const mysql = require('mysql');

const dbcon = mysql.createPool({
    host: "203.234.62.144",
    user: "root",
    password: '144dsem',
    database: "homepage",
    connectionLimit: 10,
    debug: false,
    multipleStatements:true
});

module.exports=dbcon;