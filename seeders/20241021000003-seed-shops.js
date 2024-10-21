'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const shops = [];
    const users = await queryInterface.sequelize.query(`SELECT id FROM users;`);
    const userIds = users[0];

    for (let i = 0; i < 100; i++) {
      shops.push({
        name: faker.company.name(),
        userId: userIds[i % userIds.length].id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('shops', shops, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shops', null, {});
  }
};
