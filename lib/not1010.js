const Game = require('./game');
const Display = require('./display');

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1400, 500);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 1400, 500);

  let game = new Game();
  new Display(canvas, ctx, game).start();
});
