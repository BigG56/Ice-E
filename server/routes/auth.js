const express = require('express');
const router = express.Router();
const { hashPassword } = require('../utils/bcrypt');

// Instantiate Services
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

  app.use('/home/auth', router);

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
  
    try {
      const data = req.body;
      console.log(req.body);
      let { password } = req.body;
      const hashedPassword = await hashPassword(password)
      data.password = hashedPassword
      
      const response = await AuthServiceInstance.register(data);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  
  });
  
  // Login Endpoint
  router.post('/login', passport.authenticate('local'), async (req, res, next) => {
    try {
      const { email, password } = req.body;
    
      const response = await AuthServiceInstance.login({ email, password});
      req.session.user = response
      console.log(req.session.user)
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  router.post('/logout', function(req, res, next){
    req.session.delete(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });
}