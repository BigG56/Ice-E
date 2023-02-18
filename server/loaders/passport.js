const passport = require('passport');
const LocalStrategy = require('passport-local');
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();
const { GOOGLE } = require('../config');
const GoogleStrategy = require('passport-google-oauth20').Strategy



module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        UserServiceInstance.get(id, function(err, user) {
            console.log(id);
          done(err, user);
        });
    });

    passport.use('local', new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
            try {
                const user = await AuthServiceInstance.login({ email, password });
                return done(null, user);
            } catch(err) {
                return done(err);
            }
        }
    ));

    passport.use(new GoogleStrategy({
        clientID: GOOGLE.CLIENT_ID,
        clientSecret: GOOGLE.CLIENT_SECRET,
        callbackURL: GOOGLE.CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await AuthServiceInstance.googleLogin(profile);
          return done(null, user);
        } catch(err) {
          return done(err);
        }
      }
    ));
    return passport;
}