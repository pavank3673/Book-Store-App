import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import { cartValidator, updateCartValidator, getAllCartsValidator } from '../validators/cart.validator';
import * as CartController from '../controllers/cart.controller';

const router = express.Router();

router.post('/:id', cartValidator, userAuth, CartController.addBookToCart);

router.put('/:id', updateCartValidator, userAuth, CartController.updateBookToCart);

router.delete('/:id', cartValidator, userAuth, CartController.removeBookFromCart);

router.get('/:id', cartValidator, userAuth, CartController.getBookFromCart);

router.get('', getAllCartsValidator, userAuth, CartController.getAllBooksFromCart);

export default router;
