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

}

const block1 = {
  points: 1,
  tiles: [
    [true, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block2a = {
  points: 2,
  tiles: [
    [true, true, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block2b = {
  points: 2,
  tiles: [
    [true, false, false, false, false],
    [true, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block3a = {
  points: 3,
  tiles: [
    [true, true, true, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block3b = {
  points: 3,
  tiles: [
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block3c = {
  points: 3,
  tiles: [
    [true, true, false, false, false],
    [true, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block3d = {
  points: 3,
  tiles: [
    [false, false, false, true, true],
    [false, false, false, false, true],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block3e = {
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
  points: 3,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, true],
    [false, false, false, true, true]
  ]
};

const block4a = {
  points: 4,
  tiles: [
    [true, true, true, true, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block4b = {
  points: 4,
  tiles: [
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block4c = {
  points: 4,
  tiles: [
    [true, true, false, false, false],
    [true, true, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block5a = {
  points: 5,
  tiles: [
    [true, true, true, true, true],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block5b = {
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
  points: 5,
  tiles: [
    [true, true, true, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block5d = {
  points: 5,
  tiles: [
    [false, false, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};

const block5e = {
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
  points: 5,
  tiles: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, true, true, true]
  ]
};

const block9 = {
  points: 9,
  tiles: [
    [true, true, true, false, false],
    [true, true, true, false, false],
    [true, true, true, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]
};
