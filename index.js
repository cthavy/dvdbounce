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
  init: function() {
    this.x = Math.floor(Math.random()*(canvas.width-2*this.x)+this.x);
    this.y = Math.floor(Math.random()*(canvas.height-2*this.y)+this.y);

    this.vx = Math.random() >= 0.5 ? this.vx : -this.vx;
    this.vy = Math.random() >= 0.5 ? this.vy : -this.vy;

    this.recolor();
    this.draw();
  },
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(dvdLogo, this.x, this.y, this.width, this.height);
    
    window.requestAnimationFrame(draw);
  },
  recolor: function() {
    this.color = "hsl(" + Math.floor(Math.random()*360) + ", 100%, " + Math.floor(Math.random()*50+30) + "%)";
    ctx.fillStyle = this.color;
  }
};

function draw() {
  // resize before render loop for better performance
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;// >= 300 ? window.innerWidth : 300;
    canvas.height = window.innerHeight;// >= 150 ? window.innerHeight : 150;
  }

  // @todo add counter when it hits a perfect corner

  // checking bottom and top boundaries
  if ((dvd.y + dvd.vy + dvd.height > canvas.height && dvd.vy >= 0) || (dvd.y + dvd.vy < 0 && dvd.vy <= 0)) {
    dvd.vy = -dvd.vy;
    dvd.recolor();
  }

  // checking right and left boundaries
  if ((dvd.x + dvd.vx + dvd.width > canvas.width && dvd.vx >= 0) || (dvd.x + dvd.vx < 0 && dvd.vx <= 0)) {
    dvd.vx = -dvd.vx;
    dvd.recolor();
  }

  // update and redraw
  ctx.clearRect(0,0, canvas.width, canvas.height);
  dvd.x += dvd.vx;
  dvd.y += dvd.vy;
  dvd.draw();
}

dvdLogo.onload = dvd.init();