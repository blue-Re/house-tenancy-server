const mysql = require('mysql');
const { Sequelize } = require('sequelize');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'gz200025',
  database: 'house_tenancy_administration',
});

const sequelize = new Sequelize(
  'house_tenancy_administration', // database
  'root', // username
  'gz200025', // password
  {
    host: 'localhost',
    dialect: 'mysql',
  },
);

module.exports = {
  connection,
  sequelize,
};
