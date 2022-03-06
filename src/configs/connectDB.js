const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejsbasic', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Không in log ra màn hình console
});

// Test thử kết nối đến DB chưa.
let connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connectDB();
//

module.exports = sequelize;













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