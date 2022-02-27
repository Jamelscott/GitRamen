// Imports
const express = require('express')
var expressLayouts = require('express-ejs-layouts');
require('dotenv').config() // allows uses to acces env vars
const app = express();
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js');
const db = require('./models/index.js');
const port = 3001

// Middleware
app.set('view engine', 'ejs');
app.use(expressLayouts); // lets know we want ot use laoyouts
app.use(cookieParser()) // gives access to req.cookies
app.use(express.urlencoded({ extended: false })); // body parser middleware

// Custom middleware
app.use(async (req, res, next)=>{
    if(req.cookies.userId){
        // decrypting the incoming user id from the cookie
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        // converting the decrypted id into a readable string
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        // console.log(decryptedIdString)
        // querying the db for the user with that id
        const user = await db.user.findByPk(decryptedIdString)
        // assigning the found user to res.locals.user in the routes, and user in the ejs
        res.locals.user = user
    } else res.locals.user = null
    next() // move on to next middleware
})

// Controllers
app.use('/users', require('./controllers/users.js'))


// Routes
app.get('/', (req, res)=>{

    res.render('index.ejs')

})



app.listen(port, ()=>{

    console.log(`🎙 you're now listening to PORT ${port} 🎙`)
})

