const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('heroku_f4dbd9019809a1c', 'b8eb027d8b5b94', '3e833c10', {
    host: 'us-cdbr-east-06.cleardb.net',
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