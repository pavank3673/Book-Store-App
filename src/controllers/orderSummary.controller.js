import HttpStatus from 'http-status-codes';
import * as OrderSummaryService from '../services/orderSummary.service';

export const addOrderSummary = async (req, res) => {
  try {
    const data = await OrderSummaryService.addOrderSummary(req.params.id, req.body.userId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Order summary added successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};
