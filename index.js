var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ball = {
  x: 100,
  y: 100,
  vx: 3,
  vy: 2,
  yoffset: 25,
  xoffset: 25,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    window.requestAnimationFrame(draw);
  },
  recolor: function() {
    this.color = "hsl(" + Math.floor(Math.random()*360) + ", 100%, " + Math.floor(Math.random()*50+30) + "%)";
    ctx.fillStyle = this.color;
  }
};

function draw() {
  if (ball.y + ball.vy + ball.yoffset > canvas.height || ball.y + ball.vy - ball.yoffset < 0) {
    ball.vy = -ball.vy;
    ball.recolor();
  }
  if (ball.x + ball.vx + ball.xoffset > canvas.width || ball.x + ball.vx - ball.xoffset < 0) {
    ball.vx = -ball.vx;
    ball.recolor();
  }
  
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// @todo make responsive

ball.draw();