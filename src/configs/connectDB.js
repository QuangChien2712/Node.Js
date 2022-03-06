// export default connection;
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejsbasic",
    port: 3306,
    charset: "utf8mb4"
});


// connection.query(
//     'SELECT * FROM `users`',
//     function(err, results, fields) {
//         console.log("Checkout sucess");
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

module.exports = connection;
















// get the client
// const mysql = require('mysql2');
// import mysql from 'mysql2';

// // create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejsbasic'
// });

// // simple query
// connection.query(
//     'SELECT * FROM `users`',
//     function(err, results, fields) {
//         console.log("Checkout sucess");
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );


// connection.connect(err => {
//     if (!err) {
//         console.log("DB Connection Succeeded");
//     } else {
//         console.log("DB Connection Failed");
//     }
// });