'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('Wishlists', {
       fields: ['ProductId'],
       type: 'foreign key',
       name: 'custom_fkey_ProductId',
       references: { //Required field
        table: 'Products',
        field: 'id'
       },
       onDelete: 'cascade',
       onUpdate: 'cascade'
     })
     await queryInterface.addConstraint('Wishlists', {
       fields: ['UserId'],
       type: 'foreign key',
       name: 'custom_fkey_UserId',
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
     await queryInterface.removeConstraint('Wishlists', "custom_fkey_ProductId");
     await queryInterface.removeConstraint('Wishlists', "custom_fkey_UserId");
  }
};
