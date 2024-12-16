import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import { wishlistValidator } from '../validators/wishlist.validator';
import * as WishlistController from '../controllers/wishlist.controller';

const router = express.Router();

router.post('/:id', wishlistValidator, userAuth, WishlistController.addBookToWishlist);

router.get('/:id', wishlistValidator, userAuth, WishlistController.getBookFromWishlist);

router.delete('/:id', wishlistValidator, userAuth, WishlistController.removeBookFromWishlist);

export default router;
