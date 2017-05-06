const Tile = require('./tile');

class Board {
  constructor() {
    this.updating = false;
    this.grid = this.initialGrid();
  }

  initialGrid() {
    let grid = new Array(12);

    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(12);
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (i === 0 || j === 0 || i >= grid.length - 1 || j >= grid[i].length - 1) {
          grid[i][j] = new Tile(false, '#fff', true, false);
        } else {
          grid[i][j] = new Tile(false, '#fff', true, true);
        }
      }
    }

    return grid;
  }

  transposedGrid() {
    const transposedGrid = Object.keys(this.grid[0]).map(col => {
      return this.grid.map(row => {
        return row[col];
      });
    });

    return transposedGrid;
  }

  drawGrid(ctx) {
    for (let i = 1; i < this.grid.length - 1; i++) {
      for (let j = 1; j < this.grid[i].length - 1; j++) {
        let tile = this.grid[i][j];

        if (tile.full) {
          ctx.fillStyle = tile.color;
          let x = 50 * (i - 1);
          let y = 50 * (j - 1);
          ctx.fillRect(x, y, 50, 50);
          ctx.strokeStyle = '#ddd';
          ctx.strokeRect(x, y, 50, 50);
        } else {
          ctx.fillStyle = '#fff';
          let x = 50 * (i - 1);
          let y = 50 * (j - 1);
          ctx.fillRect(x, y, 50, 50);
          ctx.strokeStyle = '#ddd';
          ctx.strokeRect(x, y, 50, 50);
        }
      }
    }
  }

  drawBlock(block, midX, midY) {
    for (let i = 0; i < block.tiles.length; i++) {
      for (let j = 0; j < block.tiles[i].length; j++) {
        let tile = block.grid[i][j];

        if (tile.full) {
          let relX = midX + (i - 1);
          let relY = midY + (j - 1);
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
    let tile = grid[x][y];

    this.tile.color = color;
    this.tile.full = false;
  }

  clearCols(cols, swap) {
    this.updating = true;
    setTimeout(() => this.updating = false, 300);

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
    this.grid = this.transposedGrid();
    this.clearCols(rows, true);
    this.grid = this.transposedGrid();
  }
}

module.exports = Board;
