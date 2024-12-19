import { QueryTypes } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
import * as UserService from '../services/user.service';

export const newBook = async (body) => {
  console.log('controller -- > body.userId' + body.userId);
  const existingUser = await UserService.getUserById(body.userId);
  console.log('existingUser' + existingUser);
  if (existingUser !== null && existingUser.role == 'ADMIN') {
    const data = await sequelize.query(
      'SELECT * FROM add_book(:description, :discountprice, :bookimage, :admin_user_id, :bookname, :author, :quantity, :price, :createdat, :updatedat, :__v);',
      {
        replacements: {
          description: body.description,
          discountprice: body.discountPrice,
          bookimage: body.bookImage,
          admin_user_id: body.admin_user_id,
          bookname: body.bookName,
          author: body.author,
          quantity: body.quantity,
          price: body.price,
          createdat: new Date(),
          updatedat: new Date(),
          __v: body.__v
        },
        type: QueryTypes.SELECT,
        plain: true
      }
    );
    return data;
  } else {
    throw new Error('Unauthorized User');
  }
};

export const updateBook = async (bookId, body) => {
  console.log('controller -- > body.userId' + body.userId);
  const existingUser = await UserService.getUserById(body.userId);
  console.log('existingUser' + existingUser);
  if (existingUser !== null && existingUser.role == 'ADMIN') {
    const data = await sequelize.query(
      'SELECT * FROM update_book(:bookid, :description, :discountprice, :bookimage, :admin_user_id, :bookname, :author, :quantity, :price, :updatedat, :__v);',
      {
        replacements: {
          bookid: bookId,
          description: body.description,
          discountprice: body.discountPrice,
          bookimage: body.bookImage,
          admin_user_id: body.admin_user_id,
          bookname: body.bookName,
          author: body.author,
          quantity: body.quantity,
          price: body.price,
          updatedat: new Date(),
          __v: body.__v
        },
        type: QueryTypes.SELECT,
        plain: true
      }
    );
    return data;
  } else {
    throw new Error('Unauthorized User');
  }
};

export const deleteBook = async (bookId, body) => {
  console.log('controller -- > body.userId' + body.userId);
  const existingUser = await UserService.getUserById(body.userId);
  console.log('existingUser' + existingUser);
  if (existingUser !== null && existingUser.role == 'ADMIN') {
    const data = await sequelize.query('SELECT * FROM delete_book(:bookid);', {
      replacements: {
        bookid: bookId
      },
      type: QueryTypes.SELECT,
      plain: true
    });
    return data;
  } else {
    throw new Error('Unauthorized User');
  }
};

export const getAllBooks = async (body) => {
  const limit = 10;
  let offset = limit * (body.pageNo - 1);
  const resultData = await sequelize.query('SELECT * FROM get_all_books(:offsetvalue);', {
    replacements: {
      offsetvalue: offset
    },
    type: QueryTypes.SELECT
  });

  const totalCount = await sequelize.query('SELECT COUNT(*) FROM book_store', {
    type: QueryTypes.SELECT,
    plain: true
  });

  return {
    results: resultData,
    total_count: totalCount.count
  };
};

export const getBook = async (bookId) => {
  const data = await sequelize.query('SELECT * FROM get_book_by_id(:bookid);', {
    replacements: {
      bookid: bookId
    },
    type: QueryTypes.SELECT,
    plain: true
  });
  return data;
};
