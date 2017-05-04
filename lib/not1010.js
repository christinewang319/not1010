import Display from './display';

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const display = new Display(ctx);
});
