const express = require('express')
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js');
const { append } = require('express/lib/response');
require('dotenv').config()


// app.post('/', (req, res)=>{

//     db.gitramen.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     })

// })
module.exports = router;