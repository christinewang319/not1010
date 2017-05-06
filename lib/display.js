const Game = require('./game');

class Display {
  constructor(canvas, ctx, game) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.game = game;
    this.moving = false;
  }

  start() {
    this.canvas.addEventListener('mousedown', this.mouseDown.bind(this), false);
    this.canvas.addEventListener('mousemove', this.moveBlock.bind(this), false);
    this.canvas.addEventListener('mouseup', this.mouseUp.bind(this), false);
    requestAnimationFrame(this.animate.bind(this));
  }

  mousePos(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    return [x, y];
  }

  mouseDown(e) {
    let mousePos = this.mousePos(e);
    this.game.toggleMoving(mousePos[0], mousePos[1], true);
    this.moving = true;
  }

  moveBlock(e) {
    if (this.moving) {
      let mousePos = this.mousePos(e);
      this.game.tryMove(mousePos[0], mousePos[1]);
    }
  }

  mouseUp(e) {
    let mousePos = this.mousePos(e);
    this.game.toggleMoving(mousePos[0], mousePos[1], false);
    this.moving = false;
  }

  animate() {
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = Display;
