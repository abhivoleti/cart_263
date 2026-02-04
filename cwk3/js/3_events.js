window.onload = setup;
function setup() {
console.log("events!");

let introSection = document.querySelector("#intro");
introSection.addEventListener("click", mouseClickCallback)

let s1 = document.querySelector("#s1");
s1.addEventListener("click", mouseClickCallback);

let s2 = document.querySelector("#s2");
s2.addEventListener("click", mouseClickCallback);

let allSections = document.querySelectorAll(".mouseclick-active-section");
for(let currentSectin of allSections){
currentSectin.addEventListener("click", mouseClickCallback);
}

function mouseClickCallback(eventObj){
// console.log("clicked!");
// console.log(this)
console.log(eventObj)
this.style.background = "lightblue";
let idOfThis = this.geAtAttribute("id");
// console.log(document.querySelector("#" + idOfThis + " p"));
// console.log(document.querySelector('#${idOfThis}p'))


if(this.getAttribute("custom-bool") != "active"){

let child = document.querySelector(`#${idOfThis} p`);
let classToAdd = '${idOfThis}-section-active'
this.classList.add(classToAdd);
let classToAddP = '${idOfThis}-section-p-active'
child.classList.add(classToAddP);
console.log(this.geAtAttribute("custom-bool"))
this.setAttribute("custom-bool", "active");
}
else{
    if(this.getAttribute("custom-bool") != "active"){
    
let child = document.querySelector(`#${idOfThis} p`);
let classToAdd = '${idOfThis}-section-active'
this.classList.remove(classToAdd);
let classToAddP = '${idOfThis}-section-p-active'
child.classList.add(classToAddP);
console.log(this.geAtAttribute("custom-bool"))
this.setAttribute("custom-bool", "active");

}
}

function mouseClick1Callback(){
console.log("s1");
}
}
}