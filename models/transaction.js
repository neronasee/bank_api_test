'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });
  };

  return Transaction;
};
