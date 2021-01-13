const mongoose = require('mongoose');

const mealDetailSchema = new mongoose.Schema({

    planID: String,
    organizer: {
        name: String,
        email: {
            type:String,
            unique: false
        },
        phone: String,
        password: String
    },
    recipient: {
        name: String,
        email: String,
        phone: String
    },
    address: {
        adress: String,
        city: String,
        state: String
    },
    schedule: {
        startDate: Date,
        endDate: Date,
        daysOfWeek: { type : Array , "default" : [] },
        meals: { type : Array , "default" : [] }
    },
    extras: {
        allergies: [{
            type: String
        }],
        preferences: [{
            type: String
        }],
        notes: String
    }

})

module.exports = mongoose.model('MealDetail', mealDetailSchema);



// schedule: {
//     startDate: Date,
//     endDate: Date,
//     daysOfWeek: [
//         {
//             type: String,
//             enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
//         }
//     ],
//     meals: [
//         {
//             type: String,
//             enum: ['Breakfast', 'Lunch', 'Dinner']
//         }
//     ]
// }