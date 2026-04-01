class FreeStyleObj {
  constructor(x, y, length, f_color, s_color, context) {
    this.x = x;
    this.y = y;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.theta = 0;
    this.length = length;
    this.yOffset = 20;
    this.angularSpeed = 0.07;
    this.context = context;

    // Animation: wave oscillates vertically
    this.baseY = y;
    this.time = 0;



    this.micVolume = 0;
  }

  display() {
    this.theta = 0; // reset every frame
    this.context.strokeStyle = this.stroke_color;
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);

    for (let i = this.x; i < this.x + this.length; i++) {
      // TASK 3 MIC: amplitude of wave driven by mic volume (property 1)
      let amplitude = 5 + this.micVolume * 0.5;
      this.context.lineTo(i, (Math.sin(this.theta) * amplitude) + this.y);
      this.context.lineTo(i, (Math.sin(this.theta) * amplitude) + this.y + this.yOffset);
      this.theta += this.angularSpeed;
    }
    this.context.stroke();
  }

  update() {

    this.time += 0.02;
    this.y = this.baseY + Math.sin(this.time * 2) * 30;



    this.angularSpeed = 0.07 + this.micVolume * 0.003;


    let g = Math.max(0, 159 - Math.floor(this.micVolume * 1.5));
    this.stroke_color = `rgb(${207}, ${g}, ${255})`;
  }
}
