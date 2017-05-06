const Board = require('./board');
const Block = require('./block');

class Game {
  constructor() {
    this.board = new Board();
    this.blockSetPos = this.blockSetPos();
    this.blockSet = this.blockSet();
  }

  blockSetPos() {
    let blockSetPos = {
      0: { occupied: false, pos: [550, 150] },
      1: { occupied: false, pos: [850, 150] },
      2: { occupied: false, pos: [1150, 150] }
    };

    return blockSetPos;
  }

  blockSet() {
    let blockSet = [];

    for (let i = 0; i < 3; i++) {
      let block = Block.random();
      block.pos = this.blockSetPos[i].pos;
      block.initialPos = block.pos.slice();
      blockSet.push(block);
      this.blockSetPos[i].occupied = true;
    }

    return blockSet;
  }

  draw(ctx) {
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

  makeMove(block, midX, midY) {
    this.board.drawBlock(block, midX, midY);
    this.blockSet.splice(this.blockSet.indexOf(block), 1);

    let colsTBCleared = [];
    let rowsTBCleared = [];

    this.board.grid.forEach((col, index) => {
      for (let i = 1; i < 11; i++) {
        if (col[i].color === '#fff') {
          break;
        } else if (i === 10) {
          colsTBCleared.push(index);
        }
      }
    });

    this.board.transposedGrid().forEach((row, index) => {
      for (let i = 1; i < 11; i++) {
        if (row[i].color === '#fff') {
          break;
        } else if (i === 10) {
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

    if (this.blockSet.length === 0) {
      this.blockSetPos = this.blockSetPos();
      this.blockSet = this.blockSet();
    }
  }

  toggleMoving(mouseX, mouseY, isMoving) {
    this.blockSet.forEach((block) => {
      if (block.includesPos(mouseX, mouseY)) {
        if (isMoving === false) {
          let midX = Math.floor((mouseX - 250) / 50);
          let midY = Math.floor((mouseY - 250) / 50);

          // if (!this.validMove(midX, midY, block, this.board)) {
          //   block.pos = block.initialPos.slice();
          // } else {
          //   this.makeMove(block, midX, midY);
          // }

          this.makeMove(block, midX, midY);

        }

        block.moving = isMoving;
      }
    });
  }
}

module.exports = Game;
