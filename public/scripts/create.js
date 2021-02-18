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
    let orgName = document.querySelector('#organizerName');
    let orgEmail = document.querySelector('#organizerEmail');
    // let orgPhone = document.querySelector('#organizerPhone');
    // console.log("The value of name was" , oName.value);
    // if(document.querySelector('#organizerName').value == null) {
    //     console.log("No name was entered")
    //     alert("Please enter your name")
    // }
    
    orgName.reportValidity();
    orgEmail.reportValidity();
    if(orgEmail.checkValidity() && orgName.checkValidity() ) {
            organizerDiv.classList.add('hide');
            window.scrollTo(0,0);
            organizerDiv.classList.remove('panel');
            recipientDiv.classList.remove('hide');
    }
})

recipientSubmitButton.addEventListener('click', (e)=> {
    e.preventDefault();

    let rcptName = document.querySelector('#recipientName');
    let rcptEmail = document.querySelector('#recipientEmail');
    rcptName.reportValidity();
    rcptEmail.reportValidity();
    if(rcptName.checkValidity() && rcptEmail.checkValidity()) {
        recipientDiv.classList.add('hide');
        window.scrollTo(0,0);
        recipientDiv.classList.remove('panel');
        addressDiv.classList.remove('hide')
    }
    console.log("Recipient Submit Button Clicked")
})

addressSubmitButton.addEventListener('click', (e)=> {
    e.preventDefault();
    let address = document.querySelector('#address');
    let city    = document.querySelector('#city');
    address.reportValidity();
    city.reportValidity();
    if(address.checkValidity() && city.checkValidity() ) {
        addressDiv.classList.add('hide');
        window.scrollTo(0,0);
        addressDiv.classList.remove('panel');
        scheduleDiv.classList.remove('hide');
    }
    console.log("address Submit Button Clicked")
})

scheduleSubmitButton.addEventListener('click', (e)=> {
    e.preventDefault();
    try {
        validDates();
        validDOW();
        validMeals();
        scheduleDiv.classList.add('hide');
        window.scrollTo(0,0);
        scheduleDiv.classList.remove('panel');
        extrasDiv.classList.remove('hide');
        console.log("schedule Submit Button Clicked")
    }
    catch(e) {
        alert(e.message);
    }
    // if(validDates() && validDOW() && validMeals() ) {
    //     scheduleDiv.classList.add('hide');
    //     window.scrollTo(0,0);
    //     scheduleDiv.classList.remove('panel');
    //     extrasDiv.classList.remove('hide');
    //     console.log("schedule Submit Button Clicked")
    // }
    // else {
    //     // if(!validDates())
    //     //     alert("Invalid Dates, please try again.")
    //     // else if(!validDOW()) 
    //     //     alert("Please pick at least one day for meals to be delivered");
    //     // else if(!validMeals())
    //     //     alert("Please pick at least one meal to be made");
    // }
})

function validDates() {
    const startDate = document.querySelector('#startDate');
    const endDate   = document.querySelector('#endDate');
    let sDate = new Date(startDate.value);
    let eDate = new Date(endDate.value);
    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    let maxDate = new Date(sDate)
    maxDate.setMonth(sDate.getMonth() + 6);
    maxDate.setHours(0,0,0,0);
    // console.log(`Max date is ${maxDate}:${maxDate.value}`)
    // console.log(`startDate is ${startDate.value} of type: ${typeof startDate.value}`, sDate);
    // console.log(`endDate is ${endDate.value} of type: ${typeof endDate.value}`, endDate );
    
    if(sDate > eDate)
        throw new Error('Please select an end-date that is after the start-date');
    else if (sDate < currentDate)
        throw new Error('Please pick a start-date on or after today');
    else if(eDate > maxDate) {
        // console.log(`startdate is: ${sDate}`)
        // console.log(`Max date is ${maxDate}:${maxDate.value}`)
        throw new Error('Please change the end-date, schedule cannot be longer than 6 months');
    }

    else return true;
}

function validDOW() {
    if(document.querySelector('#monday').checked     ||
       document.querySelector('#tuesday').checked    ||
       document.querySelector('#wednesday').checked  ||
       document.querySelector('#thursday').checked   ||
       document.querySelector('#friday').checked     ||
       document.querySelector('#saturday').checked   ||
       document.querySelector('#sunday').checked     )
    return true;

    else throw new Error('Please select at least one day of the week');
}

function validMeals() {
    if((document.querySelector('#breakfast').checked) ||
       (document.querySelector('#lunch').checked    ) ||
       (document.querySelector('#dinner').checked   ) )
    return true;

    else throw new Error('Please select at least one meal');
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




