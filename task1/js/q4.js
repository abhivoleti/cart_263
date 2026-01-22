"use strict";

let rect1_x;
let rect1_y;

let rect2_x;
let rect2_y;

let rect3_x;
let rect3_y;

let rect1_color;
let rect2_color;
let rect3_color;

let w;
let h;

function setup() {
  console.log("go");

  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);

  rect1_color = { r: 255, g: 0, b: 250 };
  rect2_color = { r: 0, g: 255, b: 0 };
  rect3_color = { r: 0, g: 0, b: 255 };

  h = height;
  w = width / 3;

  rect1_x = 0;
  rect1_y = 0;

  rect2_x = width / 3;
  rect2_y = 0;

  rect3_x = (width / 3) * 2;
  rect3_y = 0;
}

function draw() {
  background(0, 0, 0);
  if (mouseX < width / 3) {
    rect1_color = { r: 255, g: 255, b: 255 };
  } else {
    rect1_color = { r: 255, g: 0, b: 250 };
  }

  if (mouseX > width / 3 && mouseX < (width / 3) * 2) {
    rect2_color = { r: 255, g: 255, b: 255 };
  } else {
    rect2_color = { r: 0, g: 255, b: 0 };
  }

  if (mouseX > (width / 3) * 2) {
    rect3_color = { r: 255, g: 255, b: 255 };
  } else {
    rect3_color = { r: 0, g: 0, b: 255 };
  }

  drawRectangle(
    rect1_x,
    rect1_y,
    w,
    h,
    rect1_color.r,
    rect1_color.g,
    rect1_color.b
  );

  drawRectangle(
    rect2_x,
    rect2_y,
    w,
    h,
    rect2_color.r,
    rect2_color.g,
    rect2_color.b
  );
  drawRectangle(
    rect3_x,
    rect3_y,
    w,
    h,
    rect3_color.r,
    rect3_color.g,
    rect3_color.b
  );
}

function drawRectangle(x, y, w, h, r, g, b) {
  fill(r, g, b);
  rect(x, y, w, h);
}
