#GitRamenVancouver

## Pitch
GitRamenVancouver is an exclusive webapp for ramen connoisseurs that allows logged-in users to rate and review the top ramen restaurants in the greater Vancouver area. Our site offers detailed information regarding the top rated ramen restaurants in the city as well as the opportunity for users to post their opiniona and give a personally rating for each restaurant. Our site offers an average rating of all reviews which in turn provides users will top notch recommendations. What sets us apart from YELP and Google is that we vet users to ensure only the most high brow ramen aficionados are eledigle to rate and voice their opinion by tesing each user's ramen knowledge before allowing them access.
Our hopes for this web app is to develop a web-home for Ramen lovers and provide a reliable resource for those looking to determine where to find the best ramen in the city.


## API Choice

### YELP FUSION
YELPs API 'yelp fusion' provides access to any establishedment on YELP with a minumum of 1 review. I plan to use a query search to extract data with a location of VANCOUVER and a keyword of RAMEN. 
In order to access this data, I am required to request an access key and send that access key at each GET request via the header. 

I plan to use the AXIOS npm to make that request and receive a JSON payload and the DOTENV npm to keep my accesscode proviate.
See example code below: 
```
app.get('/', (req, res)=>{

    const url = `https://api.yelp.com/v3/businesses/search?location=vancouver&categories=ramen`
    const header = {headers: {Authorization: 'Bearer ' + process.env.YELP_ACCESS}}
    axios.get(url, header)
  .then(function (response) {
    // handle success
    res.send(response.data);
  })
  .catch (error){
      console.log(error)
  }
})
```

#### API Data I will be extracting

- name
- image
- review count
- rating
- pricing
- address (Street)
- address (City)
- phone number


![yelp api data](https://github.com/Jamelscott/P2-Ramen/blob/main/YELP-API-DATA.PNG?raw=true)


## Entity Relationship Diagram

![and RD](./P2-ERD.PNG)



## Wireframes


**[link to figma doc](https://www.figma.com/file/LrwZ9c6aqCjKA996gKSi7b/jamel?node-id=0%3A1)**

### screenshots from figma



![Figma Sign-up page](https://github.com/Jamelscott/P2-Ramen/blob/main/p2-signup.PNG?raw=true)
![Figma Sign-in page](https://github.com/Jamelscott/P2-Ramen/blob/main/p2-signin.PNG?raw=true)
![Figma Detailed Restaurant page](https://github.com/Jamelscott/P2-Ramen/blob/main/p2-detailrestaurant.PNG?raw=true)
![Figma All Restaurants page](https://github.com/Jamelscott/P2-Ramen/blob/main/p2-allrestaurants.PNG?raw=true)


