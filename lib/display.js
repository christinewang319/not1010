import Board from './board';

export default class Display {
  constructor() {
    this.displayGrid();
  }

  displayGrid() {
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
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
