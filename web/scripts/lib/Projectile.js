import { Rect } from "./Rect.js";

export class Projectile extends Rect {
  constructor(config) {
    super(config);
  }

  update(engineState) {}

  #willCollide(keyCode) {}
}
