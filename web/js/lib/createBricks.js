import { Rect } from "./Rect.js";

export function createBricks(brickWidth, brickHeight, rowCount, gap) {
  const bricks = [];
  const maxBricksPerRow = Math.floor(480 / (brickWidth + gap));

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < maxBricksPerRow; j++) {
      bricks.push(
        new Rect({
          initialPosition: {
            x: gap + brickWidth * j + gap * j,
            y: gap + brickHeight * i + gap * i,
          },
          initialVelocity: { x: 0, y: 0 },
          dimensions: { width: brickWidth, height: brickHeight },
          color: "blue",
        })
      );
    }
  }

  return bricks;
}
