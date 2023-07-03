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
const option = document.getElementById("color").childNodes;
console.log(option[1].dataset.theme);

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
    let eTarget = e.target;
    console.log(option[1].dataset.theme);

    // for(let i = 2; i < option.length; i++){
    //     if(option[i].dataset){
    //         console.log(option[i]);
    //         console.log(option[i].dataset.theme);
    //         // option[i].hidden = true;
    //         // console.log(i);
    //     }
    // }
    // console.log(eTarget.childNodes);
    if(eTarget.value === 'js puns'){
        color.hidden = false;
        for(let i = 2; i < option.length; i++){
            if(option[i].dataset){
                if(option[i].dataset.theme === 'heart js'){
                console.log(option[i]);
                console.log(option[i].dataset.theme);
                option[i].hidden = true;
                // option[i].hidden = true;
                // console.log(i);
                }
            }
        } 
        // }if(eTarget.value === option)
        // // option[2].hidden = true;
        // // option[3].hidden = true;
        // // option[4].hidden = true;

        // // console.log()
        
        
    }
        
    else if(eTarget.value ==='heart js'){
        color.hidden = false;
        for(let i = 2; i < option.length; i++){
            if(option[i].dataset){
                if(option[i].dataset.theme === 'js puns'){
                console.log(option[i]);
                console.log(option[i].dataset.theme);
                option[i].hidden = true;
                // option[i].hidden = true;
                // console.log(i);
                }
            }
        }
    }
})
color.addEventListener("change", e => {
    if(e.target.value === 'darkslategrey'){
        console.log(e.target.value);
        console.log(e.target.dataset.theme);

        console.log("true");
    }
})