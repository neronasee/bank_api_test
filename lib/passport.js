const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../db').user;
const localLogin = new LocalStrategy((username, password, done) => {
  return user.getIdByName(username)
    .then((result) => {
      if (!result.length) return done(null, false);

      user.comparePassword(username, password)
        .then(() => done(null, {username}))
        .catch((error) => done(error));
    })
    .catch((error) => done(error));
});

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  user.getIdByName(username)
    .then((user) => done(null, user))
    .catch((error) => {
      done(error);
    });
});

passport.use(localLogin);

module.exports = passport;
