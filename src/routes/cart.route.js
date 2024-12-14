import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import { cartValidator } from '../validators/cart.validator';
import * as CartController from '../controllers/cart.controller';

const router = express.Router();

router.post('/:id', cartValidator, userAuth, CartController.addBookToCart);

export default router;
