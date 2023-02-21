const UserModel = require('../models/user');
const UserModelInstance = new UserModel();
const AddressModel = require('../models/address');
const AddressModelInstance = new AddressModel();
const createError = require('http-errors');

module.exports = class UserService {

    async getEmail(email) {
  
      try {
        // Check if user already exists
        console.log(email)
        const user = await UserModelInstance.findOneByEmail(email);
  
        // If user doesn't exist, reject
        if (!user) {
          throw createError(404, 'User record not found');
        }
  
        return user;
  
      } catch(err) {
        console.error(err);
        throw err;
      }
  
    };

    async get(data) {

        const { id } = data;
    
        try {
          // Check if user already exists
          const user = await UserModelInstance.findOneById(id);
    
          // If user doesn't exist, reject
          if (!user) {
            throw createError(404, 'User record not found');
          }
    
          return user;
    
        } catch(err) {
          throw err;
        }
    
    };
    async update(data) {

      try {
        // Check if user already exists
        const user = await UserModelInstance.update(data);
  
        return user;
  
      } catch(err) {
        throw err;
      }
  
    };

    async createAddress(data) {

      try {
        // Check if user already exists
        const user = await AddressModelInstance.create(data);
  
        return user;
  
      } catch(err) {
        throw err;
      }
  
    };
    
}