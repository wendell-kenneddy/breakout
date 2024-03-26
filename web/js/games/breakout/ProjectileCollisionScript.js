export class ProjectileCollisionScript {
  constructor() {}

  execute(engineState) {
    this.#checkCollisions(engineState);
  }

  #checkCollisions(engineState) {
    const [, paddle, projectile, ...bricks] = engineState.gameObjects;

    this.#checkCollisionWithBounds(projectile, engineState);

    if (
      projectile.position.y + projectile.dimensions.height > 200 &&
      projectile.velocity.y > 0
    ) {
      this.#checkCollisionWithPaddle(projectile, paddle);
      return;
    }

    if (projectile.position.y < 80) {
      this.#checkCollisionWithBricks(projectile, bricks, engineState);
      return;
    }
  }

  #checkCollisionWithPaddle(projectile, paddle) {
    if (
      projectile.position.y +
        projectile.dimensions.height +
        projectile.velocity.y >=
        paddle.position.y &&
      projectile.position.x + projectile.dimensions.width >=
        paddle.position.x &&
      projectile.position.x + projectile.dimensions.width <=
        paddle.position.x + paddle.dimensions.width
    ) {
      projectile.velocity.y = -projectile.velocity.y;
    }
  }

  #checkCollisionWithBricks(projectile, bricks, engineState) {
    for (let i = 0; i < bricks.length; i++) {
      const brick = bricks[i];

      if (projectile.velocity.y > 0) {
        if (
          projectile.position.y + projectile.dimensions.height >
            brick.position.y &&
          projectile.position.y + projectile.dimensions.height <
            brick.position.y + brick.dimensions.height &&
          projectile.position.x + projectile.dimensions.width >
            brick.position.x &&
          projectile.position.x + projectile.dimensions.width <
            brick.position.x + brick.dimensions.width
        ) {
          projectile.velocity.y = -projectile.velocity.y;
          engineState.requestObjectDestruction(brick.id);
          return;
        }
      }

      if (projectile.velocity.y < 0) {
        if (
          projectile.position.y <= brick.position.y + brick.dimensions.height &&
          projectile.position.x + projectile.dimensions.width >
            brick.position.x &&
          projectile.position.x + projectile.dimensions.width <
            brick.position.x + brick.dimensions.width
        ) {
          projectile.velocity.y = -projectile.velocity.y;
          engineState.requestObjectDestruction(brick.id);
          return;
        }
      }
    }
  }

  #checkCollisionWithBounds(projectile, engineState) {
    if (
      projectile.position.y +
        projectile.dimensions.height +
        projectile.velocity.y >=
      300
    )
      return (engineState.stores["game-state"] = 0);

    if (
      projectile.position.x + projectile.dimensions.width > 500 ||
      projectile.position.x < 0
    ) {
      projectile.velocity.x = -projectile.velocity.x;
    }

    if (projectile.position.y < 0) {
      projectile.velocity.y = -projectile.velocity.y;
    }
  }
}
