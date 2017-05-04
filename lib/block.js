export default class Block {
  constructor() {
    this.BLOCKS = [
      block1,
      block2a, block2b,
      block3a, block3b, block3c, block3d, block3e, block3f,
      block4a, block4b, block4c,
      block5a, block5b, block5c, block5d, block5e, block5f,
      block9
    ];
  }

  selectBlock() {
    const block = this.BLOCKS[Math.floor(Math.random() * this.BLOCKS.length)];

    return block;
  }
}

const block1 = {
  color: '#D96666',
  points: 1,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, false, false, false, false]
  ]
};

const block2a = {
  color: '#F89883',
  points: 2,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, false, false, false]
  ]
};

const block2b = {
  color: '#F89883',
  points: 2,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false]
  ]
};

const block3a = {
  color: '#F2E5A2',
  points: 3,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, true, false, false]
  ]
};

const block3b = {
  color: '#F2E5A2',
  points: 3,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false]
  ]
};

const block3c = {
  color: '#81AC8B',
  points: 3,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, false, false, false],
    [true, false, false, false, false]
  ]
};

const block3d = {
  color: '#81AC8B',
  points: 3,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, false, false, false],
    [false, true, false, false, false]
  ]
};

const block3e = {
  color: '#81AC8B',
  points: 3,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, false, false, false, false],
    [true, true, false, false, false]
  ]
};

const block3f = {
  color: '#81AC8B',
  points: 3,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, true, false, false, false],
    [true, true, false, false, false]
  ]
};

const block4a = {
  color: '#425957',
  points: 4,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, true, true, false]
  ]
};

const block4b = {
  color: '#425957',
  points: 4,
  tiles: [
    [false, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false]
  ]
};

const block4c = {
  color: '#DA8360',
  points: 4,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, false, false, false],
    [true, true, false, false, false]
  ]
};

const block5a = {
  color: '#A05742',
  points: 5,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, true, true, true]
  ]
};

const block5b = {
  color: '#A05742',
  points: 5,
  tiles: [
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false]
  ]
};

const block5c = {
  color: '#8BB2C6',
  points: 5,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, true, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false]
  ]
};

const block5d = {
  color: '#8BB2C6',
  points: 5,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false]
  ]
};

const block5e = {
  color: '#8BB2C6',
  points: 5,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, true, true, false, false]
  ]
};

const block5f = {
  color: '#8BB2C6',
  points: 5,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [true, true, true, false, false]
  ]
};

const block9 = {
  color: '#5E7785',
  points: 9,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true, true, true, false, false],
    [true, true, true, false, false],
    [true, true, true, false, false]
  ]
};
