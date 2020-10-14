'use strict';

const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "product name is empty"
        },
        notEmpty: {
          args: true,
          msg: "product name is empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "image url is empty"
        },
        notEmpty: {
          args: true,
          msg: "image url is empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "price is empty"
        },
        notEmpty: {
          args: true,
          msg: "price is empty"
        },
        isInt: {
          args: true,
          msg: "price must be an integer"
        },
        isZero(price) {
          if (price < 0)
            throw new Error("price cannot be less than 0");
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "stock is empty"
        },
        notEmpty: {
          args: true,
          msg: "stock is empty"
        },
        isInt: {
          args: true,
          msg: "stock must be an integer"
        },
        isZero(price) {
          if (price < 0)
            throw new Error("stock cannot be less than 0");
        }
      }
    },
    description: DataTypes.STRING,
    tags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.addHook('beforeCreate', (product, option) => {
    product.id = uuidv4();
  })

  return Product;
};
