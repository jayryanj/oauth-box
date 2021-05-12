const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Used for local environment variables

// Initialize environment variables from the .env file
dotenv.config(); 

const app = express();

app.use(express.urlencoded()); // Parse URL-encoded bodies

/* Connect to MongoDB Atlas database using the URL from the environment variables.
const db = `${process.env.DB}`;
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("Successfully connected to MongoDB Atlas database"))
    .catch((err) => console.error(err));
*/

// Start app 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running. Listening on port: ${port}`));

