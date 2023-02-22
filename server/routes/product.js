const express = require('express');
const router = express.Router();

const ProductService = require('../services/ProductService');
const ProductServiceInstance = new ProductService();

module.exports = (app) => {

  app.use('/home/products', router);

  //Get all products endpoint
  router.get('/', async (req, res, next) => {
    try {

      const queryParams = req.query;

      const response = await ProductServiceInstance.list(queryParams);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  //Get product by id endpoint
  router.get('/:productId', async (req, res, next) => {
    try {
      const { productId } = req.params;

      const response = await ProductServiceInstance.get(productId);

      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });
}