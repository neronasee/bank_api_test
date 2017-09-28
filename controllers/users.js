const passport = require('passport');
const user = require('../db').user;

module.exports = {
  signup(req, res, next) {
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(422).send({error: 'Provide email and pass'});
    }

    return user
      .getIdByName(username)
      .then((result) => {
        if (!!result.length) {
          return res.status(422).send({error: 'Username is already taken'});
        }

        return user
          .create(username, password)
          .then((createdUser) => {
            req.login({username}, (err) => {
              if (err) return next(err);

              res.redirect('/');
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send({error: "Internal error"});
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
