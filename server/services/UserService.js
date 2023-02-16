const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class UserService {

    async getEmail(email) {
  
      try {
        // Check if user already exists
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
    
}