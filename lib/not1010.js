const Game = require('./game');
const Display = require('./display');

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
