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
    let orgPhone = document.querySelector('#organizerPhone');
    // console.log("The value of name was" , oName.value);
    // if(document.querySelector('#organizerName').value == null) {
    //     console.log("No name was entered")
    //     alert("Please enter your name")
    // }
    
    orgName.reportValidity();
    orgEmail.reportValidity();
    if(orgEmail.checkValidity() && orgName.checkValidity() ) {
            organizerDiv.classList.add('hide');
            organizerDiv.classList.remove('panel');
            recipientDiv.classList.remove('hide');
    }
})

recipientSubmitButton.addEventListener('click', (e)=> {
    e.preventDefault();

    let rcptName = document.querySelector('#recipientName');
    rcptName.reportValidity();
    if(rcptName.checkValidity()) {
        recipientDiv.classList.add('hide');
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
        addressDiv.classList.remove('panel');
        scheduleDiv.classList.remove('hide');
    }
    console.log("address Submit Button Clicked")
})

scheduleSubmitButton.addEventListener('click', (e)=> {
    e.preventDefault();
    if(validDates() && validDOW() && validMeals() ) {
        scheduleDiv.classList.add('hide');
        scheduleDiv.classList.remove('panel');
        extrasDiv.classList.remove('hide');
        console.log("schedule Submit Button Clicked")
    }
    else {
        if(!validDates())
            alert("Invalid Dates, please try again.")
        else if(!validDOW()) 
            alert("Please pick at least one day for meals to be delivered");
        else if(!validMeals())
            alert("Please pick at least one meal to be made");
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
    if(document.querySelector('#monday').checked     ||
       document.querySelector('#tuesday').checked    ||
       document.querySelector('#wednesday').checked  ||
       document.querySelector('#thursday').checked   ||
       document.querySelector('#friday').checked     ||
       document.querySelector('#saturday').checked   ||
       document.querySelector('#sunday').checked     )
    return true;

    else return false;
}

function validMeals() {
    if((document.querySelector('#breakfast').checked) ||
       (document.querySelector('#lunch').checked    ) ||
       (document.querySelector('#dinner').checked   ) )
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




