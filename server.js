const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Used for local environment variables
const controller = require("./api/controller");
const passport = require("passport");
const { request } = require("express");

// Initialize environment variables from the .env file
dotenv.config(); 
const app = express();
app.use(express.urlencoded({extended: false})); // Parse URL-encoded bodies
app.use(passport.initialize());

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
    .catch((err) => console.error(err));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running. Listening on port: ${port}`));

