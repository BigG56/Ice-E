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
      const { userId } = req.body
      console.log(userId);
      const {userName, firstname, lastname} = req.body
      const data = {userName, firstname, lastname}
      console.log(data)

      const response = await UserServiceInstance.update({id: userId, ...data});
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.post('/:userId/accounts', async (req, res, next) => {
    try {
      const data = req.body
      console.log(data)

      const response = await UserServiceInstance.createAddress({});
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

}