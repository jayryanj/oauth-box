// This file doesn't work currently
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email })
        .then((user) => {
            if(user) {
                console.log(`Found user:\n${user}`);
                return done(null, user);
            }
        })
}));