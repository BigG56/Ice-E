import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, isLoggedIn } from '../../api/auth';

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (userId, thunkAPI) => {
    try {
      const response = await isLoggedIn(userId);
      //console.log(response);

      return {
        address: response.address,
        cart: response.cart,
        user: response.user,
        loggedIn: true
      }
    } catch(err) {
      console.error(err)
      throw err;
    }
  }
);



export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      if (response.message) {
        return thunkAPI.rejectWithValue(response.data)
      }
      return {
        user: response,
        isAuthenticated: true,
        loggedIn: true,
        error: response.error
      }
    } catch(err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, thunkAPI) => {
    try {
      await register(credentials);
      return {};
    } catch(err) {
      console.error(err)
      throw err;
    }
  }
);