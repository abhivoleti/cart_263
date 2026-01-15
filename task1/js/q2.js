"use strict";
function setup() {
    console.log("go")

    createCanvas(800, 600);
    background (0,0,0);

    drawRectangle(40, 40, 60, 60, 255, 0, 250);
    drawRectangle(90, 90, 70, 70, 0, 255, 0);
    drawRectangle(150, 150, 90, 90, 0, 0, 255);
    
}

function draw() {

}

function drawRectangle(x,y,w,h,r,g,b){ 
    fill(r, g, b);
    ellipse(x, y, w, h);
}