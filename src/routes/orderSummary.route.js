import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import { newOrderSummaryValidator } from '../validators/orderSummary.validator';
import * as OrderSummaryController from '../controllers/orderSummary.controller';

const router = express.Router();

router.post('/:id', newOrderSummaryValidator, userAuth, OrderSummaryController.addOrderSummary);

export default router;
