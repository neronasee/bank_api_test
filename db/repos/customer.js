const moment = require('moment');

class CustomerRepository {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
  }

  create(name, cnp) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'INSERT INTO ' + this.tableName +
        ' SET name = ?, cnp = ?',
        [name, cnp],
        (error, result, fields) => {
          if (error) return reject(error);

          resolve(result);
        }
      );
    });
  }
};

module.exports = CustomerRepository;
