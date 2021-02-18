const express = require('express');
const app     = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {body, validationResult } = require('express-validator');



app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const mealSchedule = require('./models/mealSchedule');

mongoose.connect('mongodb://localhost/meals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//    we're connected!
// });


const createRoutes = require('./routes/create');
const scheduleRoutes = require('./routes/schedule');
app.use(createRoutes);
app.use(scheduleRoutes);



app.get('/', (req,res) => {
    res.render('index');
});

app.get('/join', (req,res) => {
  res.render('join', {err:null});
})

app.post('/join', 
    body('scheduleID').trim().escape(),
    (req, res) => {
  let id = req.body.scheduleID;
  console.log(`In Join route user entered scheduleID: ${id}`);
  mealSchedule.findOne({planID: id}, (err,result) => {
    if(err) console.log("We had a problem looking for the meal schedule.")
    else {
      if(result == null) {
        res.render('join', {err: "Sorry we can't find a schedule with that ID"})
      }
      else {
        res.redirect(`/schedule/${id}`);
      }
    }
  })
});





app.listen(3000, 'localhost', () => {
    console.log("Meal server open and listening");
})
