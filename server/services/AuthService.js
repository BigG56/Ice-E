const UserModel = require('../models/user');
const UserModelInstance = new UserModel();
const createError = require('http-errors');
const bcrypt = require('../utils/bcrypt');

module.exports = class AuthService {

    async register(data) {

        const { email } = data;
        console.log(data);
    
        try {
          // Check if user already exists
          const user = await UserModelInstance.findOneByEmail(email);
    
          // If user already exists, reject
          if (user) {
            throw createError(409, 'Email already in use');
          }
    
          // User doesn't exist, create new user record
          return await UserModelInstance.create(data);
    
        } catch(err) {
          throw createError(500, err);
        }
    
    };

    async login(data) {

        const { email, password } = data;
    
        try {
            if (!(email && password)) {
                throw createError(400, 'All input required.')
              }
              // Check if user exists
              const user = await UserModelInstance.findOneByEmail(email);
              const compHashPassword = await bcrypt.comparePassword(password, user.password)
              if (!(user && compHashPassword)) {
                throw createError(401, 'Incorrect email or password.');
              }
              return user;
            } catch(err) {
              throw createError(500, err);
            }
    
    };

    async googleLogin(profile) {

      const { id, displayName } = profile;
  
      try {
        // Check if user exists
        const user = await UserModelInstance.findOneByGoogleId(id);
  
        // If no user found, create new user
        if (!user) {
          return await UserModelInstance.create({ google: { id, displayName } });
        }
  
        // User already exists, return profile
        return user;
  
      } catch(err) {
        throw createError(500, err);
      }
  
    };
}