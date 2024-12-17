import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import { newCustomerDetailValidator } from '../validators/customerDetail.validator';
import * as CustomerDetailController from '../controllers/customerDetail.controller';

const router = express.Router();

router.post('', newCustomerDetailValidator, userAuth, CustomerDetailController.addCustomerDetail);

export default router;
