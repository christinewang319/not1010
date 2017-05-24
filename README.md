# !1010!

[Play !1010!](http://christinetwang.me/not1010/)

!1010! is a highly addictive, Tetris-like puzzle game that's inspired by 1010! The rules are simple: (1) Clear blocks and score as many points as you can by completing vertical and/or horizontal lines and (2) You lose if you run out of moves on the grid.

![!1010!](https://github.com/christinewang319/not1010/blob/master/assets/not1010.png)

## Technologies Used

* HTML5 Canvas
* Vanilla JavaScript

## Features and Implementation

### Rendering

As soon as the DOMContentLoaded event is fired, an initial HTML5 <canvas> element is drawn and an onclick event attribute is given to the Start button. When a player clicks on the Start button, a new instance of the Display class is created and the `start()` function is called.  The `start()` function adds mousedown, mousemove, and mouseup event listeners to the canvas, and calls `requestAnimationFrame(this.animate.bind(this))`. The `animate()` function checks to see if any columns and/or rows are being cleared or if the board has any valid moves left, and draws the current state of the game. I decided to use `requestAnimationFrame()` over `setInterval()` for the following reasons: (1) Animations look smoother because it uses a consistent frame rate and (2) It saves power by stopping animations in inactive tabs.

```javascript
start() {
  this.canvas.addEventListener('mousedown', this.mouseDown.bind(this), false);
  this.canvas.addEventListener('mousemove', this.moveBlock.bind(this), false);
  this.canvas.addEventListener('mouseup', this.mouseUp.bind(this), false);
  requestAnimationFrame(this.animate.bind(this));
}
```

### Drag and Drop

Before I implemented `mouseDown(e)`, `moveBlock(e)`, and `mouseUp(e)` functions, I implemented `mousePos(e)` function that determined the player's mouse position relative to the canvas.  I used `getBoundingClientRect()` function to get the position of the canvas relative to the viewport and `e.clientX` and `e.clientY` to get the position of the client mouse.

```javascript
mousePos(e) {
  let rect = this.canvas.getBoundingClientRect();
  let mouseX = (e.clientX - rect.left);
  let mouseY = (e.clientY - rect.top);
  return [mouseX, mouseY];
}
```

When a user has his/her mouse over the canvas and presses the mouse, `mouseDown(e)` function gets called. The `mouseDown(e)` function calls `toggleMoving(mouseX, mouseY, isMoving)` function that uses mouseX and mouseY to check if the user selected a block. If a block hasn't been selected, nothing happens.  If a block has been selected, it sets the moving property of the block to true.

When the user moves the mouse, `moveBlock(e)` function gets called. It first checks to see if the moving property of the block is true, and takes the current mouse position and renders the canvas with the block at that position.

When the user lets go of the mouse, `mouseUp(e)` function gets called. The `mouseUp(e)` function calls `toggleMoving(mouseX, mouseY, isMoving)` function.  This time, it checks to see if the block isn't moving and if its current position is valid. If the position is valid, it renders the canvas with the block at the new position.  If the position isn't valid, it renders the canvas with the block at the previous position.

```javascript
toggleMoving(mouseX, mouseY, isMoving) {
  this.blockSet.forEach((block) => {
    if (block.includesPos(mouseX, mouseY)) {
      if (!isMoving) {
        let midX = Math.ceil(mouseX / 50);
        let midY = Math.ceil(mouseY / 50);

        if (!this.validMove(midX, midY, block)) {
          block.pos = block.initialPos.slice();
        } else {
          this.makeMove(block, midX, midY);
        }
      }

      block.moving = isMoving;
    }
  });
}

mouseDown(e) {
  let mousePos = this.mousePos(e);
  this.game.toggleMoving(mousePos[0], mousePos[1], true);
  this.moving = true;
}

moveBlock(e) {
  if (this.moving) {
    let mousePos = this.mousePos(e);
    this.game.tryMove(mousePos[0], mousePos[1]);
  }
}

mouseUp(e) {
  let mousePos = this.mousePos(e);
  this.game.toggleMoving(mousePos[0], mousePos[1], false);
  this.moving = false;
}
```

### Game Over

The game is over when there aren't any valid moves left on the board. To check for this, I iterated over each of the tiles on the board and tried to move each of the remaining blocks to that specific tile on the board and checked the overlapping tiles' properties. It was considered an invalid move if any of the tiles were full or weren't part of the board.

## Future Features
- [ ] Animation sound when rows and columns are cleared
- [ ] High score board
