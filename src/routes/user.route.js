import express from 'express';
import * as userController from '../controllers/user.controller';
import { registrationValidator, loginUserValidator, refreshTokenValidator } from '../validators/user.validator';
import { userRole, adminRole } from '../middlewares/role.middleware';

const router = express.Router();

router.post('', registrationValidator, userRole, userController.registerUser);

router.post('/admin', registrationValidator, adminRole, userController.registerAdmin);

router.post('/login', loginUserValidator, userController.loginUser);

router.post('/token', refreshTokenValidator, userController.generateAccessToken);

export default router;
