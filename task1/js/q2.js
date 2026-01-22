"use strict";
function setup() {
    console.log("go")

    createCanvas(800, 600);
    background (0,0,0);

    drawEllipse(40, 40, 60, 60, 255, 0, 250);
    drawEllipse(90, 90, 70, 70, 0, 255, 0);
    drawEllipse(150, 150, 90, 90, 0, 0, 255);
    
}

function draw() {

}

function drawEllipse(x,y,w,h,r,g,b){ 
    fill(r, g, b);
    ellipse(x, y, w, h);
}
