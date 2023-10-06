// Imports
require("dotenv").config(); // allows uses to acces env vars
const express = require("express");
const path = require("path");
var expressLayouts = require("express-ejs-layouts");
const app = express();
let ejs = require("ejs");
const cookieParser = require("cookie-parser");
const cryptoJS = require("crypto-js");
const db = require("./models/index.js");
const { send } = require("express/lib/response");
const bcrypt = require("bcrypt");
const axios = require("axios");
var methodOverride = require("method-override");
const port = process.env.PORT;

// Middleware
app.set("views", path.resolve(__dirname, "views")); //allwing me to use public folder for CSS and JS
app.use(expressLayouts); // lets know we want ot use layouts
app.set("view engine", "ejs");
app.use(cookieParser()); // gives access to req.cookies
app.use(express.urlencoded({ extended: false })); // body parser middleware
app.use(methodOverride("_method")); //allow use of methods PUT & DELETE
app.use(express.static(__dirname + "/public")); //allwing me to use public folder for CSS and JS

// Custom middleware
app.use(async (req, res, next) => {
  if (req.cookies.userId) {
    // decrypting the incoming user id from the cookie
    const decryptedId = cryptoJS.AES.decrypt(
      req.cookies.userId,
      process.env.SECRET
    );
    // converting the decrypted id into a readable string
    const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8);
    // console.log(decryptedIdString)
    // querying the db for the user with that id
    const user = await db.user.findByPk(decryptedIdString, {
      include: [db.review],
    });
    // assigning the found user to res.locals.user in the routes, and user in the ejs
    res.locals.user = user;
  } else res.locals.user = null;
  next(); // move on to next middleware
});

// Controllers
app.use("/restaurants", require("./controllers/restaurants.js"));
app.use("/signup", require("./controllers/signup.js"));

// // Routes
// Landing
app.get("/", (req, res) => {
  res.render("index", { error: null });
});
//Login User
app.post("/login", async (req, res) => {
  const user = await db.user.findOne({
    where: { username: req.body.username },
  });
  if (!user) {
    return res.render("index", { error: "Invalid username/password" });
  } else if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.render("index", { error: "Invalid username/password" });
  } else {
    const encryptedUserId = cryptoJS.AES.encrypt(
      user.id.toString(),
      process.env.SECRET
    );
    const encryptedUserIdString = encryptedUserId.toString();
    res.cookie("userId", encryptedUserIdString);

    res.redirect("/restaurants");
  }
});

//Logout User
app.get("/logout", (req, res) => {
  res.clearCookie("userId");
  res.redirect("/");
});

// Port activation
app.listen(port, () => {
  console.log(`🎙 P2 BABY! You're now listening to PORT ${port}🎙`);
});
