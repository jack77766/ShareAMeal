const mongoose = require('mongoose');

const mealScheduleSchema = new mongoose.Schema({
    
    planID: String,
    schedule: [ 
        {
            date: Date,
            dateString: String,
            mealName: String,
            taken: {
                type: Boolean,
                default: 'false'
            },
            volunteer: {
                    name: String,
                    phone: String,
                    mealDesc: String
            }  
        }
    ]

})

module.exports = mongoose.model('MealSchedule', mealScheduleSchema); 




// const mongoose = require('mongoose');

// const mealScheduleSchema = new mongoose.Schema({
    
//     planID: String,
//     schedule: [ 
//         {
//             // day: {
//             //     type: String,
//             //     enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
//             // },
//             date: Date,
//             dateString: String,
//             meals: [
//                 {
//                     mealName: String,
//                     taken: {
//                         type: Boolean,
//                         default: 'false'
//                     },
//                     volunteer: {
//                             name: String,
//                             phone: Number,
//                             mealDescription: String
//                     }
//                 }
//             ]
//         }
//     ]

// })

// module.exports = mongoose.model('MealSchedule', mealScheduleSchema); 