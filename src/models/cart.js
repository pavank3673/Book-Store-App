'use-strict';
const { Model, DataTypes } = require('sequelize');
import sequelize from '../config/database';
const User = require('./user')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate() {}
  }

  Cart.init(
    {
      cartDetailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      bookId: DataTypes.STRING,
      bookQuantity: DataTypes.INTEGER,
      bookTotalPrice: DataTypes.DOUBLE
    },
    {
      sequelize,
      modelName: 'cart'
    }
  );
  Cart.belongsTo(User, { as: ' ' });

  return Cart;
};
