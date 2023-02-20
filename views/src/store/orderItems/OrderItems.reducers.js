import { createSlice } from '@reduxjs/toolkit';
import { loadOrderItems } from './OrderItems.actions';

const initialState = {};

const orderItemsSlice = createSlice({
  name: 'orderItems',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadOrderItems.fulfilled, (state, action) => {
        const { orderItems } = action.payload;
          Object.assign(state, orderItems);
      })
      .addCase(loadOrderItems.pending, (state) => {
        Object.assign(state, {})
      })
  }
});

// Export reducer function by default
export default orderItemsSlice.reducer;