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
    .then(async function (response) {
        // handle success
        // create variables
        let currentRestaurant = response.data.businesses[req.params.id]
        // console.log(currentRestaurant)
        //create object of all reviews for single restaurant
            const restaurantAndReviews = await db.restaurant.findOne({
                where: {name: currentRestaurant.name},
                include: [db.review]
            })

            console.log(restaurantAndReviews.dataValues)
        
        res.render('restaurants/show.ejs', {restaurant:currentRestaurant,reviews:restaurantAndReviews.reviews})
    })
})

// route to post a review

router.post('/review', async (req, res)=>{

    const decryptedId = cryptojs.AES.decrypt(req.cookies.userId, process.env.SECRET)
    const decryptedIdString = decryptedId.toString(cryptojs.enc.Utf8)

    const [restaurant, create] = await db.restaurant.findOrCreate({
        where: {name: req.body.restaurant}
    })
    const newReview = await db.review.create({
        comment: req.body.review,
        rating: req.body.rating
    })
    restaurant.addReview(newReview)
    res.locals.user.addReview(newReview)
    // console.log(restaurant.reviews) // reviews for all of that restaurant
    

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