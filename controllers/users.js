const express = require('express')
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config()


router.get('/profile', (req, res)=>{
    res.render('./users/profile.ejs')
})


router.get('/new', (req, res)=>{

    res.render('./users/new')
})

router.post('/', async (req, res)=>{

    const [newUser, created] = await db.user.findOrCreate({
        where: {email: req.body.email}
    })
    if(!created){
        console.log('User already exists')
        //render login page and send appropriate message
    } else{ 
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.password = hashedPassword
        await newUser.save()

        // encrypt the user id via AES to be sorted in cookie
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        console.log(encryptedUserIdString)
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')

    }
    // db.user.findOrCreate({
    //     where:{
    //     email: req.body.email
    //     }
    // })

})

router.get('/login', (req, res)=>{

    res.render('./users/login.ejs', {error: null})

})

router.post('/login', async (req, res)=>{

    const user = await db.user.findOne({where: {email: req.body.email}})

    if(!user){
        console.log("user not found!")
        res.render('users/login.ejs', {error: "invalid email/password"})
    } else if (!bcrypt.compareSync(req.body.password, user.password)){
        console.log('Incorrect Password')
        res.render('users/login.ejs', {error: 'Invalid email/password'})
    } else {

        console.log("logging in the user!")

        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()

        res.cookie('userId', encryptedUserIdString)

        res.redirect('/')
    }

})

router.get('/logout', (req, res)=>{

    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})
module.exports = router;