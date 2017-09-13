const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;

const localLogin = new LocalStrategy((username, password, done) => {
  return User.findOne({
    where: {username},
    attributes: ['id', 'username', 'password_hash'],
  })
  .then((user) => {
    if (!user) return done(null, false);
    user.comparePassword(password)
      .then((result) => done(null, user))
      .catch((error) => done(error));
  })
  .catch((error) => done(error));
});

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  User.findOne({where: {username}})
    .then((user) => done(null, user))
    .catch((error) => {
      done(error);
    });
});

passport.use(localLogin);

module.exports = passport;
