const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
})

module.exports = mongoose.model('Recipient', recipientSchema);