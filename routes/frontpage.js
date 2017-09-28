const transaction = require('../db/').transaction;

module.exports = {
  get(req, res) {
    if (req.isAuthenticated()) {
      res.render('welcome');
    } else {
      res.render('login');
    }
  },
  post(req, res) {
    if (req.isAuthenticated()) {
      const {customerId, amount, date} = req.body;

      transaction.getTransactions(customerId, amount, date)
        .then((response) => {
          res.render('welcome', {transactions: response});
        })
        .catch((error) => {
          console.log(error);
          res.render('error', {error});
        });
    } else {
      res.render('login');
    }
  },
};
