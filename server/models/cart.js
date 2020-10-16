'use strict';
const {v4: uuidv4} = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
    }
  };
  Cart.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "quantity is empty"
        },
        isInt: {
          args: true,
          msg: "quantity must be an integer"
        },
        isZero(value) {
          if (value < 1)
            throw new Error('quantity must be bigger than 0')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });

  Cart.addHook('beforeCreate', (cart, option) => {
    cart.id = uuidv4();
  })

  return Cart;
};
