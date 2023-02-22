const createError = require('http-errors');
const OrderModel = require('../models/orders');
const OrderItemModel = require('../models/orderItems');

module.exports = class OrderService {

  async list(userId) {
    try {
      // Load user orders based on user ID
      const orders = await OrderModel.findByUser(userId);

      return orders;

    } catch(err) {
      throw createError(404, 'Order record not found');
    }
  }

  async findByOrderId(orderId) {
    try {
      // Load user orderitems based on order ID
      const orderItems = await OrderItemModel.find(orderId);
      //console.log(orderItems);

      return orderItems;

    } catch(err) {
      throw createError(404, 'Order item record not found');
    }
  }

}