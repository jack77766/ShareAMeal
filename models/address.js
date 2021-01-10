const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address: String,
    city: String,
    state: String
})

module.exports = mongoose.model('Address', addressSchema);