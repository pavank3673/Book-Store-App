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

export const updateBookToCart = async (bookId, body) => {
  const existingCartBook = await getCartByBookAndUser(bookId, body.userId);
  if (existingCartBook !== null) {
    const book = await BookService.getBook(bookId);
    let totalPrice = book.price * body.bookQuantity;

    const data = await sequelize.query(
      'UPDATE carts SET "bookId" = :bookid, "bookQuantity" = :quantity, "bookTotalPrice" = :totalprice, "UserId" = :userid, "updatedAt" = :updatedat WHERE "cartDetailId" = :cartdetailid RETURNING *',
      {
        replacements: {
          cartdetailid: existingCartBook.cartDetailId,
          bookid: existingCartBook.bookId,
          quantity: body.bookQuantity,
          totalprice: totalPrice,
          userid: existingCartBook.UserId,
          updatedat: new Date()
        },
        type: QueryTypes.UPDATE
      }
    );

    return data[0][0];
  } else {
    throw new Error('Book doesnot exist in cart');
  }
};

export const removeBookFromCart = async (bookId, userId) => {
  const existingCartBook = await getCartByBookAndUser(bookId, userId);
  if (existingCartBook !== null) {
    const data = await sequelize.query('DELETE FROM carts WHERE "cartDetailId" = :cartdetailid RETURNING *', {
      replacements: {
        cartdetailid: existingCartBook.cartDetailId
      },
      type: QueryTypes.DELETE
    });

    return data[0][0];
  } else {
    throw new Error('Book doesnot exist in cart');
  }
};

export const getBookFromCart = async (bookId, userId) => {
  const existingCartBook = await getCartByBookAndUser(bookId, userId);
  if (existingCartBook !== null) {
    return existingCartBook;
  } else {
    throw new Error('Book not found in cart');
  }
};
