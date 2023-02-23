import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus } from '../auth/Auth.actions';
import { addItem, checkoutCart, loadCart, removeItem, updateItem } from './Cart.actions';


const initialState = {
  cart: {
    id: 0,
    userid: 0,
    items: []
  },
  paymentMade: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //Add item success
      .addCase(addItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.cart.items.push(item);
        state.paymentMade = false
      })
      //Check login success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state.cart, cart);
      })
      //Checkout cart success
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.cart.items = [];
        state.paymentMade = true;
      })
      //Load cart success
      .addCase(loadCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state.cart, cart);
      })
      //Remove cartItem success
      .addCase(removeItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.cart.items = state.cart.items.filter((product) => product.cartitemid !== item);
      })
      //Update cartItem success
      .addCase(updateItem.fulfilled, (state, action) => {
        const { item, qty } = action.payload;
        //console.log(item)
        const index = state.cart.items.findIndex((Item) => Item.cartitemid === item)
        //console.log(index)
        const newItems = [...state.cart.items]
        //console.log(newItems)
        newItems[index].qty = qty;
        state.cart.items = newItems;
      })
  }
});

// Export reducer function by default
export default cartSlice.reducer;