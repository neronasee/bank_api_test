const Transaction = require('../models').Transaction;

module.exports = {
  create(req, res) {
    return Transaction
      .create({
        amount: req.body.amount,
        customerId: req.params.customerId,
      })
      .then((transaction) => {
        const {customerId, id: transactionId, createdAt: date} = transaction;

        res.status(201).send({
          customerId,
          transactionId,
          date,
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  getSingle(req, res) {
    return Transaction
      .findOne({
        where: {id: req.params.transactionId},
        attributes: ['id', 'amount', 'createdAt'],
      })
      .then((transaction) => {
        const {id: transactionId, amount, createdAt: date} = transaction;
        res.status(200).send({
          transactionId,
          amount,
          date,
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  getByFilter(req, res) {
    const {
      customerId,
      amount,
      offset,
      limit,
    } = req.params;

    return Transaction
      .findAll({
        where: {
          customerId,
          amount,
        },
        offset: +offset,
        limit: +limit,
        attributes: ['id', 'amount', 'createdAt'],
      })
      .then((transactions) => {
        res.status(200).send(transactions);
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    const {transactionId, amount} = req.params;

    return Transaction
      .findById(transactionId, {
        attributes: ['id', 'amount', 'updatedAt'],
      })
      .then((transaction) => {
        if (!transaction) {
          return res.status(404).send({
            message: 'Not Found',
          });
        }
        return transaction
          .update({
            amount,
          })
          .then(() => res.status(200).send(transaction))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  delete(req, res) {
    return Transaction
      .findById(req.params.transactionId, {
        attributes: ['id'],
      })
      .then((transaction) => {
        if (!transaction) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return transaction
          .destroy()
          .then(() => res.status(200).send({
            message: 'Success',
          }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  list() {
    return new Promise((resolve, reject) => {
      Transaction
        .findAll({
          attributes: ['id', 'amount', 'createdAt'],
        })
        .then((transactions) => {
          return resolve(transactions);
        })
        .catch((error) => reject(error));
    });
  },
};
