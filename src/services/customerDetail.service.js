import { QueryTypes } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const CustomerDetail = require('../models/customerDetail')(sequelize, DataTypes);

export const addCustomerDetail = async (body) => {
  const data = await sequelize.query(
    'INSERT INTO customer_details ("firstName","lastName", "workAddress", "workCity", "workState", "homeAddress", "UserId", "createdAt", "updatedAt") values (:firstname, :lastname, :workaddress, :workcity, :workstate, :homeaddress, :userid, :createdat, :updatedat) RETURNING *',
    {
      replacements: {
        firstname: body.firstName,
        lastname: body.lastName,
        workaddress: body.workAddress,
        workcity: body.workCity,
        workstate: body.workState,
        homeaddress: body.homeAddress,
        userid: body.userId,
        createdat: new Date(),
        updatedat: new Date()
      },
      type: QueryTypes.INSERT
    }
  );
  return data[0][0];
};
