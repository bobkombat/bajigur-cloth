'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionHistory.belongsTo(models.TransactionInvoice);
      TransactionHistory.belongsTo(models.Product);
    }
  };
  TransactionHistory.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    TransactionInvoiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "TransactionInvoice id is empty"
        }
      }
    },
    ProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "product id is empty"
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "product id is empty"
        },
        isInt: {
          args: true,
          msg: "quantity must be an integer"
        }
      }
    },
    total_amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });

  TransactionHistory.addHook('beforeCreate', (transaction, option) => {
    transaction.id = uuidv4();
  });

  TransactionHistory.addHook('beforeBulkCreate', (transaction, option) => {
    if (transaction.length > 0) {
      transaction = transaction.map(x => x.id = uuidv4());
    } else {
      transaction.id = uuidv4();
    }
  });

  return TransactionHistory;
};
