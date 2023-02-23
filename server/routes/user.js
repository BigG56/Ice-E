const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');
const CartService = require('../services/CartService');

const UserServiceInstance = new UserService();
const CartServiceInstance = new CartService();

module.exports = (app) => {

  app.use('/home/users', router);

  //Get user, cart and address endpoint
  router.get('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      //console.log(userId);
      const cart = await CartServiceInstance.loadCart(userId);
      const user = await UserServiceInstance.get({id: userId});
      const address = await UserServiceInstance.getAddress({userid: userId})
    
      res.status(200).json({
        cart,
        address,
        user
      });
    } catch(err) {
      next(err);
    }
  });

  //Update user endpoint
  router.put('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.body
      //console.log(userId);
      const {userName, firstname, lastname} = req.body
      const data = {userName, firstname, lastname}
      //console.log(data)

      const response = await UserServiceInstance.update({id: userId, ...data});
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  //Get user delivery info
  router.get('/:userId/account/address', async (req, res, next) => {
    try {
      const {userId} = req.params
      //console.log(data)
      const userid = userId

      const response = await UserServiceInstance.getAddress(userid);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  //Create user delivery address
  router.post('/:userId/account/address', async (req, res, next) => {
    try {
      const {userId} = req.body
      const userid = userId
      const {addressline1, addressline2, city, county, postcode} = req.body
      const data = {userid, addressline1, addressline2, city, county, postcode}
      //console.log(data)

      const response = await UserServiceInstance.createAddress(data);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

}