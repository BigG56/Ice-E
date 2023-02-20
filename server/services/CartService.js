const createError = require('http-errors');
const CartModel = require('../models/cart');
const OrderModel = require('../models/orders');
const CartItemModel = require('../models/cartItems');
const OrderItemModel = require('../models/orderItems')

const { STRIPE_SECRET_KEY } = require('../config');
const stripe = require('stripe')(STRIPE_SECRET_KEY);

module.exports = class CartService {

  async create(data) {
    console.log(data)

    try {
      const { userid } = data;
      console.log(userid)
      // Instantiate new cart and save
      const Cart = new CartModel();
      const cart = await Cart.create(userid);

      return cart;

    } catch(err) {
      throw err;
    }

  };

  async loadCart(userId) {
    try {
      // Load user cart based on ID
      const cart = await CartModel.findOneByUser(userId);
      console.log(cart);

      // Load cart items and add them to the cart record
      const items = await CartItemModel.find(cart.id);
      cart.items = items;

      return cart;

    } catch(err) {
      throw err;
    }
  }

  async addItem(cartId, product, qty) {
    try {
      // Load user cart based on ID
      const cart = await CartModel.findOneById(cartId);
      console.log(cart);

      // Create cart item
      const cartItem = await CartItemModel.create({ cartid: cart.id, productid: product, qty });
      console.log(cartItem)

      return cartItem;

    } catch(err) {
      throw err;
    }
  }

  async removeItem(cartItemId) {
    try {
      // Remove cart item by line ID
      const cartItem = await CartItemModel.delete(cartItemId);

      return cartItem;

    } catch(err) {
      throw err;
    }
  }

  async updateItem(cartItemId, data) {
    try {
      // Remove cart item by line ID
      const cartItem = await CartItemModel.update(cartItemId, data);

      return cartItem;

    } catch(err) {
      throw err;
    }
  }

  async checkout(userId, cartId, paymentInfo) {
    try {
      // Load cart items
      const cartItems = await CartItemModel.find(cartId);

      // Generate total price from cart items
      const total = cartItems.reduce((total, {price, qty}) => {
        total += Number(price * qty * 100);
        return total;
      }, 0);
    
      const userid = userId;
      console.log(userid)
      // Generate initial order
      const Order = new OrderModel({total, userid});
      Order.addItems(cartItems);
      await Order.create();

      //Create order items
      const orderId = Order.id;
      Order.items = cartItems.map(item => new OrderItemModel({...item, orderId}))
      await OrderItemModel.create(Order.items)

      // Make charge to payment method
      await stripe.charges.create({
        amount: total,
        currency: 'GBP',
        source: 'tok_visa',
        description: 'Ice-E'
      });
      
      // On successful charge to payment method, update order status to COMPLETE
      Order.update({ status: 'COMPLETE' });
      await CartItemModel.deleteAll(cartId)
      console.log(Order);
      

      return Order;

    } catch(err) {
      console.error(err);
      throw err;
    }
  }

}