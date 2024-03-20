export class Renderer {
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;
  }

  renderObjects(objects, engineState) {
    objects.forEach((o) => {
      o.update(engineState);
      o.draw(this.#ctx);
    });
  }

  clearScreen() {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
  }
}
