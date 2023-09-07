'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 9999,
          name: 'Food',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9998,
          name: 'Beverage',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9997,
          name: 'Personal Care',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
