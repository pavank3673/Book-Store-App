import { QueryTypes } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const Cart = require('../models/cart')(sequelize, DataTypes);
import * as BookService from './book.service';

const getCartByBookAndUser = async (bookId, userId) => {
  const data = await sequelize.query('SELECT * FROM carts WHERE "bookId" = :bookid AND "UserId" = :userid', {
    replacements: {
      bookid: bookId,
      userid: userId
    },
    type: QueryTypes.SELECT,
    plain: true
  });
  return data;
};

export const addBookToCart = async (bookId, userId) => {
  const existingCartBook = await getCartByBookAndUser(bookId, userId);
  if (existingCartBook === null) {
    const book = await BookService.getBook(bookId);
    let quantity = 1;
    let totalPrice = book.price * quantity;

    const data = await sequelize.query(
      'INSERT INTO carts ("bookId", "bookQuantity", "bookTotalPrice", "UserId", "createdAt", "updatedAt") values (:bookid, :quantity, :totalprice, :userid, :createdat, :updatedat) RETURNING *',
      {
        replacements: {
          bookid: bookId,
          quantity: quantity,
          totalprice: totalPrice,
          userid: userId,
          createdat: new Date(),
          updatedat: new Date()
        },
        type: QueryTypes.INSERT
      }
    );

    return data[0][0];
  } else {
    throw new Error('Book already added to cart');
  }
};
