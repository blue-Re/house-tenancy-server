const { STRING, NUMBER, DATE } = require('sequelize');
const { sequelize } = require('../db/index');

const User = sequelize.define('users', {
  id: {
    type: NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: STRING,
  password: STRING,
  type: NUMBER,
  createdAt: {
    type: DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DATE,
    allowNull: true,
  },
});

module.exports = User;
