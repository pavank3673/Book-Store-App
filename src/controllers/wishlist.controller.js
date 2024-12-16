import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service';

export const addBookToWishlist = async (req, res) => {
  try {
    const data = await WishlistService.addBookToWishlist(req.params.id, req.body.userId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Book added to wishlist successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};

export const getBookFromWishlist = async (req, res) => {
  try {
    const data = await WishlistService.getBookFromWishlist(req.params.id, req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      messaga: 'Book fetched from wishlist successfully'
    });
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: `${error}`
    });
  }
};
