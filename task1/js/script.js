"use strict";
function setup() {
    console.log("go")

    let r= 255;
    let g= 0;
    let b= 250;
    let x= 40;
    let y= 40;
    let h= 60;
    let w= 60;


    createCanvas(800, 600);
    background (0,0,0);

    fill(r, g, b);
    ellipse(x, y, w, h);
    x=90;
    y=90;
    r=0;
    g=255;
    b=0;
    w=70;
    h=70;
    fill(r, g, b);
    ellipse(x, y, w, h);
    x=150;
    y=150;
    r=0;
    g=0;
    b=255;
     w=90;
    h=90;
    fill(r, g, b);
    ellipse(x, y, w, h);
 
}

function draw() {

}

function drawEllipse(x,y,w,h,r,g,b){ //body}

}