const cache = require('express-redis-cache')();
const customersController = require('./controllers').customers;
const transactionsController = require('./controllers').transactions;
const usersController = require('./controllers').users;
const frontPage = require('./routes/frontpage');

module.exports = (app) => {
  app.get('/', frontPage.get);
  app.post('/', frontPage.post);


  app.post('/customer', customersController.create);
  app.get('/transaction/:customerId/:transactionId', cache.route(), transactionsController.getSingle);

  // transaction/:customerId?amount=100&date=2017-12-25&offset=10&limit=2
  app.get('/transaction/:customerId', cache.route(), transactionsController.getByFilter);

  app.put('/transaction/:transactionId/:amount', transactionsController.update);
  app.delete('/transaction/:transactionId', transactionsController.delete);
  app.post('/:customerId/transaction', transactionsController.create);

  app.post('/signup', usersController.signup);
  app.post('/login', usersController.login);
  app.post('/logout', usersController.logout);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error occured');
  }, (req, res, next) => {
    res.status(404).send('Not Found');
  });
};
