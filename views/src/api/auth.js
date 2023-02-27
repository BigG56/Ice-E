import API from './client';
// API interface user login
export const login = async (credentials) => {
    try {
      const response = await API.post('auth/login', credentials);
  
      return response.data;
  
    } catch (err) {
      throw err.response.data;
    }
}
// API interface registering user
export const register = async (data) => {
    try {
      const response = await API.post('auth/register', data);
  
      return response.data;
  
    } catch(err) {
      throw err.response.data;
    }
}
// API interface for checking log-in status
export const isLoggedIn = async (userId) => {
  try {
    const response = await API.get(`users/${userId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}
// API interface for google login
export const googleLogin = async () => {
  try {
    const response = await API.get('auth/google');
    console.log(response)

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}
  