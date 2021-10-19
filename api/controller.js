const router = require("express").Router();
// MongoDB stuff
const { Mongoose } = require("mongoose");
const User = require("../models/User");
const Client = require("../models/Client");
const Grant = require("../models/Grant");
const Token = require("../models/Token");

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
    console.log("GET /api/");
    response.status(200).json({message: "Hello, welcome to the OAuth Box api."})
});


/**
 * Endpoint - GET /api/login
 * @description - Will initiate OAuth 2.0 by redirecting user to the third-party authorization server.
 */
router.get("/login", (request, response) => {
    console.log("GET /api/login");
    const response_type = "code";
    const client_id = "9338563593176882"; 
    const scope = "name";
    const redirect_uri = encodeURIComponent("http://localhost:8080/api/callback"); // Need to URL encode this
    const state = "eqq8wOkP9e";

    // Build the redirect URL to the /authorize endpoint with the above query values
    const url = `http://localhost:5000/api/oauth/authorize?response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;

    console.log("Redirecting user to the OAuth authorize endpoint...")
    response.redirect(url);

});

/**
 * Endpoint - GET /api/callback
 * @description - Callback endpoint that the authorization server will redirect the user to.
 */
router.get("/callback", (request, response) => {
    console.log("GET /api/callback");
    const code = request.query.code;

    console.log("Exchanging grant for access token from token endpoint...")
    // Call the \token endpoint here then redirect after confirmation.
    axios.post(`http://localhost:5000/api/oauth/token`, {
        code: code
    })
    .then((tokenResponse) => {
        const token = tokenResponse.data.access_token; // Access token 
        console.log("Access token received. Contacting resource server for user data...")

        axios.get("http://localhost:5000/api/user/", {
            headers: {
                'access_token': token
            }
        })
        .then((userResponse) => {
            response.header("User", userResponse.data.data);
            response.redirect("http://localhost:3000/about/intro"); // TODO: Need to change this in production/
        })
        .catch((error) => {
            console.log(error);
        });
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
    console.log("POST /api/register");

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
    console.log("GET /api/oauth/authorize");
    const response_type = request.query.response_type;
    const client_id = request.query.client_id; 
    const scope = request.query.scope;
    const redirect_uri = encodeURIComponent(request.query.redirect_uri);
    const state = request.query.state;

    console.log("Redirecting user to client login page...")
    response.redirect(`http://localhost:3000/login?response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`); // Need to change this for production
});


/**
 * Endpoint - POST /api/oauth/approve
 * @description - Approves the login through authentication with the given credentials.
 */
 router.post("/oauth/authorize", passport.authenticate("local", { session: false }), (request, response) => {
    // Failure to pass passport.authenticate() is responded with 401 Unauthorized by default.
    // Anything here is if passport.authenticate() passes
    console.log("POST /api/oauth/authorize");
    const user = request.user;
    const client_id = request.header("client_id");

    console.log(`User: { name: "${user.name}", email: "${user.email}" } successfully logged in.`);

    // Client needs to be registered with the authorization server.jj
    // TODO: delegate client authentication to passport.js
    Client.findOne({ clientID: client_id }).then((client) => {
        if (client && client.redirectURI === request.header("redirect_uri")) {

            const grant = new Grant ({
                code: "K44rleghuvTWteKEZN6d", // Grant code is hard-coded for simulation purposes.
                user: user.email,
                scope: "name" // TODO: change from hard-coded value to the passed value.
            });

            console.log(`Issuing authorization grant to Client: { name: "${client.name}", clientID: ${client.clientID} } for User: { name: "${user.name}", email: "${user.email}" }`);

            grant.save().then(() => {
                response.json({
                    success: true,
                    message: "Successful login", 
                    redirect_uri: client.redirectURI,
                    code: grant.code,
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

/**
 * Endpoint - POST /api/oauth/token
 * @description - Receives an authorization grant and responds with an access token.
 */
router.post("/oauth/token", (request, response) => {
    console.log("POST /api/oauth/token");

    // Grants are one-time-use. Once a grant is received, delete it and return a multi-use token.
    // TODO: Delegate Grant authorization to passport.js -- this would mean calling passport.authenticate()
    Grant.findOneAndDelete({ code: request.body.code}).then((grant) => {
        console.log(`Grant: { code: ${grant.code} } received. Exchanging for access token...`)
        if(grant) {

            // Create a JWT token for the access token, store it, and send back to the client. 
            const token = jwt.sign({
                name: 'foo'
            }, 'secret', { expiresIn: '1h'});
    
            const accessToken = new Token({
                token: token,
                user: grant.user,
                scope: grant.scope
            })
    
            accessToken.save().then(() => {
                response.status(200).json({
                    success: true,
                    access_token: token
                });
            });
        } else {
            // If the grant isn't found, then respond back to client with 403 Forbidden
            response.status(403).json({
                success: false
            });
        }
    })
});


/**
 * Endpoint - GET /api/user
 * @description - Protected resource endpoints - only authorized requests are allowed from either regular login or OAuth 2.0
 */
// TODO: Delegate token authentication to passport.js by calling passpor.authenticate() (see the /api/oauth/authorize endpoint)
router.get("/user",  (request, response) => {
    console.log("GET /api/user");
    const access_token = request.headers.access_token

    // TODO: check if the token is expired. If it is, delete it. 
    Token.findOne({ token: access_token }).then((token) => {
        if (token) {
            User.findOne({ email: token.user }).then((user) => {
                if (user) {
                    let data = {};

                    // Check scope and append key-values to the data depending on the allowed scope.
                    // TODO: More robust scope checking. Could have scope with both name and email. Also, the type of access (e.g. read)
                    if (token.scope == "name") {
                        data.name = user.name
                    } 
                    if (token.scope == "email") {
                        data.email = user.email
                    }
    
                    response.status(200).json({
                        success: true,
                        data: data
                    });
                } else {
                    response.status(404).json({
                        success: false
                    });
                }
            })
        } else {
            response.status(403).json({
                success: false
            });
        }
    })
    
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