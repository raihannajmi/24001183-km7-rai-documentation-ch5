'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        name: faker.name.fullName(),
        age: faker.datatype.number({ min: 18, max: 80 }),
        address: faker.address.streetAddress(),
        role: faker.helpers.arrayElement(['user', 'admin']),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
