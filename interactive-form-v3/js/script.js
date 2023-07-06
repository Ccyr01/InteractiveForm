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
// console.log(activitiesBox);
// for(let i = 0; i < activitiesBox.length; i++){
//     let checkboxName = activitiesBox[i].name;
//     console.log(checkboxName);
// }
activitiesBox.forEach((checkbox) => {
    checkbox.addEventListener('focus', (e) => {
        // console.log("focused" + checkbox.name);
        console.log("checkboxParent" + checkbox.parentNode);
        checkbox.parentNode.classList.add('focus')
    });

    checkbox.addEventListener('blur', (e) => {
        // console.log("blur" + checkbox.name);
        checkbox.parentNode.classList.remove('focus')

    });
})


//set credit card as default payment when screeen loads
payment.children[1].setAttribute('selected', 'selected');
//total cost initialized
let totalCost = 0;
let activities = 0;

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
    const ccIsValid = /(?:\d[ -]*?){13,16}/.test(creditCardValue);
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

//submit the form and if information is correct the page reloads
form.addEventListener('submit', e => {
    // e.preventDefault();
    let eTarget = e.target.value;
    let parent = e.target.parentNode;
    console.log(parent);
    console.log("activities: "+activities);
    if(activities == 0){
        console.log('fieldset '+fieldset);
        fieldset.lastElementChild.style.display = '';
        fieldset.classList.add('not-valid');
        fieldset.classList.remove('valid');
        e.preventDefault();
    }
    else{
    
        fieldset.lastElementChild.style.display = 'none';
        fieldset.classList.add('valid');
        fieldset.classList.remove('not-valid');

    }
    if(!nameValidator()){
        console.log('Invalid name prevented submission');
        parent.classList.add('not-valid');
        parent.classList.remove('valid');
        console.log("parent.lastElementChild" +parent.lastElementChild);
        parent.lastElementChild.style.display = '';
        e.preventDefault();
    }
    else{
        parent.classList.add('valid');
        parent.classList.remove('not-valid');
        parent.lastElementChild.style.display = 'none';

    }
    
    if(!emailValidator()){
        console.log('Invalid email prevented submission');
        parent.classList.add('not-valid');
        parent.classList.remove('valid');
        console.log("parent.lastElementChild" +parent.lastElementChild);
        parent.lastElementChild.style.display = '';


        e.preventDefault();
    }
    else{
        parent.classList.add('valid');
        parent.classList.remove('not-valid');
        parent.lastElementChild.style.display = 'none';

    }

    if(!creditCardValidator()){
        console.log('Invalid Credit card prevented submission');
        paymentMethods.classList.add('not-valid');
        paymentMethods.classList.remove('valid');
        console.log("parent.lastElementChild" +parent.lastElementChild);
        paymentMethods.lastElementChild.style.display = '';
        e.preventDefault();
    }
    else{
        paymentMethods.classList.add('valid');
        paymentMethods.classList.remove('not-valid');
        paymentMethods.lastElementChild.style.display = 'none';

    }
    if(!zipCodeValidator()){
        console.log('Invalid ZIP');
        paymentMethods.classList.add('not-valid');
        paymentMethods.classList.remove('valid');
        console.log("paymentMethods.lastElementChild" +paymentMethods.lastElementChild);
        paymentMethods.lastElementChild.style.display = '';
        e.preventDefault();
    }
    else{
        paymentMethods.classList.add('valid');
        paymentMethods.classList.remove('not-valid');
        paymentMethods.lastElementChild.style.display = 'none';

    }
    if(!cvvValidator()){
        console.log('Invalid cvv');
        paymentMethods.classList.add('not-valid');
        paymentMethods.classList.remove('valid');
        console.log("parent.lastElementChild" +paymentMethods.lastElementChild);
        paymentMethods.lastElementChild.style.display = '';
        e.preventDefault();
    }
    else{
        paymentMethods.classList.add('valid');
        paymentMethods.classList.remove('not-valid');
        paymentMethods.lastElementChild.style.display = 'none';

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

})
//based off designs change the color dropdown
shirtDesigns.addEventListener("change", e => {
    let eTarget = e.target;
    // console.log(colorOptions.dataset.selected)
    color.disabled = false;
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
