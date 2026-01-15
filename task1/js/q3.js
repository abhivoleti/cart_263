
"use strict";

let rect1_x;
let rect1_y;

let rect2_x;
let rect2_y;

let rect3_x;
let rect3_y;

let r=255;
let g=0;
let b=250;
let w=60;
let h=60;

function setup() {
    console.log("go")

    createCanvas(800, 600);
    background (0,0,0);

    rect1_x=40;
    rect1_y=40;

    rect2_x=140;
    rect2_y=40;

    rect3_x=230;
    rect3_y=40;

    
    
}

function draw() {
    background (0,0,0);
    if(mouseIsPressed){
    rect1_y=rect1_y+10; 
    }
    if(rect1_y>height){
        rect1_y=0;
    }

    rect3_y=rect3_y+10;
     if(rect3_y>height){
        rect3_y=0;
    }
 
    drawRectangle(rect1_x, rect1_y,w,h,r,g,b);

    drawRectangle(rect2_x, rect2_y,w,h,r,g,b);
    drawRectangle(rect3_x, rect3_y,w,h,r,g,b);
}

function drawRectangle(x,y,w,h,r,g,b){ 
    fill(r, g, b);
    rect(x, y, w, h);
}

function keyPressed(){
    if(key===" "){
        rect2_x+=10;
    }
}