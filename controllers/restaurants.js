// imports
const express = require('express')
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js');
const { append } = require('express/lib/response');
const axios = require('axios');
const { sequelize } = require('../models');
require('dotenv').config()

// Route to Restaurant Index page
router.get('/', (req, res)=>{
    const url = `https://api.yelp.com/v3/businesses/search?location=vancouver&categories=ramen`
    const header = {headers: {Authorization: 'Bearer ' + process.env.YELP_ACCESS}}
    axios.get(url, header)
    .then(function (response) {
        // handle success
        let restaurants = response.data.businesses

        res.render('restaurants', {restaurant: restaurants})
        // res.send(restaurants)
    })
})

// Route to Single Restaurant page
router.get('/:id', (req, res)=>{
    const url = `https://api.yelp.com/v3/businesses/search?location=vancouver&categories=ramen`
    const header = {headers: {Authorization: 'Bearer ' + process.env.YELP_ACCESS}}
    axios.get(url, header)
    .then(function (response) {
        // handle success
        let restaurants = response.data.businesses
        res.render('restaurants/show.ejs', {i:req.params.id,restaurant:restaurants,})
    })
}),

// route to post a review

router.post('/review', async (req, res)=>{
console.log(user)
    // const [restaurant, create] = await db.restaurant.findOrCreate({
    //     where: {name: req.body.restaurant},
    //     include: [db.review]
    // })
    // // console.log(restaurant)
    // const newReview = await db.review.create({
    //     comment: req.body.review,
    //     rating: req.body.rating, 
    //     include: [db.restaurant, db.user]
    // })
    // const user = await db.user.findOne({
    //     where: {name: }
    // })
    // restaurant.addReview(newReview)

    


})





{/* <div id="map" style="width: 400px; height: 300px"></div>
<form action="/review" method="POST">
  <label for="">Add a review: </label>
  <input type="text" name="review" id="review" />
  <label for="">Add a rating:</label>
  <input type="number" name="rating" id="rating" min="1" max="5"/>
  <input type="submit" />
</form> */}

module.exports = router;