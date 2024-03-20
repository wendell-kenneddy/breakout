export class KeyboardInputSystem {
  #isRunning = false;
  #keys = {};

  constructor() {}

  start() {
    if (this.#isRunning) return;
    window.addEventListener("keydown", (e) => this.#handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.#handleKeyUp(e));
    this.#isRunning = true;
  }

  stop() {
    window.removeEventListener("keydown", (e) => this.#handleKeyDown(e));
    window.removeEventListener("keyup", (e) => this.#handleKeyUp(e));
    this.#keys = {};
    this.#isRunning = false;
  }

  getState() {
    return {
      isRunning: this.#isRunning,
      keys: this.#keys,
    };
  }

  #handleKeyDown(e) {
    this.#keys[e.keyCode] = true;
  }

  #handleKeyUp(e) {
    this.#keys[e.keyCode] = false;
  }
}
