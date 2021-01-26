console.log("Schedule script up");

const volunteerBtns = document.querySelectorAll('[id^="volunteerBtn"]');
const volunteerDiv = document.querySelector('#volunteerDiv');
const blurDiv = document.querySelector('#blur');
const mealID = document.querySelector('#mealID');
const removeBtns = document.querySelectorAll('[id^="removeBtn"]');


volunteerBtns.forEach(btn => { 
    btn.addEventListener('click', volunteerButtonListener);
});

function volunteerButtonListener(event) {
    let btn = event.target;
    showVolunteerDiv(btn);
    console.log(`target's dataset is: `, event.target.dataset.meal_id);
    mealID.value = event.target.dataset.meal_id;
    document.addEventListener('click', e=> {
        if(e.target.id=='blur') {
            hideVolunteerDiv(btn);
            // document.removeEventListener('click');
        }
    });
}

function outsideClickHandler(event) {
    if(event.target.id=='blur') {
        hideVolunteerDiv(btn);
        document.removeEventListener('click');
    }
}


function showVolunteerDiv(btn) {
    btn.classList.add('button-highlight');
    volunteerDiv.classList.remove('hide');
    blurDiv.classList.remove('hide');
}

function hideVolunteerDiv(btn) {
    btn.classList.remove('button-highlight');
    blurDiv.classList.add('hide');
    volunteerDiv.classList.add('hide');
}

removeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        // mealID.value = e.target.dataset.meal_id;
        // console.log(`Remove button clicked for mealID: ${e.target.dataset.meal_id}`);
        let row = e.target.id;
        row = row.substring(row.indexOf('-'));       
        removeVolunteer(e.target.dataset.meal_id, row);
        // btn.class
        
    });
});



function removeVolunteer(mealID, row) {
    let scheduleSection = document.querySelector('#scheduleSection');
    let scheduleID = scheduleSection.dataset.schedule_id;
    // console.log(`schedule-id from data-attr is: ${scheduleID}`)
    let url = `http://localhost:3000/schedule/${scheduleID}/${mealID}`
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.onload = function () {
        document.querySelector(`#vname${row}`).innerHTML = null; 
        document.querySelector(`#vphone${row}`).innerHTML = null;
        document.querySelector(`#vmeal${row}`).innerHTML = null;
        document.querySelector(`#removeBtn${row}`).classList.add('hide');
        document.querySelector(`#volunteerBtn${row}`).classList.remove('hide');
        // window.location.replace(`/schedule/${scheduleID}`);

    };
    xhr.send(null);
}