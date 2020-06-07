var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d', {alpha: false});
var dvd = new Image();
dvd.src = "dvd.svg";

var ball = {
  x: 300,
  y: 150,
  vx: 3,
  vy: 2,
  width: 300,
  height: 150,
  color: 'blue',
  draw: function() {
    
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(dvd, this.x, this.y, this.width, this.height);
    
    // ctx.fill();
    window.requestAnimationFrame(draw);
  },
  recolor: function() {
    this.color = "hsl(" + Math.floor(Math.random()*360) + ", 100%, " + Math.floor(Math.random()*50+30) + "%)";
    ctx.fillStyle = this.color;
    
    console.log(this.color);
  }
};

function draw() {
  if (ball.y + ball.vy + ball.height > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
    ball.recolor();
  }
  if (ball.x + ball.vx + ball.width > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
    ball.recolor();
  }
  
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// @todo make responsive

dvd.onload = ball.draw();