import API from './client';

export const fetchUser = async (userId) => {
    try {
      const response = await API.get(`users/${userId}`);
  
      return response.data;
  
    } catch (err) {
      throw err.response.data;
    }
}
  
  // API interface for updating the user's profile
export const updateUser = async (credentials) => {
    try {
      const response = await API.put(`users/:userId`, credentials);
  
      return response.data;
  
    } catch(err) {
      throw err.response.data;
    }
}

export const getAddress = async (credentials) => {
  try {
    console.log(credentials)
    const response = await API.get(`users/:userId/account/address`, credentials);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

export const createAddress = async (credentials) => {
  try {
    console.log(credentials)
    const response = await API.post(`users/:userId/account/address`, credentials);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}