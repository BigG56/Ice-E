import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser, createAddress, getAddress } from '../../api/user';

export const updateDetails = createAsyncThunk(
    'user/updateUser',
    async (credentials, thunkAPI) => {
        console.log(credentials)
      try {
        const response = await updateUser(credentials);
        return {
          user: response
        }
      } catch(err) {
        throw err;
      }
    }
);

export const addAddress = createAsyncThunk(
    'user/deliveryAddress',
    async (credentials, thunkAPI) => {
        console.log(credentials)
      try {
        const response = await createAddress(credentials);
        return {
          delivery: response
        }
      } catch(err) {
        throw err;
      }
    }
);

export const fetchAddress = createAsyncThunk(
  'user/fetchDeliveryAddress',
  async (userId, thunkAPI) => {
      console.log(userId)
    try {
      const response = await getAddress(userId);
      return {
        delivery: response
      }
    } catch(err) {
      throw err;
    }
  }
);