'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
      set(val) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(val, salt);

        this.setDataValue('salt', salt);
        this.setDataValue('password_hash', hash);
      },
    },
  });

  User.prototype.comparePassword = function(password) {
    if (!password) return cb(false);
    const currentPass = this.password_hash;
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, currentPass, function (err, isMatch) {
        if (err) reject(err);
        resolve(isMatch);
      });
    });
  };

  return User;
};
