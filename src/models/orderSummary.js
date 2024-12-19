'use-strict';
const { Model, DataTypes } = require('sequelize');
import sequelize from '../config/database';
const User = require('./user')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  class OrderSummary extends Model {
    static associate() {}
  }

  OrderSummary.init(
    {
      orderSummaryId: {
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
      modelName: 'order_summary',
      freezeTableName: true
    }
  );
  OrderSummary.belongsTo(User, { as: ' ' });

  return OrderSummary;
};
