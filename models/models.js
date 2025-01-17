const mongoose = require('mongoose');


const organizerSchema = new mongoose.Schema({
    name: String,
    email: {
        type:String,
        unique: false
    },
    phone: String,
    password: String
});

module.exports = mongoose.model('Organizer', organizerSchema);



const recipientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
})

module.exports = mongoose.model('Recipient', recipientSchema);



const addressSchema = new mongoose.Schema({
    adress: String,
    city: String,
    state: String
})

module.exports = mongoose.model('Address', addressSchema);


const scheduleSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    daysOfWeek: Object,
    meals: Object
})

module.exports = mongoose.model('Schedule', scheduleSchema);

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