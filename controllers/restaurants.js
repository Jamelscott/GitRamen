const express = require('express')
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js');
const { append } = require('express/lib/response');
const axios = require('axios')
require('dotenv').config()


router.get('/', (req, res)=>{

    
})




module.exports = router;