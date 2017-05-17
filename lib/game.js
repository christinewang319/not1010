const Board = require('./board');
const Block = require('./block');

class Game {
  constructor() {
    this.board = new Board();
    this.blockSetPos = this.resetBlockSetPos();
    this.blockSet = this.newBlockSet();
    this.score = 0;
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
    this.drawScore(ctx);
  }

  drawScore(ctx) {
    ctx.font = '40px Bungee Shade';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#4c4b4b';
    ctx.fillText(`Score: ${this.score}`, 975, 36);
  }

  drawGameOver(ctx, game) {
    ctx.clearRect(0, 0, 1400, 500);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 1400, 500);
    ctx.font = '50px Bungee Shade';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#4c4b4b';
    ctx.fillText('Game Over!', 700, 180);
    ctx.font = '40px Bungee Shade';
    ctx.fillText(`Score: ${game.score}`, 700, 257);
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

    for (let i = 0; i < block.grid.length; i++) {
      for (let j = 0; j < block.grid[i].length; j++) {
        let tile = block.grid[i][j];

        if (tile.full) {
          let relX = x + (i - 3);
          let relY = y + (j - 3);

          if (relX < 0 || relY < 0) {
            return false;
          }

          let relTile = this.board.grid[relX][relY];

          if (relTile === undefined || relTile.full || !relTile.gridPos || !relTile.validGrid) {
            return false;
          }
        }
      }
    }

    return true;
  }

  validMoveExists() {
    for (let i = 0; i < this.blockSet.length; i++) {
      let block = this.blockSet[i];

      for (let j = 0; j < this.board.grid.length; j++) {
        for (let k = 0; k < this.board.grid[j].length; k++) {
          if (this.validMove(j, k, block)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  makeMove(block, x, y) {
    this.board.drawBlock(block, x, y);
    this.score += block.points;
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
      this.score += (colsTBCleared.length * 10);
    }

    if (rowsTBCleared.length > 0) {
      this.board.clearRows(rowsTBCleared);
      this.score += (rowsTBCleared.length * 10);
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
