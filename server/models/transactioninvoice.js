'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionInvoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TransactionInvoice.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "user id is empty"
        }
      }
    },
    total_amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionInvoice',
  });

  TransactionInvoice.addHook('beforeCreate', (transaction, option) => {
    transaction.id = uuidv4();
  });

  return TransactionInvoice;
};
