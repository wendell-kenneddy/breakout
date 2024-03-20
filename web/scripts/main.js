import { Engine } from "./lib/Engine.js";
import { KeyboardInputSystem } from "./lib/KeyboardInputSystem.js";
import { Paddle } from "./lib/Paddle.js";
import { Rect } from "./lib/Rect.js";
import { Renderer } from "./lib/Renderer.js";
import { createBricks } from "./lib/createBricks.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const engine = new Engine(new Renderer(ctx), new KeyboardInputSystem());

const paddle = new Paddle({
  initialPosition: {
    x: 0,
    y: 270,
  },
  initialVelocity: {
    x: 7,
    y: 4,
  },
  dimensions: {
    width: 60,
    height: 10,
  },
  color: "orange",
});
const projectile = new Rect({
  initialPosition: {
    x: 245,
    y: 145,
  },
  initialVelocity: {
    x: 0,
    y: 0,
  },
  dimensions: {
    width: 10,
    height: 10,
  },
  color: "red",
});
const bricks = createBricks(40, 10, 4, 8);

bricks.forEach((b) => engine.addGameObject(b));
engine.addGameObject(paddle);
engine.addGameObject(projectile);

engine.run();
