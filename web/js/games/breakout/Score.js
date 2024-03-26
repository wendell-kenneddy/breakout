import { Text } from "../../lib/Text.js";

export class Score extends Text {
  constructor(textConfig) {
    super(textConfig);
  }

  update(engineState) {
    const score = 40 - (engineState.gameObjects.length - 3);
    this.content = `Score : ${score}/40`;
  }
}
