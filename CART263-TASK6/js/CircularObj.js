class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; // full rotation
    this.context = context;

    // Animation properties - circle falls from top and drifts horizontally
    this.speedY = 1.5 + Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 2;
    this.alpha = 1;
    this.fadingOut = false;
  }

  display() {
    this.context.save();
    this.context.globalAlpha = this.alpha;
    this.context.fillStyle = this.fill_color;
    this.context.strokeStyle = this.stroke_color;
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true
    );
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.closePath();
    this.context.stroke();
    this.context.restore();
  }

  update() {
    // Move downward and drift sideways
    this.y += this.speedY;
    this.x += this.speedX;

    // Wrap horizontally
    if (this.x - this.radius > this.context.canvas.width) {
      this.x = -this.radius;
    }
    if (this.x + this.radius < 0) {
      this.x = this.context.canvas.width + this.radius;
    }

    // When circle falls off the bottom, reset to top
    if (this.y - this.radius > this.context.canvas.height) {
      this.y = -this.radius;
    }
  }
}
