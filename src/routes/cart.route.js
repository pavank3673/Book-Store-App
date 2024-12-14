import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import { cartValidator, updateCartValidator } from '../validators/cart.validator';
import * as CartController from '../controllers/cart.controller';

const router = express.Router();

router.post('/:id', cartValidator, userAuth, CartController.addBookToCart);

router.put('/:id', updateCartValidator, userAuth, CartController.updateBookToCart);

export default router;
