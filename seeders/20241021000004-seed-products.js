'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];
    const shops = await queryInterface.sequelize.query(`SELECT id FROM shops;`);
    const shopIds = shops[0];

    for (let i = 0; i < 100; i++) {
      products.push({
        name: faker.commerce.productName(),
        imageUrl: faker.image.imageUrl(),
        stock: faker.datatype.number({ min: 1, max: 100 }),
        price: faker.commerce.price(),
        productId: shopIds[i % shopIds.length].id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
