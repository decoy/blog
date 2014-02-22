title: Basic Animation
date: 2014-01-31 19:52:32
tags: [javascript, web, codepen, animation]
---

In my day job, I spend a lot of time coding core business logic applications.  What do you do with data A in situation B kind of logic.  So when I work on something code related in my off time, I like to putz with technologies outside of that bubble.

With that in mind, I'm going to talk about animation.

## Old School

Back in "the day", many games just updated as fast as the CPU could.  If you loaded the same game on a faster computer, everything would move faster.  This could result in fun times likes a typing game where the game's "40 words per minute" was closer to 120. (I regularly scored 14!)

You can end up with this same problem by being 'frame rate dependent' with your animations.  Basically, this means that you update the position of your objects at the same time that you draw the object.

Here's an example running 10fps, 30fps, and 60fps while drawing a simple animation:
<p data-height="175" data-theme-id="4105" data-slug-hash="LHgbm" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/decoyahoy/pen/LHgbm'>frame based animation</a> by kp (<a href='http://codepen.io/decoyahoy'>@decoyahoy</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

The ball object handles the 'bounce' effect.
```javascript
function Ball(w, h) {

  //let's just set this to 10 for now
  this.size = 10;

  //initial ball positions
  this.x = 0;
  this.y = 0;

  //this is the expected change per direction per update
  this.dx = 0.3;
  this.dy = 2.75;

  //bounding box (can't escape)
  this.w = w;
  this.h = h;
};

Ball.prototype.update = function() {
  //update the ball position
  this.x += this.dx;
  this.y += this.dy;

  //check to see if the ball is still in bounds
  //if it's not, change its direction to the opposite
  if (this.x <= 0 || this.x >= this.w - this.size)
    this.dx = -this.dx;

  if (this.y <= 0 || this.y >= this.h - this.size)
    this.dy = -this.dy; 
};

Ball.prototype.draw = function(ctx) {
  //let's draw the ball (box) 
  ctx.fillRect(this.x, this.y, 10, 10);
};
```

In our main draw loop you can see us updating both the ball position, and then telling it to draw.

```javascript
BallCanvas.prototype.animate = function () {
  
  //clear the canvas between frames
  this.ctx.clearRect(0, 0, 100, 100);

  //update the ball position
  this.ball.update();

  //now draw the ball
  this.ball.draw(this.ctx);

  //restart the loop after we're done updating
  this.start();
};

BallCanvas.prototype.start = function () {
  //we're forcing very specific framerates here
  //there are better ways...
  var that = this;
  window.setTimeout(function() { that.animate() }, this.frameRate);
};
```

## Better ways

So what other options are there?  Well, you could calculate the distance the ball travels per frame by using math.  (Yay, math!)  

Let's assume we want the ball to update position every 10ms (100fps from the previous example).  Instead of simply updating the ball +1 on each frame, we now get the time, compare it to the previous time, and figure out how many times the ball should have moved since the last time we updated.

This is the new animate function:
```javascript
BallCanvas.prototype.animate = function () {

  //get the current time
  var nextUpdate =  new Date().getTime();

  //how much time has passed (cummulative)
  this.elapsed += nextUpdate - this.lastUpdate;

  //how many updates do we need to process?
  //this is a little more complex than need be
  //so the example can keep the balls in sync
  while (this.elapsed > UPDATE_RATE) {
    //update the ball position
    this.ball.update();
    //keep track of the extra
    this.elapsed -= UPDATE_RATE;
  }

  //clear the canvas between frames
  this.ctx.clearRect(0, 0, 100, 100);

  //now draw the ball
  this.ball.draw(this.ctx);
  
  //update the update time
  this.lastUpdate = nextUpdate;

  //restart the loop after we're done updating
  this.start();
};
```

And this is it running:

<p data-height="175" data-theme-id="4105" data-slug-hash="gImtA" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/decoyahoy/pen/gImtA'>frame based animation</a> by kp (<a href='http://codepen.io/decoyahoy'>@decoyahoy</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Now, the side of me that spends all day separating business logic from infrastructure code keeps asking why I'm calculating positions inside of a draw loop.  Separation of concerns is a big deal in large software projects. This brings me to the next option: have a loop just for updating.

```javascript
BallCanvas.prototype.animate = function () {

  //clear the canvas between frames
  this.ctx.clearRect(0, 0, 100, 100);

  //now draw the ball
  this.ball.draw(this.ctx);

  //restart the loop after we're done updating
  this.start();
};
```

```javascript
//handle the object updates separate from drawing
function updateBalls() {
  ball10.ball.update();
  ball30.ball.update();
  ball60.ball.update();
  setTimeout(updateBalls, UPDATE_RATE);
}
```

<p data-height="175" data-theme-id="4105" data-slug-hash="BfCnq" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/decoyahoy/pen/BfCnq'>update loop separate from draw loops</a> by kp (<a href='http://codepen.io/decoyahoy'>@decoyahoy</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

The same results, but note the math is gone, and the code is overall simpler.  This also leads to a more useful scenario of handling user input in a way where we don't have to care what's happening with the draw loop.  How about we watch the mouse cursor?

<p data-height="175" data-theme-id="4105" data-slug-hash="daIus" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/decoyahoy/pen/daIus'>follow the mouse</a> by kp (<a href='http://codepen.io/decoyahoy'>@decoyahoy</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Neat!  All we did was replace our update loop from the previous example with this:

```javascript
function onMouseMove(e) {

  //get the new positions
  var x = e.clientX;
  var y = e.clientY;

  ball10.ball.x = x;
  ball10.ball.y = y;
  ball30.ball.x = x;
  ball30.ball.y = y;
  ball60.ball.x = x;
  ball60.ball.y = y;
}

//watch the mouse event
document.onmousemove = onMouseMove;
```

## Cautions

In these examples, I'm using setTimeout to simulate my framerates.  Don't do this.  `requestAnimationFrame` is where it's at.

An excellent article on the subject:
http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

Also, there are a lot of very good javascript animations libraries out there.  They have excellent framerate handling that can properly use the above requestAnimationFrame, throttle framerates on slow computers, or speed them up on fast ones.  Don't reinvent the wheel if you don't need to!
