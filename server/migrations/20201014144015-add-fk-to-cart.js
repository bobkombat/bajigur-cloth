'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('Carts', {
       fields: ['product_id'],
       type: 'foreign key',
       name: 'custom_fkey_product_id',
       references: { //Required field
        table: 'Products',
        field: 'id'
       },
       onDelete: 'cascade',
       onUpdate: 'cascade'
     })
     await queryInterface.addConstraint('Carts', {
       fields: ['user_id'],
       type: 'foreign key',
       name: 'custom_fkey_user_id',
       references: { //Required field
        table: 'Users',
        field: 'id'
       },
       onDelete: 'cascade',
       onUpdate: 'cascade'
     })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('Carts', "custom_fkey_product_id");
     await queryInterface.removeConstraint('Carts', "custom_fkey_user_id");
  }
};
