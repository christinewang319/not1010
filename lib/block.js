const Tile = require('./tile');

class Block {
  constructor(points, color, tiles) {
    this.points = points;
    this.color = color;
    this.tiles = tiles;
    this.grid = this.initialGrid();
    this.initialPos = [];
    this.pos = [];
    this.moving = false;
  }

  initialGrid() {
    let grid = new Array(5);

    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(5);
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (this.tiles[i][j]) {
          grid[i][j] = new Tile(true, this.color, false, false);
        } else {
          grid[i][j] = new Tile(false, '#fff', false, false);
        }
      }
    }

    return grid;
  }

  drawGrid(ctx) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let tile = this.grid[i][j];
        let x = this.pos[0] + (50 * i);
        let y = this.pos[1] + (50 * j);

        if (tile.full) {
          ctx.fillStyle = tile.color;
          ctx.fillRect(x, y, 50, 50);
          ctx.strokeStyle = '#ddd';
          ctx.strokeRect(x, y, 50, 50);
        }
      }
    }
  }

  includesPos(mouseX, mouseY) {
    let x = this.pos[0];
    let y = this.pos[1];

    if ((mouseX > x && mouseX < (x + 250)) &&
        (mouseY > y && mouseY < (y + 250))) {
      return true;
    } else {
      return false;
    }
  }
}

Block.BLOCKS = [
    [1, '#e86f6f', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]],

  [2, '#f89883', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true, true, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]],

  [2, '#f89883', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false]
  ]],

  [3, '#f2e5a2', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, true, true, true, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]],

  [3, '#f2e5a2', [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false]
  ]],

  [3, '#81ac8b', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true, true, false],
    [false, false, true, false, false],
    [false, false, false, false, false]
  ]],

  [3, '#81ac8b', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, true, true, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false]
  ]],

  [3, '#81ac8b', [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, true, true, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]],

  [3, '#81ac8b', [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, true, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]],

  [4, '#455e5b', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, true, true, true, true],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]],

  [4, '#455e5b', [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false]
  ]],

  [4, '#da8360', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true, true, false],
    [false, false, true, true, false],
    [false, false, false, false, false]
  ]],

  [5, '#b5624c', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, true, true, true],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]],

  [5, '#b5624c', [
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false]
  ]],

  [5, '#8bb2c6', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true, true, true],
    [false, false, true, false, false],
    [false, false, true, false, false]
  ]],

  [5, '#8bb2c6', [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false]
  ]],

  [5, '#8bb2c6', [
    [false, false, true, false, false],
    [false, false, true, false, false],
    [true, true, true, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]],

  [5, '#8bb2c6', [
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, true, true],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]],

  [9, '#5e7785', [
    [false, false, false, false, false],
    [false, true, true, true, false],
    [false, true, true, true, false],
    [false, true, true, true, false],
    [false, false, false, false, false]
  ]]
];

Block.random = function() {
  let randomBlock = Block.BLOCKS[Math.floor(Math.random() * Block.BLOCKS.length)];
  return randomBlock;
};

module.exports = Block;
