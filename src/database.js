const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodejsbasic', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Kết nối thành công'));

module.exports = sequelize;