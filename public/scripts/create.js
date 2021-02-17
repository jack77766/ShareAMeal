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
    let oName = document.querySelector('#organizerName');
    console.log("The value of name was" , oName.value);
    if(document.querySelector('#organizerName').value == null) {
        console.log("No name was entered")
        alert("Please enter your name")
    }
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
    if(validDates()) {
        scheduleDiv.classList.add('hide');
        scheduleDiv.classList.remove('panel');
        extrasDiv.classList.remove('hide');
        console.log("schedule Submit Button Clicked")
    }
    else {
        alert("Invalid Dates, please try again.")
    }
})

function validDates() {
    const startDate = document.querySelector('#startDate');
    const endDate   = document.querySelector('#endDate');
    let sDate = new Date(startDate.value);
    let eDate = new Date(endDate.value);

    console.log(`startDate is ${startDate.value} of type: ${typeof startDate.value}`, sDate);
    console.log(`endDate is ${endDate} of type: ${typeof endDate}`, endDate );

    if(sDate <= eDate)
        return true;
    else return false;
}

function validDOW() {
    if((document.querySelector('#monday')      == 'on') ||
       (document.querySelector('#tuesday')     == 'on') ||
       (document.querySelector('#wednesday')   == 'on') ||
       (document.querySelector('#thursday')    == 'on') ||
       (document.querySelector('#friday')      == 'on') ||
       (document.querySelector('#saturday')    == 'on') ||
       (document.querySelector('#sunday')      == 'on') )
    return true;

    else return false;
}

extrasSubmitButton.addEventListener('click', (e)=> {
    console.log("extras Submit Button Clicked")
})

mealForm.addEventListener('submit', (e) => {
    // alert("Form submission attempt");
    e.preventDefault();
    if(!extrasDiv.classList.contains('hide')) {
        console.log("Submission from within extras")
        mealForm.submit();
    }
    else {
        console.log("Submission from outside extras")
    }
})




