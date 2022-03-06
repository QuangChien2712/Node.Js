'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [{
            firstName: 'David',
            lastName: 'Michael',
            email: 'example@example.com',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});

    }
};