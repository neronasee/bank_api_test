const getTransactions = require('../controllers').transactions.list;

module.exports = (req, res) => {
  if (req.isAuthenticated()) {
    getTransactions()
      .then((transactions) => res.render('welcome', {transactions}))
      .catch((error) => res.render('error', {error}));
  } else {
    res.render('login');
  }
};
