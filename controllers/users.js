const passport = require('passport');
const User = require('../models').User;

module.exports = {
  signup(req, res) {
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(422).send({error: 'Provide email and pass'});
    }

    return User
      .findOne({
        where: {username},
        attributes: ['id'],
      })
      .then((user) => {
        if (user) {
          return res.status(422).send({error: 'Username is already taken'});
        }

        return User.create({
          username,
          password,
        })
        .then((user) => {
          req.login(user, (err) => {
            if (err) return next(err);

            res.redirect('/');
          });
        });
      })
      .catch((error) => res.send(error));
  },

  login(req, res, next) {
    return passport.authenticate('local', {
      successRedirectL: '/',
      failureRedirect: '/',
    }, function(err, user, info) {
      if (err) return next(err);
      if (!user) return res.render('error', {error: 'Invalid Credentials'});
      
      req.login(user, (err) => {
        if (err) return next(err);

        res.redirect('/');
      });
    })(req, res, next);
  },

  logout(req, res) {
    req.logout();

    req.session.destroy();

    res.redirect('/');
  },
};
