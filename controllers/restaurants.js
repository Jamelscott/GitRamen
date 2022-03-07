// imports
const express = require('express')
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js');
const { append, redirect } = require('express/lib/response');
const axios = require('axios');
const { sequelize } = require('../models');
var methodOverride = require('method-override');

require('dotenv').config()


// Get to update page
router.post('/update', (req, res)=>{

    console.log(req.query)
    const reviewData = req.body
    res.render('restaurants/update.ejs',{reviewData: reviewData} )
})
//updating reviews
router.put('/update', async (req, res)=>{


        
    const newComment = req.body.newComment
    const newRating = req.body.newRating
    const commentId = req.body.commentId
    console.log(commentId)

    const update = await db.review.update({
        comment: newComment,
        rating: newRating 
    }, {
        where: {id: commentId}
    })

    res.redirect('/restaurants/')

})

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
        let currentRestaurant = response.data.businesses[req.params.id-1]
        // console.log(currentRestaurant)
        //create object of all reviews for single restaurant
            const restaurantAndReviews = await db.restaurant.findOne({
                where: {yelpid: currentRestaurant.id},
                include: {
                    model: db.review,
                    include: db.user
                }
            })
            // console.log(restaurantAndReviews.reviews)
   

            // console.log(findUser)
            if(restaurantAndReviews === null){
                res.render('restaurants/show.ejs', {restaurant:currentRestaurant, reviews: null, userData: res.locals.user})
            } else {
                res.render('restaurants/show.ejs', {restaurant:currentRestaurant, reviews: restaurantAndReviews.reviews, userData: res.locals.user})
            }


    })
})

// route to post a review

router.post('/review', async (req, res)=>{
    // console.log(req.body.yelpIndex, req.body.restaurant)
    // this is allowing me to see the cookies/User Id
    const decryptedId = cryptojs.AES.decrypt(req.cookies.userId, process.env.SECRET)
    const decryptedIdString = decryptedId.toString(cryptojs.enc.Utf8)
    // Here I am about to make an entry into the resturant DB
    const [restaurant, create] = await db.restaurant.findOrCreate({
        where: {yelpid: req.body.yelpIndex, name: req.body.restaurant}
    })
    const newReview = await db.review.create({
        comment: req.body.review,
        rating: req.body.rating
    })
    
    restaurant.addReview(newReview)
    res.locals.user.addReview(newReview)
    res.redirect('back')
    // console.log(restaurant.reviews) // reviews for all of that restaurant
    

})
// Deleting comments
router.delete('/:id', (req, res)=>{
    
    db.review.destroy({
        where: {id: req.body.id}
    })

    res.redirect('back')

})

module.exports = router;