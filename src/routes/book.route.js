import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as BookController from '../controllers/book.controller';
import { bookValidator } from '../validators/book.validator';


const router = express.Router();

router.post('', bookValidator, userAuth, BookController.newBook);

router.put('/:id', bookValidator, userAuth, BookController.updateBook);

export default router;