import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser } from '../auth/Auth.actions';
import { addAddress, updateDetails, fetchAddress } from './Users.actions';

const initialState = {
  delivery: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login success
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state, user);
      })
      //Update details success
      .addCase(updateDetails.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state, user);
      })
      //Add address successs
      .addCase(addAddress.fulfilled, (state, action) => {
        const { delivery } = action.payload;
        Object.assign(state.delivery, delivery);
      })
      //Fetch address success
      .addCase(fetchAddress.fulfilled, (state, action) => {
        const { delivery } = action.payload;
        Object.assign(state.delivery, delivery);
      })
      //Check login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { user, address } = action.payload;
        Object.assign(state, user);
        Object.assign(state.delivery, address)
      })
  }
});

// Export reducer function by default
export default userSlice.reducer;