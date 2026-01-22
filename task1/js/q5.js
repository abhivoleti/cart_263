"use strict";

let counter=0;
let sq1= {
  x:50,
  y:50,
  w:50,
  h:50,
  color:
  {r:255,
  g:110,
  b:0
  }
}
let sq2= {
 x: 150,
    y: 50,
    w: 50,
    h: 50,
    color: 
    { 
        r: 255,
        g: 100,
        b: 0
    }
}

function setup() {
    createCanvas(600, 600);
    background(0, 0, 0);
}
function draw() {
  background(0,0,0);
  let circleRadius=60;
  let circleAlpha =255;
  displaySquare(sq1.x, sq1.y, sq1.w, sq1.h, sq1.color.r, sq1.color.g, sq1.color.b);
  displaySquare(sq2.x, sq2.y, sq2.w, sq2.h, sq2.color.r, sq2.color.g, sq2.color.b);

    
 mouseHover(sq1);
  mouseHover(sq2);


  let tempCounter=1;
  while (tempCounter<=counter){
    push();
    console.log(counter);
     circleRadius += 10;
      circleAlpha  -= 20;

      tempCounter ++;
    fill(255, 255, 255, circleAlpha + counter * 10);
     translate (width / 2, height / 2);
    circle(0,0,circleRadius);
    ellipseMode (CENTER);
    pop();

}
}

function displaySquare(x,y,w,h,r,g,b){ 
    fill(r, g, b);
    rect(x, y, w, h);
}

function sqHovering(sq)
{
  return  (mouseX > sq.x && 
    mouseX < sq.x + sq.w && 
    mouseY > sq.y && 
    mouseY <sq.y + sq.h);
}

function mouseHover (sq) {
    if (sqHovering(sq))
    {sq.color.g += 20 ;}
    else {
        sq.color.g = 100;
    }
}
function mousePressed() {
  if ((sqHovering(sq1) || sqHovering(sq2)) && counter <= 10) {
    counter++;
  }
}