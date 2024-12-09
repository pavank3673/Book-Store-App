import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service'

export const newBook = async (req, res) => {
    try {
      const data = await BookService.newBook(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Book created successfully'
      });
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).json({
        code: HttpStatus.FORBIDDEN,
        message: `${error}`
      });
    }
  };