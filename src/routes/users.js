'use strict';

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const { users } = require('../models');

router.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send(`Error Creating User, ${users}`); }
});

router.post('/signin', async (req, res) => {
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  try {
    const user = await users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { 
    res.status(403).send('Invalid Login' + error); 
  }
});

module.exports = router;
