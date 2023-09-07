'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordUser = await bcrypt.hash('example123', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 9999,
          name: 'User Klontong',
          username: 'user',
          email: 'user@example.com',
          password: passwordUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
