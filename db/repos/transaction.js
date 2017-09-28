class TransactionRepository {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
  }

  create(amount, customerId) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'INSERT INTO ' + this.tableName +
        ' SET amount = ?, customerId = ?',
        [amount, customerId],
        (error, result, fields) => {
          if (error) return reject(error);

          this.findById(result.insertId)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
        }
      );
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'SELECT id, amount, customerId, createdAt FROM ' + this.tableName +
        ' WHERE id = ? LIMIT 1',
        [id],
        (error, result, fields) => {
          if (error) return reject(error);

          resolve(result);
        }
      );
    });
  }

  getTransactions(customerId, amount, date, offset, limit) {
    return new Promise((resolve, reject) => {
      const conditions = this._buildConditions(customerId, amount, date, offset, limit);
      const sql = `SELECT id, amount, createdAt, customerId FROM ${this.tableName} ${conditions.where}`;
      this.db.query(
        sql,
        conditions.values,
        (error, result, fields) => {
          if (error) return reject(error);

          resolve(result);
        }
      );
    });
  }

  update(transactionId, amount) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'UPDATE ' + this.tableName +
        ' SET amount = ?, createdAt = CURRENT_TIMESTAMP' +
        ' WHERE id = ?',
        [amount, transactionId],
        (error, result, fields) => {
          if (error) return reject(error);

          this.findById(transactionId)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
        }
      );
    });
  }

  delete(transactionId) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'DELETE FROM ' + this.tableName +
        ' WHERE id = ?',
        [transactionId],
        (error, result, fields) => {
          if (error) return reject(error);

          resolve(result);
        }
      );
    });
  }

  _buildConditions(customerId, amount, date, offset=0, limit=10) {
    const conditions = [];
    const values = [];

    if (customerId) {
      conditions.push('customerId = ?');
      values.push(customerId);
    }

    if (amount) {
      conditions.push('amount = ?');
      values.push(amount);
    }

    if (date) {
      conditions.push('createdAt LIKE ?');
      values.push(`${date}%`);
    }

    return {
      where: conditions.length ? 'WHERE ' + conditions.join(' AND ').concat(' LIMIT ? OFFSET ?') : ' LIMIT ? OFFSET ?',
      values: values.concat(Number(limit), Number(offset)),
    };
  }
};

module.exports = TransactionRepository;
