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
    res
      .status(HttpStatus.CONFLICT)
      .json({ code: HttpStatus.CONFLICT, message: `${error}` });
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
    res
      .status(HttpStatus.CONFLICT)
      .json({ code: HttpStatus.CONFLICT, message: `${error}` });
  }
};
