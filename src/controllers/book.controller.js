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

  export const updateBook = async (req, res) => {
    try {
      const data = await BookService.updateBook(req.params.id,req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Book updated successfully'
      });
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).json({
        code: HttpStatus.FORBIDDEN,
        message: `${error}`
      });
    }
  };

  export const deleteBook = async (req, res) => {
    try {
      const data = await BookService.deleteBook(req.params.id,req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).json({
        code: HttpStatus.FORBIDDEN,
        message: `${error}`
      });
    }
  };

  export const getAllBooks = async (req, res) => {
    try {
      const data = await BookService.getAllBooks(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All books fetched successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

export const getBook= async (req, res) => {
  try {
    const data = await BookService.getBook(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};