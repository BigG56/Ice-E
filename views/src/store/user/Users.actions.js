import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser, createAddress } from '../../api/user';

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

  export const deliveryAddress = createAsyncThunk(
    'user/address',
    async (credentials, thunkAPI) => {
        console.log(credentials)
      try {
        const response = await createAddress(credentials);
        return {
          address_id: response
        }
      } catch(err) {
        throw err;
      }
    }
  );