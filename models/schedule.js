const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    daysOfWeek: Object,
    meals: Object
})

module.exports = mongoose.model('Schedule', scheduleSchema);