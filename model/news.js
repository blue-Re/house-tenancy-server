const { STRING, NUMBER, DATE } = require('sequelize');
const { sequelize } = require('../db/index');

const News = sequelize.define('news', {
  id: {
    type: NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: STRING,
  title: STRING,
  author: STRING,
  online: {
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

module.exports = News;
