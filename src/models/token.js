'use-strict';
const { Model, DataTypes } = require('sequelize');
import sequelize from '../config/database';
const User = require('./user')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate() {}
  }

  Token.init(
    {
      tokenDetailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      refreshToken: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'token'
    }
  );
  Token.belongsTo(User, { as: ' ' });

  return Token;
};
