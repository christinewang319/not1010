class Board {
  constructor() {
    this.grid = this.newGrid();
  }

  newGrid() {
    const grid = [];

    for (let i = 0; i < 10; i++) {
      grid[i] = this.newRow();
    }

    return grid;
  }

  newRow() {
    const row = [];

    for (let i = 0; i < 10; i++) {
      row.push([]);
    }

    return row;
  }
}

module.exports = Board;
