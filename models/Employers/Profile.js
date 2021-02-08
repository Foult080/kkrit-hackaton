const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tel: {
        type: String,
        required: true
    },
    spec: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    skills: {
        type: [String],
        required: true
    },
    github: {
        type: String
    },
    experience: [{
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    }],
    desc: {
        type:String
    }
});


module.exports = Profile = mongoose.model('profiles', ProfileSchema);