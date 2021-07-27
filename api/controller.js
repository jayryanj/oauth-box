const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");

// TODO: Move this to app_clients.json later
const CLIENT_ID = "000001";
const CLIENT_SECRET = "cnuO9GpR0siqSZH";
const REDIRECT = "/about/intro";
const LOGIN = "/login";

/**
 * Endpoint - GET /api/
 * @description - Will return a welcome message. Mostly for testing.
 * 
 */
router.get("/", (request, response) => {
    response.status(200).json({message: "Hello, welcome to the OAuth Box api."})
});

router.get("/test", (request, response) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };

    axios.get("http://localhost:5000/api/", null, config)
        .then((res) => {
            response.status(200).json(res.data);
        })
        .catch((error) => {
            console.error(error);
        })

});

// Regular register and login endpoints
/**
 * Endpoint - POST /api/register
 * 
 */
router.post("/register", (request, response) => {
    // Basic validation check
    if(!(request.body.email && request.body.password && request.body.name)) {
        return response.status(400).json({success: false, message: "Missing required fields"});
    }

    let newUser = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    });

    bcrypt.genSalt(10, (error, salt) => {
        if(error) {
            console.error(error);
            response.status(500).json({success: false, message: "Failed to generate password salt."})
        } else {
            bcrypt.hash(newUser.password, salt, (error, hash) => {
                if(error) {
                    console.error(error);
                    response.status(500).json({succes: false, message: "Failed to securely hash the password."});
                } else {
                    newUser.password = hash;
                    newUser.save().then(() => {
                        // Success
                        response.status(200).json({success: true, message: `User successfully created: ${newUser.name}`});

                    }).catch((error) => {
                        console.error(error);
                        response.status(500).json({success: false, message: "Failed to store user."});
                    });
                }
            });
        }
    });
});



// OAuth 2.0 endpoints
/**
 * Endpoint - GET /api/oauth/authorize
 * @description - Get the OAuth login page for the third-party service.
 */
router.get("/oauth/authorize", (request, response) => {
    response.status(200).json({
        url: LOGIN,
        scopes : request.body.scopes
    })
});

router.get("/oauth/redirect", (request, response) => {
    response.redirect(`http://localhost:3000/login`); // Need to change this for production
});

/**
 * Endpoint - POST /api/oauth/approve
 * @description - Approves the login through authentication with the given credentials.
 */
 router.post("/oauth/approve", passport.authenticate("local", { session: false }), (request, response) => {
    // Failure to pass passport.authenticate() is responded with 401 Unauthorized by default.
    // Anything here is if passport.authenticate() passes
    const user = request.user;

    console.log(`User: { Name: "${user.name}", email: "${user.email}" } successfully logged in.`)
    response.json({
        success: true,
        message: "Successful login", 
        user: {
            _id: user._id, 
            name: user.name,
            email: user.email
        }
    });
});

router.post("/oauth/token", (request, response) => {
    
});


// Protected resource endpoints - only authorized requests are allowed from either regular login or OAuth 2.0
router.get("/user", passport.authenticate(),  (request, response) => {

});


// Passport local strategy configuration
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    console.log(`Attempting to authenticate: ${email}`);
    User.findOne({ email }).then((user) => {
        if(!user) {
            console.log(`User not found: ${email}`);
            return done(null, false, {message: "User not found"});
        } else {
            bcrypt.compare(password, user.password).then((isMatch) => {
                if(!isMatch) {
                    return done(null, false, {message: "Incorrect password"});
                } else {
                    return done(null, user);
                }
            })
        }
    });
}));





module.exports = router;