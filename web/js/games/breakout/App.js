import { CoreEngine } from "../../engine/CoreEngine.js";
import { Renderer } from "../../engine/Renderer.js";
import { KeyboardInputSystem } from "../../engine/KeyboardInputSystem.js";
import { setupNewBreakoutGame } from "./setupNewBreakoutGame.js";
import { renderScoreBackground } from "./renderScoreBackground.js";
import { renderFinishOverlay } from "./renderFinishOverlay.js";

export class App {
  #ctx = document.querySelector("canvas").getContext("2d");
  #engine = new CoreEngine(new Renderer(this.#ctx), new KeyboardInputSystem());

  constructor() {}

  init() {
    this.#setupGame();
    this.#handleRestartRequest();
  }

  #setupGame() {
    setupNewBreakoutGame(this.#engine);
    this.#engine.setupEachRenderCallback((engineState) => {
      renderScoreBackground(this.#ctx);
    });
    this.#engine.setupOnStopCallback((finalEngineState) =>
      this.#handleGameEnd(finalEngineState)
    );
    this.#engine.run();
  }

  #handleGameEnd(finalEngineState) {
    renderFinishOverlay(finalEngineState, this.#ctx);
  }

  #handleRestartRequest() {
    window.addEventListener("keydown", (e) => {
      if (this.#engine.getEngineState().stores["game-state"] !== 0) return;
      if (e.key !== "Enter") return;

      this.#setupGame();
    });
  }
}
