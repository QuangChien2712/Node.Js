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