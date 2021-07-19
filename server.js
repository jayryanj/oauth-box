const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Used for local environment variables
const controller = require("./api/controller");
const passport = require("passport");


// Initialize environment variables from the .env file
dotenv.config(); 
const clientApp = express(); // client client application server
const authServer = express(); // authorization server for

// Parse both JSON and url-encoded bodies
authServer.use(express.json()); 
authServer.use(express.urlencoded({extended: false}));

authServer.use(passport.initialize());
authServer.use(passport.session());
  
authServer.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 
  
// Pass API calls to the controller.
authServer.use("/api/", controller);
clientApp.use("/api/", controller);

// For client calls, send the static build files.
clientApp.use(express.static("client/build"));
clientApp.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
})

// Connect to MongoDB Atlas database using the URL from the environment variables.
const db = `${process.env.DB}`;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully connected to MongoDB Atlas database"))
    //.catch((err) => console.error(err));


const clientAppPort = process.env.PORT || 8080;
const authServerPort = 5000;

clientApp.listen(clientAppPort, () => console.log(`Client server running. Listening on port: ${clientAppPort}`));
authServer.listen(authServerPort, () => console.log(`Authorization server running. Listening on port: ${authServerPort}`));

