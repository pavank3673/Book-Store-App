import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as BookController from '../controllers/book.controller';
import { newBookValidator,updateBookValidator, bookByIdValidator } from '../validators/book.validator';


const router = express.Router();

router.post('', newBookValidator, userAuth, BookController.newBook);

router.put('/:id', updateBookValidator, userAuth, BookController.updateBook);

router.delete('/:id',bookByIdValidator, userAuth, BookController.deleteBook );

export default router;