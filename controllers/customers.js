const customer = require('../db').customer;

module.exports = {
  create(req, res) {
    const {name, cnp} = req.body;

    return customer
      .create(name, cnp)
      .then((result) => {
        res.status(201).send({customerId: result.insertId});
      })
      .catch((error) => res.status(400).send(error));
  },
};
