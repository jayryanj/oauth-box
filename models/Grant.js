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
    }
});

module.exports = Grant = mongoose.model("grants", GrantSchema);