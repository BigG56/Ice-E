const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');
const CartService = require('../services/CartService');

const UserServiceInstance = new UserService();
const CartServiceInstance = new CartService();

module.exports = (app) => {

  app.use('/home/users', router);

  router.get('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      const cart = await CartServiceInstance.loadCart(userId);
      const user = await UserServiceInstance.get({id: userId});
    
      res.status(200).json({
        cart,
        user
      });
    } catch(err) {
      next(err);
    }
  });

  router.put('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = req.body;

      const response = await UserServiceInstance.update({ id: userId, ...data });
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

}