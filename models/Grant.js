const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrantSchema = new Schema({
    code: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    scope: {
        type: String,
        require: true
    },
    issued: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Grant = mongoose.model("grants", GrantSchema);