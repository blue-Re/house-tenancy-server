const { STRING, NUMBER, DATE } = require('sequelize');
const { sequelize } = require('../db/index');

const Troubles = sequelize.define('troubles', {
  id: {
    type: NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  troubleContent: STRING,
  troubleTitle: STRING,
  houseTitle: STRING,
  houseId: NUMBER,
  createUser: STRING,
  troubleStatus: {
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

module.exports = Troubles;
