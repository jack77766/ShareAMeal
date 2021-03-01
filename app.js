const express = require('express');
const app     = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {body, validationResult } = require('express-validator');
require('dotenv').config()


app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const mealSchedule = require('./models/mealSchedule');


const DB_LOCAL = 'mongodb://localhost/meals';
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  console.log(`DB_URI: ${DB_URI}`);

mongoose.connect(DB_URI, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).catch(err =>  {
  console.log(err);
  console.log("Go to local???");
})

const db = mongoose.connection;

db.on('error', err => {
  console.log("In new error on db 'error' ");
  console.log(err);
});

db.on('disconnected', err => {
  console.log("We have a disconnection error");
  console.log(err);
})

db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//    we're connected!
// });




// const MongoClient = require('mongodb').MongoClient;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
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
