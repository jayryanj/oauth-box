const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Used for local environment variables
const controller = require("./api/controller");
const passport = require("passport");
const { request } = require("express");
const User = require("./models/User");
const LocalStrategy = require("passport-local");
const { Passport } = require("passport");

// Initialize environment variables from the .env file
dotenv.config(); 
const app = express();

// Parse both JSON and url-encoded bodies
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); 
  

// Pass API calls to the controller.
app.use("/api/", controller);

// For client calls, send the static build files.
app.use(express.static("client/build"));
app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
})

// Connect to MongoDB Atlas database using the URL from the environment variables.
const db = `${process.env.DB}`;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully connected to MongoDB Atlas database"))
    //.catch((err) => console.error(err));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running. Listening on port: ${port}`));

