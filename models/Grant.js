const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrantSchema = new Schema({
    code: {
        type: String,
        require: true
    },
    dateIssued: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: String,
        require: true
    },
    scope: {
        type: String,
        require: true
    }
});

module.exports = Grant = mongoose.model("grants", GrantSchema);