import { Paddle } from "./Paddle.js";
import { Projectile } from "./Projectile.js";
import { ProjectileCollisionScript } from "./ProjectileCollisionScript.js";
import { Score } from "./Score.js";
import { createBricks } from "./createBricks.js";

export function setupNewBreakoutGame(engine) {
  const bricks = createBricks(40, 10, 3, 8);
  const score = new Score({
    position: { x: 10, y: 340 },
    maxWidth: undefined,
    color: "white",
    content: "Score: 0/" + bricks.length,
    font: "24px sans-serif",
  });
  const paddle = new Paddle({
    initialPosition: {
      x: 220,
      y: 280,
    },
    initialVelocity: {
      x: 7,
      y: 4,
    },
    dimensions: {
      width: 50,
      height: 10,
    },
    color: "orange",
  });
  const projectile = new Projectile({
    initialPosition: {
      x: 245,
      y: 145,
    },
    initialVelocity: {
      x: 2,
      y: 3,
    },
    dimensions: {
      width: 8,
      height: 8,
    },
    color: "red",
  });

  engine.addGameObject(score);
  engine.addGameObject(paddle);
  engine.addGameObject(projectile);
  bricks.forEach((b) => engine.addGameObject(b));
  engine.attachScript(new ProjectileCollisionScript());
}
