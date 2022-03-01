//imports
const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cryptojs = require('crypto-js');
const { append } = require('express/lib/response');
require('dotenv').config();

//Sign up
router.get('/', (req, res) => {
  res.render('signup', { error: null });
});

//Create user
router.post('/', async (req, res) => {
  // checks if all fields have been filled in
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.render('signup', { error: 'Please fill in all three fields' });
  }
  // checks if email is in use
  let checkEmails = await db.user.findOne({
    where: { email: req.body.email },
  });
  if (checkEmails) {
    return res.render('signup', { error: 'email already in use' });
  }

  // check if username is in use, if not creates an entry with a hashed password
  let [newUser, created] = await db.user.findOrCreate({
    where: { username: req.body.username },
  });
  if (!created) {
    return res.render('signup', { error: 'username already in use' });
  } else {
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    newUser.email = req.body.email;
    newUser.password = hashedPassword;
    await newUser.save();
  }
  res.redirect('/');
});



module.exports = router;
