import { createSlice } from '@reduxjs/toolkit';
import { loadOrderItems } from './OrderItems.actions';

const initialState = {};

const orderItemsSlice = createSlice({
  name: 'orderItems',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    //Load orderItem success
      .addCase(loadOrderItems.fulfilled, (state, action) => {
        const { orderItems } = action.payload;
        orderItems.forEach((orderItem) => {
          const { id } = orderItem;
          state[id] = orderItem;
        });
      })
  }
});

// Export reducer function by default
export default orderItemsSlice.reducer;