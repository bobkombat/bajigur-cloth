'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "name is empty"
        },
        notEmpty: {
          args: true,
          msg: "name is empty"
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
    expired: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Banner',
  });

  Banner.addHook('beforeCreate', (banner, option) => {
    banner.id = uuidv4();
  })

  return Banner;
};
