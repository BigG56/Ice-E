const express = require('express');
const router = express.Router();
const { hashPassword } = require('../utils/bcrypt');

// Instantiate Services
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();

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
      console.log(response);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('http://localhost:3000/home');
    });
  });

  // Google Login Endpoint
  router.get('/google', passport.authenticate('google', { scope: ["profile"] } ));

  // Google Login Callback Endpoint
  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login/failure'}),
    async (req, res) => {
      console.log(req.user)
      res.redirect(`http://localhost:3000/home/users/${req.user.id}`);
    }
    );
}