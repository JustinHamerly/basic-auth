'use strict';

require('dotenv').config();
const { start } = require('./src/server');
const { db } = require('./src/models');

const PORT = process.env.PORT || 3001;

db.sync().then(() => {
  start(PORT);
});
