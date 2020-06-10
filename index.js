let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d', {alpha: false});
let dvdLogo = new Image();
dvdLogo.src = "dvd.svg";

let dvd = {
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
    ctx.drawImage(dvdLogo, this.x, this.y, this.width, this.height);
    
    reqID = window.requestAnimationFrame(draw);
  },
  recolor: function() {
    this.color = "hsl(" + Math.floor(Math.random()*360) + ", 100%, " + Math.floor(Math.random()*50+30) + "%)";
    ctx.fillStyle = this.color;
  }
};

function draw() {
  if (dvd.y + dvd.vy + dvd.height > canvas.height || dvd.y + dvd.vy < 0) {
    dvd.vy = -dvd.vy;
    dvd.recolor();
  }
  if (dvd.x + dvd.vx + dvd.width > canvas.width || dvd.x + dvd.vx < 0) {
    dvd.vx = -dvd.vx;
    dvd.recolor();
  }

  ctx.clearRect(0,0, canvas.width, canvas.height);
  dvd.draw();
  dvd.x += dvd.vx;
  dvd.y += dvd.vy;
}

function windowResize() {
  window.cancelAnimationFrame(reqID);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  reqID = window.requestAnimationFrame(draw);
}

window.addEventListener('resize', windowResize);

let reqID = null;
dvdLogo.onload = dvd.draw();