export class Engine {
  #stores = {};
  #gameObjects = [];
  #inputSystem;
  #scripts = [];
  #animationID;
  #renderer;
  #onStop;
  #onEachRender;

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

    const lastEngineState = this.getEngineState();

    this.#stores = { "game-state": 0 };
    this.#gameObjects = [];
    this.#scripts = [];
    this.#onStop && this.#onStop(lastEngineState);
    this.#onStop = null;
    this.#onEachRender = null;
  }

  setupEachRenderCallback(onEachRenderCallback) {
    this.#onEachRender = onEachRenderCallback;
  }

  setupOnStopCallback(onStopCallback) {
    this.#onStop = onStopCallback;
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
    const engineState = this.getEngineState();
    this.#scripts.forEach((s) => s.execute(engineState));
    this.#renderer.clearScreen();
    this.#onEachRender && this.#onEachRender(engineState);
    this.#renderer.renderObjects(this.#gameObjects, engineState);
    this.#animationID = window.requestAnimationFrame(() => this.#gameLoop());
  }

  getEngineState() {
    return {
      stores: this.#stores,
      inputSystemState: this.#inputSystem.getState(),
      gameObjects: this.#gameObjects,
      requestObjectDestruction: (id) => this.#destroyObject(id),
    };
  }
}
