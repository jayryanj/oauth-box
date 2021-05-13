const router = require("express").Router();
const { request, response } = require("express");

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