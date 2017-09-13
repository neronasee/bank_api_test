const Customer = require('../models').Customer;

module.exports = {
  create(req, res) {
    return Customer
      .create({
        name: req.body.name,
        cnp: req.body.cnp,
      })
      .then((customer) => {
        res.status(201).send({customerId: customer.dataValues.id});
      })
      .catch((error) => res.status(400).send(error));
  },
};
