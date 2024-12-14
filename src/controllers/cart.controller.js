import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

export const addBookToCart = async (req, res) => {
  try {
    const data = await CartService.addBookToCart(req.params.id, req.body.userId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Book added to cart successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};

export const updateBookToCart = async (req, res) => {
  try {
    const data = await CartService.updateBookToCart(req.params.id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Book updated to cart successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
