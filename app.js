const express = require('express');
const app     = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 10);


console.log('The nanoid is: ',nanoid());


app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));




mongoose.connect('mongodb://localhost/meals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});




const Organizer = require('./models/organizer');
const Recipient = require('./models/recipient');
const Address = require('./models/address');
const Schedule = require('./models/schedule');
const Extra = require('./models/extras');
const Meal = require('./models/meal');


const createRoutes = require('./routes/create')
app.use(createRoutes);




app.get('/', (req,res) => {
    res.sendFile('./public/index.html', { root: __dirname });
});

// app.get('/create', (req, res) => {
//     res.sendFile('./public/create.html', { root: __dirname })
// })

// app.post('/create', (req, res) => {
//     console.log(req.body);


    
    // const organizer = new Organizer({
    //   name:     req.body.organizerName, 
    //   email:    req.body.organizerEmail, 
    //   phone:    req.body.organizerPhone,
    //   password: req.body.organizerPassword
    // });
    // console.log(organizer);
    // console.log("OrganizerID: ", organizer._id)
    
    // Organizer.create(organizer);


    // const recipient = new Recipient({
    //   name:  req.body.recipientName,
    //   email: req.body.recipientEmail,
    //   phone: req.body.recipientPhone
    // });
    // console.log(recipient);

    // Recipient.create(recipient);

    // const address = new Address({
    //   address: req.body.address,
    //   city:    req.body.city,
    //   state:   req.body.state
    // });
    // console.log(address);

    // Address.create(address);

    // const daysOfWeek = {
    //   monday:    req.body.monday,
    //   tuesday:   req.body.tuesday,
    //   wednesday: req.body.wednesday,
    //   thursday:  req.body.thursday,
    //   friday:    req.body.friday,
    //   saturday:  req.body.saturday,
    //   sunday:    req.body.sunday,
    // }

    // const meals = {
    //   breakfast: req.body.breakfast,
    //   lunch:     req.body.lunch,
    //   dinner:    req.body.dinner
    // }


    // const schedule = new Schedule({
    //   startDate: req.body.startDate,
    //   endDate:   req.body.endDate,
    //   daysOfWeek: daysOfWeek,
    //   meals: meals
    // })
    // console.log(schedule);

    // Schedule.create(schedule);

    // const extra = new Extra({
    //   allergies:   req.body.allergies.split(" "),
    //   preferences: req.body.preferences.split(" "),
    //   notes:       req.body.notes
    // })
    // console.log(extra);

    // Extra.create(extra);


    // const meal = new Meal({
    //   mealID:    nanoid(),
    //   organizer: organizer.id,
    //   recipient: recipient.id,
    //   address:   address.id,
    //   schedule:  schedule.id,
    //   extras:    extra.id
    // })

    // console.log(meal);

//     res.send("You sent a post from Create")
// })



app.listen(3000, 'localhost', () => {
    console.log("Meal server open and listening");
})
