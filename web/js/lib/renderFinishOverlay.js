export function renderFinishOverlay(finalEngineState, ctx) {
  const finalScore = finalEngineState.gameObjects.length - 3;
  const text = { content: "", xPos: 0 };

  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 100, 500, 100);
  ctx.fillStyle = "white";

  if (finalScore === 0) {
    text.content = "Max score achieved!";
    text.xPos = 150;
  } else {
    text.content = "Game over!";
    text.xPos = 190;
  }

  ctx.fillText(text.content, text.xPos, 140);
  ctx.fillText("Press Enter to play again", 120, 170);
}
