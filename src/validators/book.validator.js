import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const bookValidator = (req, res, next) => {
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
  