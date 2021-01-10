const mongoose = require('mongoose');

const extraSchema = new mongoose.Schema({
    allergies: [{
        type: String
    }],
    preferences: [{
        type: String
    }],
    notes: String
})

module.exports = mongoose.model('Extra', extraSchema)