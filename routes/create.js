const express       = require('express');
const router        = express.Router();
const mealDetail    = require('../models/mealDetail');
const mealSchedule  = require('../models/mealSchedule');
const { eachDayOfInterval } = require('date-fns');
const { format }    = require('date-fns');
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 10);


router.get('/create', (req, res) => {
    res.sendFile('/public/create.html', {root: './'});
});


router.post('/create', (req,res) => {
    console.log("In create post request, req.body: ", req.body);
    const planID = nanoid();  

    // CREATE MEAL DETAILS DOCUMENT

    const daysOfWeek = [];
        if(req.body.sunday    == 'on')  daysOfWeek.push(0);
        if(req.body.monday    == 'on')  daysOfWeek.push(1);
        if(req.body.tuesday   == 'on')  daysOfWeek.push(2);
        if(req.body.wednesday == 'on')  daysOfWeek.push(3);
        if(req.body.thursday  == 'on')  daysOfWeek.push(4);
        if(req.body.friday    == 'on')  daysOfWeek.push(5);
        if(req.body.saturday  == 'on')  daysOfWeek.push(6);
    
    // console.log("daysOfWeek array is: ", daysOfWeek);
        
    const meals = [];
        if(req.body.breakfast  == 'on')  meals.push('breakfast');
        if(req.body.lunch      == 'on')  meals.push('lunch');
        if(req.body.dinner     == 'on')  meals.push('dinner');
        

    const mealDetails = new mealDetail({
        planID: planID,
        organizer: {
            name:     req.body.organizerName, 
            email:    req.body.organizerEmail, 
            phone:    req.body.organizerPhone,
            password: req.body.organizerPassword
        },
        recipient: {
            name:  req.body.recipientName,
            email: req.body.recipientEmail,
            phone: req.body.recipientPhone
        },
        address: {
            address: req.body.address,
            city:    req.body.city,
            state:   req.body.state
        },
        schedule: {
            startDate: req.body.startDate,
            endDate:   req.body.endDate,
            daysOfWeek: daysOfWeek,
            meals: meals
        },
        extras: {
            allergies:   req.body.allergies.split(" "),
            preferences: req.body.preferences.split(" "),
            notes:       req.body.notes
        }

    }); 

    console.log("The meal details objects is: ", mealDetails);
    mealDetail.create(mealDetails, (err, result) => {
        console.log("error is: " + err);
        console.log("result is: " + result);
    });

    // CREATE MEALSCHEDULE DOCUMENT
    const datesForSchedule = getDatesForSchedule(
                                    new Date(req.body.startDate), 
                                    new Date(req.body.endDate), 
                                    daysOfWeek);
    
    const schedule = createSchedule(datesForSchedule, meals);
    console.log("The schedule is: ");
    console.table(schedule);
   
    mealSchedule.create({
        planID: planID,
        schedule: schedule
    })

    // res.send("You created a schedule, the id is: " + planID);
    res.redirect(`/schedule/${planID}`);    
}); //POST



function createSchedule(dates, meals) {
    let schedule = [];
    dates.forEach(date =>  {
        let formated = format(date, 'E LLL do');
        meals.forEach(meal =>  {
            schedule.push({
                date: date,
                dateString: formated,
                mealName: meal,
                taken: false,
                volunteer: {}
            })        
        });

    });
    return schedule;
}



//RETURNS AN ARRAY OF DATES THAT MATCH THE USERS FILTERS
function getDatesForSchedule(startDate, endDate, daysOfWeek) {
    
    let datesOfInterval = eachDayOfInterval({
        start: startDate, 
        end:   endDate
    });
    
    let datesForSchedule = datesOfInterval.filter(day => daysOfWeek.includes(day.getDay()));
    // console.log("The days for the schedule are: ", datesForSchedule);

    return datesForSchedule;
}



module.exports = router;