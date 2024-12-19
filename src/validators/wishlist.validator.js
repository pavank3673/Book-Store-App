import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const wishlistValidator = (req, res, next) => {
  const reqParamsSchema = Joi.object({
    id: Joi.string()
  });
  const reqParamsValidation = reqParamsSchema.validate(req.params);

  if (reqParamsValidation.error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: reqParamsValidation.error.message
    });
  } else {
    next();
  }
};

export const getAllWishlistsValidator = (req, res, next) => {
  const reqBodySchema = Joi.object({
    pageNo: Joi.number().required()
  });
  const reqBodyValidation = reqBodySchema.validate(req.body);
  if (reqBodyValidation.error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: reqBodyValidation.error.message
    });
  } else {
    next();
  }
};
