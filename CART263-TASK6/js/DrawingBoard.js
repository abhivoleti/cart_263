class DrawingBoard {
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    this.mouseOffsetX = 0;
    this.mouseOffsetY = 0;

    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });
  }

  overCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    if (this.drawingBoardId === "partA") {
      // board A
    }
    if (this.drawingBoardId === "partB") {
      // board B
    }
    if (this.drawingBoardId === "partC") {
      // board C
    }
    if (this.drawingBoardId === "partD") {
      // make the rect follow the mouse
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        if (this.objectsOnCanvas[i].updatePositionRect) {
          this.objectsOnCanvas[i].updatePositionRect(this.mouseOffsetX, this.mouseOffsetY);
        }
      }
    }
  }

  clickCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    if (this.drawingBoardId === "partA") {
      // board A
    }
    if (this.drawingBoardId === "partB") {
      // board B
    }
    if (this.drawingBoardId === "partC") {
      // board C
    }
    if (this.drawingBoardId === "partD") {
      // change rect color on click
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        if (this.objectsOnCanvas[i].changeColor) {
          let newCol = {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255)
          };
          this.objectsOnCanvas[i].changeColor(newCol);
        }
      }
    }
  }

  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  clearObjs() {
    this.objectsOnCanvas = [];
  }

  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update();
      this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement) {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }
  }
}
