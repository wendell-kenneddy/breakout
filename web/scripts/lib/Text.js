export class Text {
  position;
  maxWidth;
  content;
  font;
  color;
  id;

  constructor(textConfig) {
    this.position = textConfig.position;
    this.maxWidth = textConfig.maxWidth;
    this.content = textConfig.content;
    this.font = textConfig.font;
    this.color = textConfig.color;
    this.id = Date.now() + Math.random() * 100;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.fillText(this.content, this.position.x, this.position.y, this.maxWidth);
  }
}
