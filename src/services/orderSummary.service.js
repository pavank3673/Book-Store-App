import { QueryTypes } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const orderSummary = require('../models/orderSummary')(sequelize, DataTypes);
import { removeBookFromCart } from './cart.service';

export const addOrderSummary = async (bookId, userId) => {
  const cartBook = await removeBookFromCart(bookId, userId);

  const data = await sequelize.query(
    'INSERT INTO order_summary ("bookId", "bookQuantity", "bookTotalPrice", "UserId", "createdAt", "updatedAt") values (:bookid, :bookquantity, :booktotalprice, :userid, :createdat, :updatedat) RETURNING *',
    {
      replacements: {
        bookid: bookId,
        bookquantity: cartBook.bookQuantity,
        booktotalprice: cartBook.bookTotalPrice,
        userid: userId,
        createdat: new Date(),
        updatedat: new Date()
      },
      type: QueryTypes.INSERT
    }
  );
  return data[0][0];
};
