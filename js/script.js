/*
    Christian Cyr
    Javascript project to make form interactive
    8/29/2023
*/

//All the elements I'm going to need access to
const name = document.getElementById("name");
const title = document.getElementById("title");
const color = document.getElementById("color");
const shirtDesigns =document.getElementById("shirt-designs");
const otherJobRole = document.getElementById("other-job-role");
const colorOptions = document.getElementById("color").childNodes;
const fieldset = document.getElementById('activities');
const acitvitiesCost = document.getElementById('activities-cost');
const paymentMethods = document.getElementsByClassName('payment-methods');
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const email = document.getElementById('email');
const ccnum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvvBox = document.getElementById('cvv');
const form = document.querySelector('form');
const activitiesBox = document.querySelectorAll('#activities-box input');
const expMonth = document.getElementById('exp-month');
const expYear = document.getElementById('exp-year');
//total cost initialized
let totalCost = 0;
let activities = 0;
// console.log(activitiesBox);
// for(let i = 0; i < activitiesBox.length; i++){
//     let checkboxName = activitiesBox[i].name;
//     console.log(checkboxName);
// }
activitiesBox.forEach((checkbox) => {
    checkbox.addEventListener('focus', (e) => {
        // console.log("focused" + checkbox.name);
        checkbox.parentNode.classList.add('focus')
    });

    checkbox.addEventListener('blur', (e) => {
        // console.log("blur" + checkbox.name);
        checkbox.parentNode.classList.remove('focus')

    });
})
expMonth.addEventListener('change',  e => {
    console.log(e.target.value);
})

//set credit card as default payment when screeen loads
payment.children[1].setAttribute('selected', 'selected');



//hide certain properties and focus on the name which is the first box
window.onload = () => {
    //on page load highlight the name box
    name.focus();
    //keep job role hidden until event is changed
    otherJobRole.hidden = true;
    color.disabled = true;
    paypal.hidden = true;
    bitcoin.hidden = true;
}

const nameValidator = () => {
    let nameValue = name.value;  
    let nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    return nameIsValid;
  
}
const emailValidator = () => {
    let emailValue = email.value;   
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
}
const creditCardValidator = () => {
    let creditCardValue = ccnum.value;
    const ccIsValid = /^\d{13,16}$/.test(creditCardValue);
    return ccIsValid;
}
const zipCodeValidator = () => {
    let zipValue = zip.value;
    const zipIsValid = /^\d{5}$/.test(zipValue);
    return zipIsValid;
}
const cvvValidator = () => {
    let cvvValue = cvvBox.value;
    // console.log(`zip value is: ${cvvValue}`);
    const cvvIsValid = /^\d{3}$/.test(cvvValue);
    // console.log(`cvv validation test on "${cvvValue}" evaluates to ${cvvIsValid}`);
    return cvvIsValid;
}
//function adds the class for the not-valid style, so
// the user could tell what they are missing from the form
function notValidStyler(element){
    if(element == fieldset){
        element.classList.add('not-valid');
        element.classList.remove('valid');
    }
    else if(element == expMonth || element == expYear){
        element.classList.add('not-valid');
        element.classList.remove('valid');
    }
    else{
        element.parentNode.classList.add('not-valid');
        element.parentNode.classList.remove('valid');
        element.parentNode.lastElementChild.style.display = '';
    }
}
// function adds style for a valid filled in portion of form
function validStyler(element){
    if(element == fieldset){
        element.classList.add('valid');
        element.classList.remove('not-valid');
        element.lastElementChild.style.display = 'none';

    }
    else if(element == expMonth || element == expYear){
        element.classList.add('valid');
        element.classList.remove('not-valid');
    }
    else{
        element.parentNode.classList.add('valid');
        element.parentNode.classList.remove('not-valid');
        element.parentNode.lastElementChild.style.display = 'none';
    }
}
//submit the form and if information is correct the page reloads
form.addEventListener('submit', e => {
    let eTarget = e.target.value;

    //ACTIVITIES VALIDATOR
    if(activities == 0){
        e.preventDefault();
        notValidStyler(fieldset);
        document.getElementById('activities-hint').style.display = 'block';

    }
    else{
        validStyler(fieldset);
    }

    //NAME VALIDATOR
    if(!nameValidator()){
        e.preventDefault();
        notValidStyler(name);
        document.getElementById('name-hint').style.display = 'block';
    }
    else{
        validStyler(name);
    }

    //EMAIL VALIDATOR
    if(!emailValidator()){
        e.preventDefault();
        notValidStyler(email);
        document.getElementById('email-hint').style.display = 'block';
        
    }
    else{
        validStyler(email);
    }

    //if payment is valid additional checks made
    if(payment.value == 'credit-card'){
        if(!creditCardValidator()){
            e.preventDefault();
            notValidStyler(ccnum);
            let span = document.createElement("span");
            span.setAttribute("id", "cc-hint");
            document.getElementById('cc-hint').textContent = "Please Enter Your Credit Card Number";
            document.getElementById('cc-hint').style.display = 'block';
        }
        else{
            validStyler(ccnum);
        }
        if(!zipCodeValidator()){       
            e.preventDefault();
            notValidStyler(zip);
            let span = document.createElement("span");
            span.setAttribute("id", "zip-hint");
            document.getElementById('zip-hint').textContent = "Please Enter Your Zip Code";
            document.getElementById('zip-hint').style.display = 'block';
        }
        else{
            validStyler(zip);
        }
        if(!cvvValidator()){
            e.preventDefault();
            notValidStyler(cvvBox);
            let span = document.createElement("span");
            span.setAttribute("id", "cvv-hint");
            document.getElementById('cvv-hint').textContent = "Please Enter Your CVV on back of card";
            document.getElementById('cvv-hint').style.display = 'block';
        }
        else{
            validStyler(cvvBox);
        }
        //Only if expiration month and year was required I could add to this
        // if(expMonth.value == 'Select Date'){
        //     e.preventDefault();
        //     notValidStyler(expMonth)
            
        // }
        // else{
        //     validStyler(expMonth);
        // }
        // if(expYear.value == 'Select Year'){
        //     e.preventDefault();
        //     notValidStyler(expYear);
            
        // }
        // else{
        //     validStyler(expYear);

        // }
    }
})

//when payment type is changed hide the other two
payment.addEventListener('change', e => {
    let eTarget = e.target;
    if(eTarget.value === 'paypal'){
        // console.log('Paypal true');
        paypal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;
    }
    else if(eTarget.value === 'bitcoin'){
        paypal.hidden = true;
        creditCard.hidden = true;
        bitcoin.hidden = false;
    }
    else{
        paypal.hidden = true;
        creditCard.hidden = false;
        bitcoin.hidden = true;
    }
})

//add up correct cost based on checked boxes
fieldset.addEventListener("change", e => {
    let eTarget = e.target;
    let dataCost = +(eTarget.getAttribute('data-cost'));
    if(eTarget.checked){
        totalCost += dataCost;
        activities++;
        acitvitiesCost.innerHTML = `Total: $${totalCost}`;
    }
    else{
        totalCost -= dataCost;
        activities--;
        acitvitiesCost.innerHTML = `Total: $${totalCost}`;

    }

})

//display extra box for user to type into if the other option is selected 
title.addEventListener("change", e => {
    let eTarget = e.target.value;
    //if other is picked for job role 
    // allow user to type text
    if(eTarget == "other"){
        otherJobRole.hidden = false;
    }
    else{
        otherJobRole.hidden = true;
    }

})

//based off designs change the color dropdown
shirtDesigns.addEventListener("change", e => {
    let eTarget = e.target;
    // console.log(colorOptions.dataset.selected)
    color.disabled = false;

    // 'Now Select A Color' shows up because you already picked a design;
    colorOptions[1].innerHTML = 'Now Pick a Color!';

    for(let i = 2; i < colorOptions.length; i++){
        if(colorOptions[i].dataset){
            colorOptions[i].hidden = true;
            colorOptions[i].selected=false;
        }
    } 
    if(eTarget.value === 'js puns'){
        color.hidden = false;
        for(let i = 2; i < colorOptions.length; i++){
            if(colorOptions[i].dataset){
                if(colorOptions[i].dataset.theme === 'heart js'){
                
                colorOptions[i].hidden = true;
                }
                else{
                    colorOptions[i].hidden = false;
                }
            }
        } 
    }
        
    else if(eTarget.value ==='heart js'){
        color.hidden = false;
        for(let i = 2; i < colorOptions.length; i++){
            if(colorOptions[i].dataset){
                if(colorOptions[i].dataset.theme === 'js puns'){
                
                colorOptions[i].hidden = true;
                
                }
                else{
                    colorOptions[i].hidden = false;
                }
            }
        }
    }
})
