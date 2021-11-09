const mysql = require('mysql');

const dbcon = mysql.createPool({
    host: "203.234.62.111",
    user: "dsem_homepage",
    password: 'dsem_homepage',
    database: "homepage",
    connectionLimit: 10,
    debug: false,
    multipleStatements:true
});

module.exports=dbcon;