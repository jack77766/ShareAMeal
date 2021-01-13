const mongoose = require('mongoose');

const mealScheduleSchema = new mongoose.Schema({
    
    planID: String,
    schedule: [ 
        {
            // day: {
            //     type: String,
            //     enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
            // },
            date: Date,
            meals: [
                {
                    mealName: String,
                    volunteer: {
                            name: String,
                            phone: Number,
                            mealDescription: String
                    }
                }
            ]
        }
    ]

})

module.exports = mongoose.model('MealSchedule', mealScheduleSchema); 