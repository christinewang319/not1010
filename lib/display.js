import Board from './board';
import Block from './block';

export default class Display {
  constructor() {
    this.displayGrid();
    this.displayBlock1();
    this.displayBlock2();
    this.displayBlock3();
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

  drawBlock(ctx) {
    const block = new Block().selectBlock();
    const tiles = block.tiles;
    const color = block.color;

    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[i].length; j++) {
        if (tiles[i][j]) {
          ctx.fillStyle = color;
          ctx.fillRect(j * 50, i * 50, 48, 48);
        }
      }
    }
  }

  displayBlock1() {
    const canvas = document.getElementById('block1');
    const ctx = canvas.getContext('2d');

    this.drawBlock(ctx);
  }

  displayBlock2() {
    const canvas = document.getElementById('block2');
    const ctx = canvas.getContext('2d');

    this.drawBlock(ctx);
  }

  displayBlock3() {
    const canvas = document.getElementById('block3');
    const ctx = canvas.getContext('2d');

    this.drawBlock(ctx);
  }
}
