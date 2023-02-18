const express = require('express');
const router = express.Router();

const ProductService = require('../services/ProductService');
const ProductServiceInstance = new ProductService();

module.exports = (app) => {

  app.use('/home/products', router);

  router.get('/', async (req, res, next) => {
    try {

      const queryParams = req.query;
      console.log(req.session)

      const response = await ProductServiceInstance.list(queryParams);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

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