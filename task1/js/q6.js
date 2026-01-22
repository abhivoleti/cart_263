
function setup() {
createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
}
function draw() {
  background(0,0,0);
  push();
  fill(255,0,0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("test",width/2, height/2);
  pop();

  push();
  fill(255);
  translate(25,25);
  textSize(16);
  textAlign(LEFT, TOP);
  for (let i=1; i<=10; i++)
    {
      let x = 20 * i;
      text(i, x, 0);
      }
      for (let i=15; i >=0; i--)
      {
        let y =30*i;
        text(i,0,y);
      }
      pop();
}