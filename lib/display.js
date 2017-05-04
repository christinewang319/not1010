const Board = require('./board');
const Block = require('./block');

class Display {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
  }

  newGrid() {
    const board = new Board();
    const grid = board.grid;

    for (let i = 0; i <= grid.length * 50; i += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, 500);
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(500, i);
      this.ctx.strokeStyle = '#ddd';
      this.ctx.stroke();
    }
  }

  newBlockSet() {
    const block1 = Block.random();
    const block2 = Block.random();
    const block3 = Block.random();

    block1.draw(this.ctx, 550, 150);
    block2.draw(this.ctx, 850, 150);
    block3.draw(this.ctx, 1150, 150);
  }
}

module.exports = Display;
