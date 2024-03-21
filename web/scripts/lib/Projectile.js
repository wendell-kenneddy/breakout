import { Rect } from "./Rect.js";

export class Projectile extends Rect {
  constructor(config) {
    super(config);
  }

  update(engineState) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
