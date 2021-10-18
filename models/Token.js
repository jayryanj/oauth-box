const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    token: {
        type: String,
        require: true
    },
    user: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true
    },
    issued: {
        type: Date,
        default: Date.now,
    },
    expire: {
        type: Date,
        default: new Date((new Date()).getTime() + 6*60*60000) // Expires in 6 hours
    }
});

module.exports = Token = mongoose.model("tokens", TokenSchema);