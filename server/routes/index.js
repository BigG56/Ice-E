const authRouter = require('./auth');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const productRouter = require('./product');
const userRouter = require('./user');

module.exports = (app, passport) => {
  authRouter(app, passport);
  cartRouter(app, passport);
  productRouter(app);
  userRouter(app);
  orderRouter(app);
}