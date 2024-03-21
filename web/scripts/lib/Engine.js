export class Engine {
  #stores = {};
  #gameObjects = [];
  #inputSystem;
  #scripts = [];
  #animationID;
  #renderer;
  #onStop;

  constructor(renderer, inputSystem, onStopCallback) {
    this.#renderer = renderer;
    this.#inputSystem = inputSystem;
    this.#onStop = onStopCallback;
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
    this.#onStop && this.#onStop();
  }

  addGameObject(gameObject) {
    this.#gameObjects.push(gameObject);
  }

  attachScript(script) {
    this.#scripts.push(script);
  }

  #destroyObject(id) {
    this.#gameObjects = [...this.#gameObjects].filter((o) => o.id != id);
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
      gameObjects: this.#gameObjects,
      requestObjectDestruction: (id) => this.#destroyObject(id),
    };
  }
}
