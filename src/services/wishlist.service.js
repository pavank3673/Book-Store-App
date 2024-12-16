import { QueryTypes } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const Wishlist = require('../models/wishlist')(sequelize, DataTypes);
import * as BookService from './book.service';

const getWishlistByBookAndUser = async (bookId, userId) => {
  const data = await sequelize.query('SELECT * FROM wishlists WHERE "bookId" = :bookid AND "UserId" = :userid', {
    replacements: {
      bookid: bookId,
      userid: userId
    },
    type: QueryTypes.SELECT,
    plain: true
  });
  return data;
};

export const addBookToWishlist = async (bookId, userId) => {
  const existingWishlistBook = await getWishlistByBookAndUser(bookId, userId);
  if (existingWishlistBook == null) {
    const data = await sequelize.query(
      'INSERT INTO wishlists ("bookId", "UserId", "createdAt", "updatedAt") values (:bookid, :userid, :createdat, :updatedat) RETURNING *',
      {
        replacements: {
          bookid: bookId,
          userid: userId,
          createdat: new Date(),
          updatedat: new Date()
        },
        type: QueryTypes.INSERT
      }
    );
    return data[0][0];
  } else {
    throw new Error('Book already added to wishlist');
  }
};

export const getBookFromWishlist = async (bookId, userId) => {
  const existingWishlistBook = await getWishlistByBookAndUser(bookId, userId);
  if (existingWishlistBook !== null) {
    const book = await BookService.getBook(bookId);
    book.wishlistId = existingWishlistBook.wishlistId;

    return book;
  } else {
    throw new Error('Book doesnot exist in wishlist');
  }
};

export const removeBookFromWishlist = async (bookId, userId) => {
  const existingWishlistBook = await getWishlistByBookAndUser(bookId, userId);
  if (existingWishlistBook !== null) {
    const data = await sequelize.query('DELETE FROM wishlists WHERE "bookId" = :bookid AND "UserId" = :userid RETURNING *', {
      replacements: {
        bookid: bookId,
        userid: userId
      },
      type: QueryTypes.DELETE
    });
    return data[0][0];
  } else {
    throw new Error('Book doesnot exist in wishlist');
  }
};
