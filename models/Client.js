const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    clientID: {
        type: String,
        require: true
    },
    redirectURI: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
});

module.exports = Client = mongoose.model("clients", ClientSchema);