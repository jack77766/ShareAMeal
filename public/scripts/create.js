console.log("script up");

const organizerSubmitButton   = document.querySelector('#organizerSubmitButton');
const recipientSubmitButton   = document.querySelector('#recipientSubmitButton');
const addressSubmitButton     = document.querySelector('#addressSubmitButton');
const scheduleSubmitButton    = document.querySelector('#scheduleSubmitButton');
const extrasSubmitButton      = document.querySelector('#extrasSubmitButton');
const organizerDiv    = document.querySelector('#organizerDiv');
const recipientDiv    = document.querySelector('#recipientDiv');
const addressDiv      = document.querySelector('#addressDiv');
const scheduleDiv     = document.querySelector('#scheduleDiv');
const extrasDiv       = document.querySelector('#extrasDiv');
const mealForm        = document.querySelector('#mealForm');



organizerSubmitButton.addEventListener('click', (e)=> {
    e.preventDefault();
    organizerDiv.classList.add('hide');
    organizerDiv.classList.remove('panel');
    recipientDiv.classList.remove('hide');
})

recipientSubmitButton.addEventListener('click', (e)=> {
    e.preventDefault();
    recipientDiv.classList.add('hide');
    recipientDiv.classList.remove('panel');
    addressDiv.classList.remove('hide');
    console.log("Recipient Submit Button Clicked")
})

addressSubmitButton.addEventListener('click', (e)=> {
    e.preventDefault();
    addressDiv.classList.add('hide');
    addressDiv.classList.remove('panel');
    scheduleDiv.classList.remove('hide');
    console.log("address Submit Button Clicked")
})

scheduleSubmitButton.addEventListener('click', (e)=> {
    e.preventDefault();
    scheduleDiv.classList.add('hide');
    scheduleDiv.classList.remove('panel');
    extrasDiv.classList.remove('hide');
    console.log("schedule Submit Button Clicked")
})

extrasSubmitButton.addEventListener('click', (e)=> {
    console.log("extras Submit Button Clicked")
})

mealForm.addEventListener('submit', (e) => {
    // alert("Form submission attempt");
    e.preventDefault();
    if(!extrasDiv.classList.contains('hide')) {
        console.log("Submission from withing extras")
        mealForm.submit();
    }
    else {
        console.log("Submission from outside extras")
    }
})




