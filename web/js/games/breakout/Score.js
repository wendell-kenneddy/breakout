import { Text } from "../../lib/Text.js";

export class Score extends Text {
  #maxPossibleScore;

  constructor(textConfig) {
    super(textConfig);
  }

  update(engineState) {
    if (!this.#maxPossibleScore) {
      this.#maxPossibleScore = engineState.gameObjects.length - 3;
    }

    const score = this.#maxPossibleScore - (engineState.gameObjects.length - 3);

    this.content = `Score : ${score}/${this.#maxPossibleScore}`;

    if (score === this.#maxPossibleScore) {
      engineState.stores["game-state"] = 0;
      return;
    }
  }
}
