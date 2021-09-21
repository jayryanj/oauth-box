const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    token: {
        type: String,
        require: true
    },
    dateIssued: {
        type: Date,
        default: Date.now,
    },
    expire: {
        type: Date,
        default: Date.now
    }
});

module.exports = Token = mongoose.model("tokens", TokenSchema);