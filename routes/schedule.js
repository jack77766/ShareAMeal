const express = require('express');
const router  = express.Router();
const mealDetail    = require('../models/mealDetail');
const mealSchedule  = require('../models/mealSchedule');
// const mongoose = require('mongoose');



router.get('/schedule/:id', async (req,res) => {
    try{
      const meal = await getMeal(req.params.id);
      const schedule = await getSchedule(req.params.id);
      // console.log("sched.sched", schedule.schedule);
      res.render('schedule', {schedule:schedule.schedule, planID: schedule.planID, meal : meal});
    }
    catch(err) {
      res.send(err);
    }   
  });
  
  
  router.delete('/schedule/:id/:meal', async (req, res) => {
    try {
      console.log(`Received a delete request for schedule: ${req.params.id} and meal: ${req.params.meal}`);
    
      await mealSchedule.findOneAndUpdate({'planID': req.params.id, 'schedule._id': req.params.meal}, {
        'schedule.$.taken': false,
        'schedule.$.volunteer.name' : null,
        'schedule.$.volunteer.phone' : null,
        'schedule.$.volunteer.mealDesc' : null
      }, (err, res) => {
          if(err) console.log(`received and error removing a volunteer at app.delete`);
          else console.log("Succesfully removed the volunteer.");
        }
      );
      // console.log("in app.delete finished updating going to redirect");
      res.send("Success");
      // res.redirect(`/schedule/${req.params.id}`);
    }
    catch(err) {
      res.send("There was an at delete route");
    }
  });
  
  
  
  
  router.post('/schedule/:id', async (req, res) => {
    try {
      let name = req.body.name;
      let phone = req.body.phone;
      let mealDesc = req.body.mealDesc;
    
      await mealSchedule.findOneAndUpdate({'planID': req.params.id, 'schedule._id': req.body.mealID}, {
        'schedule.$.taken': true,
        'schedule.$.volunteer.name': name,
        'schedule.$.volunteer.phone': phone,
        'schedule.$.volunteer.mealDesc': mealDesc 
      }, (err, res) => {
        if(err) console.log(`we got an error updating the volunteer`, err);
        else console.log('Succesfully updated the volunteer');
      });
      
      // res.json({
      //   message: "You sent a post request from schedule volunteer div",
      //   mealID: req.body.mealID,
      //   name: name,
      //   phone: phone,
      //   mealDesc: mealDesc    
      // });
    
      res.redirect(`/schedule/${req.params.id}`);
    }
    catch(err) {
      console.log("There was an error at post route");
    }
  
  })
  
  async function getMeal(id) {
    try {
      const meal =  await mealDetail.findOne({'planID' : id });
      // console.log("we found the meal details : ", meal);
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
      // console.log(`planID is : ${schedule.planID}`)
      // console.log("We found the schedule: ", schedule);
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
  

module.exports = router;