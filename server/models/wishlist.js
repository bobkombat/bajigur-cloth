'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.User);
      Wishlist.belongsTo(models.Product);
    }
  };
  Wishlist.init({
    id: {
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
    ProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "product id is empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });

  Wishlist.addHook('beforeCreate', (wishlist, option) => {
    wishlist.id = uuidv4();
  })
  return Wishlist;
};
