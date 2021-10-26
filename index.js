'use strict';

const app = require('./src/server');
require('dotenv').config();
const PORT = process.env.port || 3001;

app.start(PORT);
