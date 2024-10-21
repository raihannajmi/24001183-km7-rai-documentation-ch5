'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const auths = [];
    const users = await queryInterface.sequelize.query(`SELECT id FROM users;`);
    const userIds = users[0];

    for (let i = 0; i < 100; i++) {
      const password = "admin123";
      const hashedPassword = await bcrypt.hash(password, 10);

      auths.push({
        email: faker.internet.email(),
        password: hashedPassword,
        confirmPassword: hashedPassword,
        userId: userIds[i % userIds.length].id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('auths', auths, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auths', null, {});
  }
};
