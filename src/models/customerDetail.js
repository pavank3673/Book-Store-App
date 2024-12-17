'use-strict';
const { Model, DataTypes } = require('sequelize');
import sequelize from '../config/database';
const User = require('./user')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  class CustomerDetail extends Model {
    static associate() {}
  }

  CustomerDetail.init(
    {
      customerDetailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      workAddress: DataTypes.STRING,
      workCity: DataTypes.STRING,
      workState: DataTypes.STRING,
      homeAddress: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'customer_detail'
    }
  );
  CustomerDetail.belongsTo(User, { as: ' ' });

  return CustomerDetail;
};
