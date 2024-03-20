export class Engine {
  #stores = {};
  #gameObjects = [];
  #inputSystem;
  #scripts = [];
  #animationID;
  #renderer;

  constructor(renderer, inputSystem) {
    this.#renderer = renderer;
    this.#inputSystem = inputSystem;
  }

  run() {
    if (this.#stores["game-state"] === 1) return;
    this.#stores["game-state"] = 1;
    this.#inputSystem.start();
    this.#animationID = window.requestAnimationFrame(() => this.#gameLoop());
  }

  stop() {
    window.cancelAnimationFrame(this.#animationID);
    this.#inputSystem.stop();
    this.#stores = {};
    this.#gameObjects = [];
    this.#scripts = [];
  }

  addGameObject(gameObject) {
    this.#gameObjects.push(gameObject);
  }

  attachScript(script) {
    this.#scripts.push(script);
  }

  #gameLoop() {
    if (this.#stores["game-state"] === 0) return this.stop();
    const engineState = this.#getEngineState();
    this.#scripts.forEach((s) => s.execute(engineState));
    this.#renderer.clearScreen();
    this.#renderer.renderObjects(this.#gameObjects, engineState);
    this.#animationID = window.requestAnimationFrame(() => this.#gameLoop());
  }

  #getEngineState() {
    return {
      stores: this.#stores,
      inputSystemState: this.#inputSystem.getState(),
    };
  }
}
