const router = require("express").Router();
const { request, response } = require("express");
const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");

/**
 * Endpoint - GET /api/
 * @description - Will return a welcome message. Mostly for testing.
 * 
 */
router.get("/", (request, response) => {
    response.status(200).json({message: "Hello, welcome to the OAuth Box api."})
});

// Regular register and login endpoints
router.post("/register", (request, response) => {
    // Basic validation check
    if(!(request.body.email && request.body.password)) {
        return response.status(400).json({message: "Missing required fields"});
    }

    User.findOne({email: request.body.email}).then(user => {
        if(user) {
            return response.status(400).json({message: "Email already exists."});
        } else {
            const newUser = new User({
                name: request.body.name,
                email: request.body.email,
                password: request.body.password
            });
            
            newUser.save()
                .then((user) => {response.json(user)})
                .catch((error) => {console.error(error)});

            // Hash the password using a salt generated in 12 rounds.
            bycrpt.genSalt(12, (error, salt) => {
                bycrpt.hash(newUser.password, salt, (error, hash) => {
                    if (error) {
                        console.error("Error while hashing the user password");
                    } else {
                        newUser.passsword = hash;
                        newUser
                            .save()
                            .then((user) => {response.json(user)})
                            .catch((error) => {console.error(error)});
                    }
                })
            })
        }
    });
});

router.post("/login", (request, response) => {

});


// OAuth 2.0 endpoints
/**
 * Endpoint - GET /api/oauth/authorize
 * @description - Get the OAuth login page for the third-party service.
 */
router.get("/oauth/authorize", (request, response) => {

});

/**
 * Endpoint - POST /api/oauth/approve
 * @description - Approves the login through OAuth with username, password, and requestID.
 */
router.post("/oauth/approve", (request, response) => {

});

router.post("/oauth/token", (request, response) => {

});


// Protected resource endpoints - only authorized requests are allowed from either regular login or OAuth 2.0
router.get("/user", (request, response) => {

});


module.exports = router;