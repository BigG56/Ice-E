const express = require('express');
const router = express.Router();
const CartService = require('../services/CartService');
const passport = require('passport')

const CartServiceInstance = new CartService();

module.exports = (app, passport) => {

  app.use('/home/users/:userId/carts', router);

  //Get cart endpoint
  router.get('/:cartId', async (req, res, next) => {
    try {
      const {id}  = req.params;
      //console.log(id)
      
      const response = await CartServiceInstance.loadCart({id});

      res.status(200).json(response);

    } catch(err) {
      next(err);
    }
  });

  //Create cart endpoint
  router.post('/:cartId', async (req, res, next) => {
    try {
      const {cartId, product, qty} = req.body;
      //console.log(cartId);
      //console.log(product.id);
      //console.log(qty);
    
      const response = await CartServiceInstance.addItem(cartId, product.id, qty);

      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  //Update cartItem endpoint
  router.put('/:cartId/items/:cartitemid', async (req, res, next) => {
    try {
      const {qty, cartitemid} = req.body;
      //console.log(cartitemid);
      //console.log(qty);
    
      const response = await CartServiceInstance.updateItem(qty, cartitemid);

      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  //Delete cartItem endpoint
  router.delete('/:cartId/items/:cartitemid', async (req, res, next) => {
    try {
      const { cartitemid } = req.params;
      //console.log(cartitemid)
    
      const response = await CartServiceInstance.removeItem(cartitemid);

      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });
  
  //Checkout endpoint
  router.post('/:cartId/checkout', async (req, res, next) => {
    try {
      const { userId, cartId, paymentInfo } = req.body; 
      //console.log(userId, cartId, paymentInfo);

      const response = await CartServiceInstance.checkout(userId, cartId, paymentInfo);
      //console.log(response);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });
}