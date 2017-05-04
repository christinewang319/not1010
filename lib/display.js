import Board from './board';

export default class Display {
  constructor(ctx) {
    this.displayGrid(ctx);
  }

  displayGrid(ctx) {
    const board = new Board();
    const grid = board.grid;

    for (let i = 0; i <= grid.length * 50; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 500);
      ctx.moveTo(0, i);
      ctx.lineTo(500, i);
      ctx.strokeStyle = '#ddd';
      ctx.stroke();
    }
  }

  displayBlock() {

  }
}
