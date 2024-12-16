'use-strict';
const { Model, DataTypes } = require('sequelize');
import sequelize from '../config/database';
const User = require('./user')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate() {}
  }

  Wishlist.init(
    {
      wishlistId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      bookId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'wishlist'
    }
  );
  Wishlist.belongsTo(User, { as: ' ' });

  return Wishlist;
};
