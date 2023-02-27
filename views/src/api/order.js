import API from './client';

// API interface for loading a user's orders
export const fetchOrders = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}/orders`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}
// API interface for fetching order items
export const fetchOrderItems = async (orderId) => {
  try {
    const response = await API.get(`/users/:userId/orders/${orderId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}