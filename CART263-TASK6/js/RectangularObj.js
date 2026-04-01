class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.context = context;

    // Animation base - oscillates across canvas
    this.baseX = x;
    this.time = 0;

    // Microphone-driven properties
    // micVolume is set externally from start.js
    this.micVolume = 0;
  }

  display() {
    this.context.fillStyle = this.fill_color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.strokeStyle = this.stroke_color;
    this.context.lineWidth = 2;
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update() {
    // TASK 2 ANIMATION: oscillate left-right over time
    this.time += 0.03;
    this.x = this.baseX + Math.sin(this.time) * 80;

    // TASK 2 MICROPHONE: 
    // Property 1 - height grows with mic volume
    this.height = 70 + this.micVolume * 2;

    // Property 2 - color shifts toward red with louder sound
    let intensity = Math.min(255, Math.floor(this.micVolume * 2.5));
    this.fill_color = `rgb(${255}, ${Math.max(0, 87 - intensity)}, ${Math.max(0, 51 - intensity)})`;
  }
}
