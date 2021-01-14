const express = require('express');
const app     = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mealDetail   = require('./models/mealDetail');
const mealSchedule = require('./models/mealSchedule');


// const { customAlphabet } = require('nanoid');
// const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// const nanoid = customAlphabet(alphabet, 10);
// console.log('The nanoid is: ',nanoid());


app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');



mongoose.connect('mongodb://localhost/meals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


const createRoutes = require('./routes/create');
app.use(createRoutes);



app.get('/', (req,res) => {
    res.sendFile('./public/index.html', { root: __dirname });
});


app.get('/schedule/:id', async (req,res) => {
  try{
    const meal = await getMeal(req.params.id);
    const schedule = await getSchedule(req.params.id);
    console.log("sched.sched", schedule.schedule);
    res.render('schedule', {schedule:schedule.schedule, meal : meal});
  }
  catch(err) {
    res.send(err);
  }
  
      
});

async function getMeal(id) {
  try {
    const meal =  await mealDetail.findOne({'planID' : id });
    console.log("we found the meal details : ", meal);
    return meal;
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });

  }
}


async function getSchedule(id) {
  try {
    const schedule = await mealSchedule.findOne({'planID' : id});
    console.log("We found the schedule: ", schedule);
    return schedule;
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
}



app.listen(3000, 'localhost', () => {
    console.log("Meal server open and listening");
})
