const bcrypt = require('bcrypt-nodejs');

class UserRepository {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
  }

  getIdByName(username) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'SELECT id FROM ' + this.tableName +
        ' WHERE username = ? LIMIT 1',
        [username],
        (error, result, fields) => {
          if (error) return reject(error);

          resolve(result);
        }
      );
    });
  }

  create(username, password) {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      this.db.query(
        'INSERT INTO ' + this.tableName +
        ' SET username = ?, salt = ?, password_hash = ?',
        [username, salt, hash],
        (error, result, fields) => {
          if (error) return reject(error);

          resolve(result);
        }
      );
    });
  }

  comparePassword(username, password) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'SELECT password_hash FROM ' + this.tableName +
        ' WHERE username = ? LIMIT 1',
        [username],
        (error, result, fields) => {
          if (error) return reject(error);

          bcrypt.compare(password, result[0].password_hash, (err, isMatch) => {
            if (err) return reject(err);
            resolve(isMatch);
          });
        }
      );
    });
  }
}

module.exports = UserRepository;
