import HttpStatus from 'http-status-codes';
import * as CustomerDetailService from '../services/customerDetail.service';

export const addCustomerDetail = async (req, res) => {
  try {
    const data = await CustomerDetailService.addCustomerDetail(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Customer details added successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};
