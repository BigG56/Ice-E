import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders } from '../../api/order';


export const loadOrders = createAsyncThunk(
  'orders/loadOrders',
  async (userId, thunkAPI) => {
    try {
      const response = await fetchOrders(userId);
      return {
        orders: response
    }
    } catch(err) {
      throw err;
    }
  }
);