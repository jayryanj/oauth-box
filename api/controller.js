const router = require("express").Router();
// MongoDB stuff
const { Mongoose } = require("mongoose");
const User = require("../models/User");
const Client = require("../models/Client");
const Grant = require("../models/Grant");

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

/**
 * Endpoint - GET /api/login
 * @description - Will initiate OAuth 2.0 by redirecting user to the third-party authorization server.
 */
router.get("/login", (request, response) => {
    const response_type = "code";
    const client_id = "9338563593176882"; 
    const scope = "name";
    const redirect_uri = encodeURIComponent("http://localhost:8080/api/callback"); // Need to URL encode this
    const state = "eqq8wOkP9e";
    // Build the redirect URL to the /authorize endpoint with the above query values
    const url = `http://localhost:5000/api/oauth/authorize?response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;
    response.redirect(url);

});

router.get("/callback", (request, response) => {
    const code = request.query.code;
    console.log(`Code is: ${code}`);
    // Call the \token endpoint here then redirect after confirmation.
    axios.post(`http://localhost:5000/api/oauth/token`, {
        grant_code: code
    })
    .then((axiosRes) => {
        console.log(axiosRes);
        response.redirect("http://localhost:3000/about/intro") // Need to change this in production/
    })
    .catch((error) => {
        console.log(error);
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


// ==========================================================================================================================
// OAuth 2.0 endpoints
/**
 * Endpoint - GET /api/oauth/authorize
 * @description - Get the OAuth login page for the third-party service.
 */
router.get("/oauth/authorize", (request, response) => {
    const response_type = request.query.response_type;
    const client_id = request.query.client_id; 
    const scope = request.query.scope;
    const redirect_uri = encodeURIComponent(request.query.redirect_uri);
    const state = request.query.state;

    response.redirect(`http://localhost:3000/login?response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`); // Need to change this for production
});

/**
 * Endpoint - POST /api/oauth/approve
 * @description - Approves the login through authentication with the given credentials.
 */
 router.post("/oauth/authorize", passport.authenticate("local", { session: false }), (request, response) => {
    // Failure to pass passport.authenticate() is responded with 401 Unauthorized by default.
    // Anything here is if passport.authenticate() passes
    const user = request.user;
    const client_id = request.header("client_id");

    console.log(`User: { Name: "${user.name}", email: "${user.email}" } successfully logged in.`);
    // Client needs to be registered with the authorization server.jj
    Client.findOne({ clientID: client_id }).then((client) => {
        if (client && client.redirectURI === request.header("redirect_uri")) {
            console.log(client); // Remove

            const grant = new Grant ({
                code: "K44rleghuvTWteKEZN6d", // Grant code is hard-coded for simulation purposes.
            });

            grant.save().then(() => {
                response.json({
                    success: true,
                    message: "Successful login", 
                    redirect_uri: client.redirectURI,
                    code: grant.code,
                    user: {
                        _id: user._id, 
                        name: user.name,
                        email: user.email
                    }
                });
            })

        } else {
            response.status(403).json({
                success: false,
                message: "Incorrect client credentials"
            });
        }
    })
    

});

router.get("/oauth/token", (request, response) => {
    console.log("Hello from the token endpoint")
    response.status(200).json({
        success: true,
        message: "Henlo"
    })
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