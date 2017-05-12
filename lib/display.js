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
    let rect = this.canvas.getBoundingClientRect();
    let mouseX = (e.clientX - rect.left);
    let mouseY = (e.clientY - rect.top);
    return [mouseX, mouseY];
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
    if (this.game.board.updating || this.game.validMoveExists()) {
      this.game.draw(this.ctx);
      requestAnimationFrame(this.animate.bind(this));
    } else {
      setTimeout(this.game.drawGameOver.bind(this, this.ctx, this.game), 25);

      const modal = document.getElementById('restart-modal');
      const endBtn = document.getElementById('end');

      modal.classList.remove('hidden');
      endBtn.classList.remove('hidden');

      endBtn.onclick = () => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const game = new Game();

        modal.classList.add('hidden');
        endBtn.classList.add('hidden');

        ctx.clearRect(0, 0, 1400, 500);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, 1400, 500);

        new Display(this.canvas, this.ctx, game).start();
      };
    }
  }
}

module.exports = Display;
