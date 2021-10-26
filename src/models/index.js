'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./userModel');

let DATABASE_URL = process.env.DATABASE_URL  || 'sqlite:memory';

const options = process.env.NODE_ENV === 'production' 
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  } : {};

const sequelizeInstance = new Sequelize(DATABASE_URL, options);

const userTable = UserModel(sequelizeInstance, DataTypes);

module.exports = {
  db: sequelizeInstance,
  users: userTable,
};
