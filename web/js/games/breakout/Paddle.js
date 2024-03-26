import { Rect } from "../../lib/Rect.js";

export class Paddle extends Rect {
  constructor(config) {
    super(config);
  }

  update(engineState) {
    if (engineState.inputSystemState.keys[39] && !this.#willCollide(39)) {
      this.position.x += this.velocity.x;
      return;
    }

    if (engineState.inputSystemState.keys[37] && !this.#willCollide(37)) {
      this.position.x -= this.velocity.x;
      return;
    }
  }

  #willCollide(keyCode) {
    if (keyCode === 39)
      return this.position.x + this.dimensions.width + this.velocity.x > 500;
    if (keyCode === 37) return this.position.x - this.velocity.x < 0;
  }
}
