class Block {
  constructor(color, coords) {
    this.color = color;
    this.coords = coords;
  }

  draw(ctx, x, y) {
    const coords = this.coords;

    for (let i = 0; i < coords.length; i++) {
      const coordX = coords[i][0];
      const coordY = coords[i][1];

      ctx.fillStyle = this.color;
      ctx.fillRect(x + coordX * 50, y + coordY * 50, 50, 50);

      ctx.strokeStyle = '#ddd';
      ctx.strokeRect(x + coordX * 50, y + coordY * 50, 50, 50);
    }
  }
}

Block.BLOCKS = [
  new Block('#D96666', [[0, 0]]),
  new Block('#F89883', [[0, 0], [1, 0]]),
  new Block('#F89883', [[0, 0], [0, 1]]),
  new Block('#F2E5A2', [[0, 0], [1, 0], [2, 0]]),
  new Block('#F2E5A2', [[0, 0], [0, 1], [0, 2]]),
  new Block('#81AC8B', [[0, 0], [1, 0], [0, 1]]),
  new Block('#81AC8B', [[0, 0], [1, 0], [1, 1]]),
  new Block('#81AC8B', [[0, 0], [1, 0], [1, 1]]),
  new Block('#81AC8B', [[0, 0], [0, 1], [1, 1]]),
  new Block('#425957', [[0, 0], [1, 0], [2, 0], [3, 0]]),
  new Block('#425957', [[0, 0], [0, 1], [0, 2], [0, 3]]),
  new Block('#DA8360', [[0, 0], [1, 0], [1, 1], [0, 1]]),
  new Block('#A05742', [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]),
  new Block('#A05742', [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]),
  new Block('#8BB2C6', [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2]]),
  new Block('#8BB2C6', [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]]),
  new Block('#8BB2C6', [[2, 0], [2, 1], [2, 2], [1, 2], [0, 2]]),
  new Block('#8BB2C6', [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]]),
  new Block('#5E7785', [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1], [0, 1], [0, 2], [1, 2], [2,2]])
];

Block.random = function() {
  const block = Block.BLOCKS[Math.floor(Math.random() * Block.BLOCKS.length)];

  return block;
};

module.exports = Block;
