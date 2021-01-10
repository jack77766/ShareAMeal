const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    mealID: {
        type: String,
        index: true,
        unique: true
    },
    organizer: {type: mongoose.Schema.Types.ObjectId, ref: 'Organizer'},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipient'},
    address:   {type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
    schedule:  {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'},
    extras:    {type: mongoose.Schema.Types.ObjectId, ref: 'Extra'}

})

module.exports = mongoose.model('Meal', mealSchema);