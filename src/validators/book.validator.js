import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newBookValidator = (req, res, next) => {
    const schema = Joi.object({
      description: Joi.string(),
      discountPrice: Joi.number(),
      bookImage: Joi.string(),
      admin_user_id: Joi.string(),
      bookName: Joi.string(),
      author: Joi.string(),
      quantity: Joi.number(),
      price: Joi.number(),
      __v:Joi.number()
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
  
  export const updateBookValidator = (req, res, next) => {
    const reqBodySchema = Joi.object({
      description: Joi.string(),
      discountPrice: Joi.number(),
      bookImage: Joi.string(),
      admin_user_id: Joi.string(),
      bookName: Joi.string(),
      author: Joi.string(),
      quantity: Joi.number(),
      price: Joi.number(),
      __v:Joi.number()
    });

    const reqParamsSchema = Joi.object({
        id: Joi.string()
      });

    const reqParamsValidation = reqParamsSchema.validate(req.params);  
    const reqBodyValidation = reqBodySchema.validate(req.body);

    if (reqParamsValidation.error || reqBodyValidation.error) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: reqParamsValidation.error ? reqParamsValidation.error.message : reqBodyValidation.error.message
        });
      } else {
        next();
      }
  };

  export const bookByIdValidator = (req, res, next) => {
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
  