'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Transaction, {
      foreignKey: 'transactionId',
      as: 'transactions',
    });
  };
  return Customer;
};
