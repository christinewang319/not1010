/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(4);
const Block = __webpack_require__(3);

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

          if (relTile.full || !relTile.gridPos || !relTile.validGrid) {
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Tile {
  constructor(full, color, gridPos, validGrid) {
    this.full = full;
    this.color = color;
    this.gridPos = gridPos || false;
    this.validGrid = validGrid || false;
  }
}

module.exports = Tile;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(1);

class Board {
  constructor() {
    this.updating = false;
    this.grid = this.initialGrid();
  }

  initialGrid() {
    let grid = new Array(10);

    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(10);
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (i >= grid.length || j >= grid[i].length ) {
          grid[i][j] = new Tile(false, '#fff', true, false);
        } else {
          grid[i][j] = new Tile(false, '#fff', true, true);
        }
      }
    }

    return grid;
  }

  transposedGrid(grid) {
    let transposedGrid = Object.keys(grid[0]).map(col => {
      return grid.map(row => {
        return row[col];
      });
    });

    return transposedGrid;
  }

  drawGrid(ctx) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let tile = this.grid[i][j];
        let x = 50 * i;
        let y = 50 * j;

        if (tile.full) {
          ctx.fillStyle = tile.color;
          ctx.fillRect(x, y, 50, 50);
          ctx.strokeStyle = '#ddd';
          ctx.strokeRect(x, y, 50, 50);
        } else {
          ctx.fillStyle = '#fff';
          ctx.fillRect(x, y, 50, 50);
          ctx.strokeStyle = '#ddd';
          ctx.strokeRect(x, y, 50, 50);
        }
      }
    }
  }

  drawBlock(block, x, y) {
    for (let i = 0; i < block.tiles.length; i++) {
      for (let j = 0; j < block.tiles[i].length; j++) {
        let tile = block.grid[i][j];

        if (tile.full) {
          let relX = (x - 3) + i;
          let relY = (y - 3) + j;
          let relTile = this.grid[relX][relY];

          relTile.color = tile.color;
          relTile.full = true;
        }
      }
    }
  }

  clearTile(coords, color) {
    let x = coords[0];
    let y = coords[1];
    let tile = this.grid[x][y];

    tile.color = color;
    tile.full = false;
  }

  clearCols(cols, swap) {
    this.updating = true;
    setTimeout(() => (this.updating = false), 300);

    for (let i = 0; i < cols.length; i++) {
      let timeout = 1;

      for (let j = 0; j < this.grid.length; j++) {
        let coords = [cols[i], j];

        if (swap) {
          coords = [j, cols[i]];
        }

        setTimeout(this.clearTile.bind(this, coords, '#fff'), timeout * 25);
        timeout += 1;
      }
    }
  }

  clearRows(rows) {
    this.grid = this.transposedGrid(this.grid);
    this.clearCols(rows, true);
    this.grid = this.transposedGrid(this.grid);
  }
}

module.exports = Board;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const Display = __webpack_require__(2);

document.addEventListener('DOMContentLoaded', function() {
  // let config = {
  //   apiKey: "AIzaSyClxTPGHYL__-mpa9ZxKdRRmO31MC2NG5Q",
  //   authDomain: "not1010-28fd7.firebaseapp.com",
  //   databaseURL: "https://not1010-28fd7.firebaseio.com",
  //   projectId: "not1010-28fd7",
  //   storageBucket: "not1010-28fd7.appspot.com",
  //   messagingSenderId: "296355455237"
  // };
  // firebase.initializeApp(config);

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const modal = document.getElementById('start-modal');
  const startBtn = document.getElementById('start');

  ctx.clearRect(0, 0, 1400, 500);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 1400, 500);
  startBtn.onclick = () => {
    const game = new Game();
    modal.classList.add('hidden');
    startBtn.classList.add('hidden');
    new Display(canvas, ctx, game).start();
  };
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map