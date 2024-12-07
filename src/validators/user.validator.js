import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const registrationValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ code: HttpStatus.UNPROCESSABLE_ENTITY, message: `${error}` });
  } else {
    next();
  }
};
