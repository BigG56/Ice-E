const passport = require('passport');
const LocalStrategy = require('passport-local');
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();


module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        UserServiceInstance.get(id, function(err, user) {
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
    return passport;
}