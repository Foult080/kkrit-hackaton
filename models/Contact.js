const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
    email: {
        type:String
    },
    title: {
        type: String,
    },
    form: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Contact = mongoose.model('contacts', ContactSchema);