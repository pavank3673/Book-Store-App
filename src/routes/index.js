import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';
import CustomerDetailRoute from './customerDetail.route';
import OrderSummaryRoute from './orderSummary.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/books', bookRoute);
  router.use('/carts', cartRoute);
  router.use('/wishlists', wishlistRoute);
  router.use('/customerDetails', CustomerDetailRoute);

  return router;
};

export default routes;
