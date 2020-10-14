'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "email input is not a valid email"
        },
        notNull: {
          args: true,
          msg: "email input is empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 32],
          msg: "password length is less than 4 or bigger than 32"
        },
        notNull: {
          args: true,
          msg: "email input is empty"
        }
      }
    },
    address: DataTypes.STRING,
    postoffice: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "postoffice must be an integer"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (user, option) => {
    console.log(user, 'in models')
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
    user.id = uuidv4();
  })

  return User;
};
