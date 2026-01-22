let c1radius = 40;
let c1colour = null;
let circleequal = true
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  c1colour = {
    r: random (0, 255),
    g: random (0, 255),
    b: random (0, 255)
}
}

function draw() {
  background(0, 0, 0);
  push();
   translate (c1radius/2, c1radius/2);
      for (let i = 0; i < width; i += c1radius){
        for (let j = 0; j < height; j += c1radius){
          fill (c1colour.r, c1colour.g, c1colour.b);
           if (circleequal === true) {
                circle (i, j, c1radius);
            }
            else {
                rect (i-20, j-20, c1radius, c1radius);
            }
        
   }
}
   pop();
}

function keyPressed (){
    console.log(key)
    if (key === " "){

    c1colour.r = random (0, 255);
    c1colour.g = random (0, 255);
    c1colour.b = random (0, 255);
    };
  }

function mousePressed (){
    if (circleequal === true){
        circleequal = false;

    }
    else {
        circleequal = true;
    }
}


