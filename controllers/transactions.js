const transaction = require('../db/').transaction;
const formatDate = require('../lib/formatDate');

module.exports = {
  create(req, res) {
    return transaction
      .create(req.body.amount, req.params.customerId)
      .then((result) => {
        const {customerId, amount, id: transactionId, createdAt} = result[0];
        const date = formatDate(createdAt);

        res.status(201).send({
          customerId,
          transactionId,
          amount,
          date,
        });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  getSingle(req, res) {
    return transaction
      .findById(req.params.transactionId)
      .then((result) => {
        if (!result.length) {
          return res.status(404).send({error: 'No transaction found'});
        }

        const {id: transactionId, amount, createdAt} = result[0];
        const date = formatDate(createdAt);

        res.status(200).send({
          transactionId,
          amount,
          date,
        });
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  getByFilter(req, res) {
    const {customerId} = req.params;
    const {
      amount,
      date,
      offset,
      limit,
    } = req.query;

    return transaction
      .getTransactions(customerId, amount, date, offset, limit)
        .then((result) => {
          const formatedResult = result.map((val) => {
            const {customerId, amount, id: transactionId, createdAt} = val;
            const date = formatDate(createdAt);

            return {customerId, transactionId, amount, date};
          });

          res.status(200).send(formatedResult);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({error: "error occured"});
        });
  },

  update(req, res) {
    const {transactionId, amount} = req.params;

    return transaction
      .findById(transactionId)
      .then((result) => {
        if (!result.length) {
          return res.status(404).send({error: 'No transaction found'});
        }

        return transaction.update(transactionId, amount)
          .then((result) => {
            const {customerId, amount, id: transactionId, createdAt} = result[0];
            const date = formatDate(createdAt);

            res.status(200).send({
              customerId,
              transactionId,
              amount,
              date,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send({error: "Internal Error"});
          });
      });
  },

  delete(req, res) {
    return transaction
      .delete(req.params.transactionId)
        .then((result) => {
          if (!result.affectedRows) {
            return res.status(404).send({message: "Transaction not found"});
          }

          res.status(200).send({message: "Success"});
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({message: "Fail"});
        });
  },
};
