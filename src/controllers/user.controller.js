import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 */
export const registerUser = async (req, res) => {
  try {
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({ code: HttpStatus.CONFLICT, message: `${error}` });
  }
};

/**
 * Controller to create a new admin
 * @param  {object} req - request object
 * @param {object} res - response object
 */
export const registerAdmin = async (req, res) => {
  try {
    const data = await UserService.registerAdmin(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Admin registered successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({ code: HttpStatus.CONFLICT, message: `${error}` });
  }
};

export const loginUser = async (req, res) => {
  try {
    const token = await UserService.loginUser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: token,
      message: 'User logged in successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const generateAccessToken = async (req, res) => {
  try {
    const token = await UserService.generateAccessToken(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: token,
      message: 'Access token generated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.FORBIDDEN).json({
      code: HttpStatus.FORBIDDEN,
      message: `${error}`
    });
  }
};
