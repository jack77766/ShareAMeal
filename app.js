const express = require('express');
const app     = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');



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
    res.sendFile('./public/index.html', { root: __dirname });
});





app.listen(3000, 'localhost', () => {
    console.log("Meal server open and listening");
})
