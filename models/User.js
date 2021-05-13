const mongoose = require("mongoose");
const passportLocalMongoose = ("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model("users", UserSchema);