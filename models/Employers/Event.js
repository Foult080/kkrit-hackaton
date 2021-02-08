const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Event = mongoose.model('events', EventSchema);