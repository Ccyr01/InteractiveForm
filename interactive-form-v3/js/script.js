/*
    Christian Cyr
    Javascript porject to make form interactive
    8/29/2023
*/
const name = document.getElementById("name");
const title = document.getElementById("title");
const color = document.getElementById("color");
const shirtDesigns =document.getElementById("shirt-designs");
const otherJobRole = document.getElementById("other-job-role");
window.onload = () => {
    //on page load highlight the name box
    name.focus();
    //keep job role hidden until event is changed
    otherJobRole.hidden = true;
    color.hidden = true;
}
title.addEventListener("change", e => {
    let eTarget = e.target.value;
    //if other is picked for job role 
    // allow user to type text
    if(eTarget == "other"){
        otherJobRole.hidden = false;
    }

})
// console.log(shirtDesigns.value);
// if(shirtDesigns.value === undefined){
//     color.hidden = true;
// }
shirtDesigns.addEventListener("change", e => {
    let eTarget = e.target.value;
    if(eTarget !== 'js puns' || eTarget !=='heart js'){
        alert(eTarget);
    }
})