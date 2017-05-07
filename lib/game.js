const Board = require('./board');
const Block = require('./block');

class Game {
  constructor() {
    this.board = new Board();
    this.blockSetPos = this.resetBlockSetPos();
    this.blockSet = this.newBlockSet();
  }

  resetBlockSetPos() {
    let blockSetPos = {
      0: { occupied: false, pos: [550, 150] },
      1: { occupied: false, pos: [850, 150] },
      2: { occupied: false, pos: [1150, 150] }
    };

    return blockSetPos;
  }

  newBlockSet() {
    let blockSet = [];

    for (let i = 0; i < 3; i++) {
      const block = new Block(...Block.random());

      block.initialPos = this.blockSetPos[i].pos.slice();
      block.pos = this.blockSetPos[i].pos;
      blockSet.push(block);
      this.blockSetPos[i].occupied = true;
    }

    return blockSet;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 1400, 500);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 1400, 500);
    this.board.drawGrid(ctx);
    this.blockSet.forEach(block => block.drawGrid(ctx));
  }

  tryMove(mouseX, mouseY) {
    this.blockSet.forEach(block => {
      if (block.moving) {
        block.pos[0] = mouseX - 125;
        block.pos[1] = mouseY - 125;
      }
    });
  }

  validMove(x, y, block) {
    if (x > this.board.grid.length || y > this.board.grid.length) {
      return false;
    }

    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[i].length; j++) {
        let tile = block.grid[i][j];

        if (tile.full) {
          let relX = (x - 3) + i;
          let relY = (y - 3) + j;
          let relTile = this.board.grid[relX][relY];

          if (relTile.full || relTile.color === '#fff' || !relTile.gridPos || !relTile.validGrid) {
            return false;
          }
        }
      }
    }

    return true;
  }

  validMoveExists() {
    for (let i = 0; i < this.blockSet.length; i++) {
      for (let j = 0; j < this.board.grid.length; j++) {
        for (let k = 0; k < this.board.grid[j].length; k++) {
          if (this.validMove(j, k, this.blockSet[i])) {
            return true;
          }
        }
      }
    }

    return false;
  }

  makeMove(block, x, y) {
    this.board.drawBlock(block, x, y);
    this.blockSet.splice(this.blockSet.indexOf(block), 1);
    this.clearRowsAndCols();

    if (this.blockSet.length === 0) {
      this.blockSetPos = this.resetBlockSetPos();
      this.blockSet = this.newBlockSet();
    }
  }

  clearRowsAndCols() {
    let colsTBCleared = [];
    let rowsTBCleared = [];
    let transposedGrid = this.board.transposedGrid(this.board.grid);

    this.board.grid.forEach((col, index) => {
      for (let i = 0; i < this.board.grid.length; i++) {
        if (col[i].color === '#fff') {
          break;
        }

        if (i === this.board.grid.length - 1) {
          colsTBCleared.push(index);
        }
      }
    });

    transposedGrid.forEach((row, index) => {
      for (let i = 0; i < this.board.grid.length; i++) {
        if (row[i].color === '#fff') {
          break;
        }

        if (i === this.board.grid.length - 1) {
          rowsTBCleared.push(index);
        }
      }
    });

    if (colsTBCleared.length > 0) {
      this.board.clearCols(colsTBCleared);
    }

    if (rowsTBCleared.length > 0) {
      this.board.clearRows(rowsTBCleared);
    }
  }

  toggleMoving(mouseX, mouseY, isMoving) {
    this.blockSet.forEach((block) => {
      if (block.includesPos(mouseX, mouseY)) {
        if (!isMoving) {
          let midX = Math.ceil(mouseX / 50);
          let midY = Math.ceil(mouseY / 50);

          if (!this.validMove(midX, midY, block)) {
            block.pos = block.initialPos.slice();
          } else {
            this.makeMove(block, midX, midY);
          }
        }

        block.moving = isMoving;
      }
    });
  }
}

module.exports = Game;
