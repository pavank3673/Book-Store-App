import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newCustomerDetailValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    workAddress: Joi.string(),
    workCity: Joi.string(),
    workState: Joi.string(),
    homeAddress: Joi.string()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: `${error}`
    });
  } else {
    next();
  }
};
