const { STRING, NUMBER, DATE } = require('sequelize');
const { sequelize } = require('../db/index');

const Orders = sequelize.define('orders', {
  id: {
    type: NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  tenantId: NUMBER,
  tenantName: STRING,
  ownerId: NUMBER,
  ownerName: STRING,
  houseId: NUMBER,
  houseTitle: STRING,
  orderStatus: {
    type: NUMBER,
    defaultValue: 1,
  },
  createdAt: {
    type: DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DATE,
    allowNull: true,
  },
});

module.exports = Orders;
