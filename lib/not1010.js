const Display = require('./display');

document.addEventListener('DOMContentLoaded', function() {
  const display = new Display();
  display.newGrid();
  display.newBlockSet();
});
