export class Rect {
  position;
  velocity;
  dimensions;
  color;
  id;

  constructor(config) {
    this.position = config.initialPosition;
    this.velocity = config.initialVelocity;
    this.dimensions = config.dimensions;
    this.color = config.color;
    this.id = Date.now() + Math.random() * 100;
  }

  update() {}

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    );
  }
}
