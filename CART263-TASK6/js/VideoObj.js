class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY = 10;
    this.shapeCol = { r: 0, g: 0, b: 0 };
    // blur filter
    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");
    this.userProvidedBlur = 0;
    let self = this;
    filterButton_blur.addEventListener("click", function () {
      //get value from input field
      self.userProvidedBlur = blurInput.value;
      console.log(self.userProvidedBlur);
    });
    // sepia filter
    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");
    this.userProvidedSepia = 0;
    filterButton_sepia.addEventListener("click", function () {
      //get value from input field
      self.userProvidedSepia = sepiaInput.value;
      console.log(self.userProvidedSepia);
    });
    //hue filter
    let filterButton_hue = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");
    this.userProvidedHue = 0;   // fixed typo: was userProvideHue
    filterButton_hue.addEventListener("click", function () {
      //get value from input field
      self.userProvidedHue = hueInput.value;   // fixed typo: was userProvideHue
      console.log(self.userProvidedHue);
    });
    //invert filter
    let filterButton_invert = document.getElementById("filter_button_invert");
    let invertInput = document.getElementById("invertnum");
    this.userProvidedInvert = 0;
    filterButton_invert.addEventListener("click", function () {
      // get value from input field
      self.userProvidedInvert = invertInput.value;
      console.log(self.userProvidedInvert);
    });
  }

  display() {
    this.context.save();
    // all filters must be set in one assignment as a single string
    this.context.filter = `blur(${this.userProvidedBlur}px) sepia(${this.userProvidedSepia}%) hue-rotate(${this.userProvidedHue}deg) invert(${this.userProvidedInvert}%)`;
    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);
    this.context.filter = "none";
    // fixed: removed extra } in template string, use shapeCol object properly
    this.context.fillStyle = `rgb(${this.shapeCol.r},${this.shapeCol.g},${this.shapeCol.b})`;
    this.context.fillRect(this.shapeX, this.shapeY, 50, 50);
    this.context.restore();
  }

  //called when rectangle color is to be updated
  changeColor(newCol) {
    // fixed: was referencing undefined newR/newG/newB — unpack the passed object
    this.shapeCol.r = newCol.r;
    this.shapeCol.g = newCol.g;
    this.shapeCol.b = newCol.b;
    console.log(this.shapeCol.r, this.shapeCol.g, this.shapeCol.b);
  }

  //called when rectangle Pos is to be updated
  updatePositionRect(mx, my) {
    this.shapeX = mx - 25;
    this.shapeY = my - 25;
  }

  update(videoElement) {
    this.videoElement = videoElement;
  }
}
