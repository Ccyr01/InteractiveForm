// alert("JS connected");
const name = document.getElementById("name");
const title = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
window.onload = () => {
    name.focus();
    otherJobRole.hidden = true;
}
title.addEventListener("change", e => {
    alert("eventListening");
})