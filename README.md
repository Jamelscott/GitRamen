# GitRamenVancouver
-----
[Here is the deploy link](https://git-ramen.herokuapp.com/)

GitRamenVancouver is an exclusive webapp for ramen connoisseurs that allows logged-in users to rate and review the top ramen restaurants in the greater Vancouver area. Our site offers detailed information regarding the top rated ramen restaurants in the city as well as the opportunity for users to post their opiniona and give a personally rating for each restaurant. Our site offers an average rating of all reviews which in turn provides users will top notch recommendations.
Our hopes for this web app is to develop a web-home for Ramen lovers and provide a reliable resource for those looking to determine where to find the best ramen in the city.Log-in to gets started.

## Installation Instructions
-----

#### NPM packages to install

* Clone down this repo via HTTPS or SSH
* copy/paste to install the necessary npm modules
```
npm i axios bcrypt cookie-parser crypto-js dotenv ejs express express-ejs-layouts mapbox-gl method-override pg sequelize sequelize-cli 
```
* create a database called gitramen. SQL/Postgres uses, see below..
```
CREATE DATABASE gitramen
```
* Inside the config.json file adjust the username and password as per your machine (remove username and password if on a mac, adjust username and password for WSL)
* also in config.json, ensure your dialect is set to whatever database system you're using
* in your terminal, migrate your the gitramen database with the models that were cloned down. sequelize users can use the code below.
```
sequelize db:migrate
```
* create a .env file
* Choose a port number and secret
* aquire an API key from mapbox and yelp
Your .env file should looks like the following(with your own information filled out):
```
PORT=
SECRET=
YELP_ACCESS=
MAPBOX_ACCESS=
```
* Open your favourite browser and go to localhost:${PORT}. 


## API Choice
-----

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


![yelp api data](https://github.com/Jamelscott/P2-Ramen/blob/main/planning/YELP-API-DATA.PNG?raw=true)


## Entity Relationship Diagram
-----

![and RD](./planning/P2-ERD.png)

## RESTful Routing Chart
-----

| Method | Path | Purpose |
| ------ | -------------- | -------------------------------- |
| GET | `/` | home page that allows user to sign in or sends user to create an account |
| GET | `/signup` | sign up page to allow user access to the site |
| POST | `/` | user signs in and gets redirected to `GET /restaurants/index`  |
| POST | `/signup` | creates a new user, then redirects back to `GET /` to login |
| GET | `/restaurant/index` | page that shows all restaurants in the database |
| GET | `/restaurant/logout` | allows the user to log out, then redirects back to `GET /` |
| GET | `/restaurant/:id` | page that shows a specific restaurant where users can review/rate |
| POST | `/restaurant/:id/review` | creates a review, the user always stays on `GET /restaurant/"id` |
| PUT | `/restaurant/:id/review` | user can update one of their reviews, the user always stays on `GET /restaurant/"id` |
| DELETE | `/restaurant/:id/review` | user can delete one of their reviews, the user always stays on `GET /restaurant/"id` |

## Wireframes
-----

I chose to use [Figma](https://www.figma.com/) to create my wireframes. Please see the link below for a flow chart and/or the screenshots of that flow chart.

[Click here to see my flow chart on figma](https://www.figma.com/file/LrwZ9c6aqCjKA996gKSi7b/jamel?node-id=0%3A1)

### screenshots from figma



![Figma Sign-up page](https://github.com/Jamelscott/P2-Ramen/blob/main/planning/p2-signup.PNG?raw=true)
![Figma Sign-in page](https://github.com/Jamelscott/P2-Ramen/blob/main/planning/p2-signin.PNG?raw=true)
![Figma Detailed Restaurant page](https://github.com/Jamelscott/P2-Ramen/blob/main/planning/p2-detailrestaurant.PNG?raw=true)
![Figma All Restaurants page](https://github.com/Jamelscott/P2-Ramen/blob/main/planning/p2-allrestaurants.PNG?raw=true)


## User Stories
-----

* As a user, I want to sign up or create an account.
* as a user, I want to see a list of the highest rated Ramen restaurants in the city.
* as a user, I want to provide a personally rating for these restaurants.
* As a user, I want to provide my own feedback and share experiences I've had at these restaurants.
* As a user, I want to be able to log out to avoid any other people posting on my computer on my behalf.

## MVP goals
-----

- [x] Build a Sequelize model/SQL database of users that can be accessed to create and log-in users.
- [x] Generate between 6-20 ramen of the top rated ramen restaurants from YELP FUSION api and display them in a card-like format.
- [x] allow users to select a specific restaurant and display detailed information about that restaurant such as address, phone number, total reviews, average rating and pricing.
- [x] allow users to create, update and/or delete any number of reviews that they've posted.

## Stretch goals
-----

- [x] add styling that includes drop shadows, hover, images/emojis for star ratings and error effects.
- [x] allow user rating to be displayed as a star emoji instead of an integer.
- [ ] allow users to upvote or "like" restaurants on the index page and have those restaurants displayed in chronological order based on likes.
- [ ] allow users to input their own restaurants and allow the same functionality to include reviews/rating with those restaurants OR build in a form that allows logged in users to submit a request for a restaurant to be included in the index.Future:
- [ ] inpliment a feature that allows the user to input a city
- [ ] add responsiveness to single restaurant page and update page
- [ ] update small alignment bugs
- [ ] update pathing on update page to send you back to the page you were on previously, instead of the index.
- [ ] not a white background.
- [ ] add an average rating for each restaurant based on the reviews on GitRamen
- [ ] provide a directions link which will provide a link to google maps at a restaurant's location
- [ ] view all of your comments
- [ ] diamond in the rough: send a request to the dev to add a restaurant via email.
