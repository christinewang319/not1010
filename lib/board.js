const Tile = require('./tile');

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
