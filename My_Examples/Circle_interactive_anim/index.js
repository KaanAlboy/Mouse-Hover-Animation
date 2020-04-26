
var canvas = document.querySelector("canvas");
console.log(canvas);

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");
var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;

} );

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  init();
});

var maxRadius = 50;
var mouseRange = 80;

var colourArray = [
'#EB8921',
'#F5AD28',
'#2E2F2F',
'#000000',
'#FF3C00'
];

function Circle (x, y ,dx, dy, r) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.minRadius = r;
  this.color = colourArray[Math.floor(Math.random() * colourArray.length)];
  var rgbR = parseInt(Math.random()*255);
  var rgbG = parseInt(Math.random()*255);
  var rgbB = parseInt(Math.random()*255);

  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.r,0,Math.PI *2 ,false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if(this.x + this.r > window.innerWidth || this.x - this.r < 0){
      this.dx = -this.dx;
    }
    if (this.y + this.r > window.innerHeight || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    if(mouse.x - this.x < mouseRange && mouse.x - this.x > -mouseRange && 
      mouse.y - this.y < mouseRange && mouse.y - this.y > -mouseRange)
    {
      if(this.r < maxRadius) {
        this.r += 4;
      }
      
    }
    else if(this.r > this.minRadius){
      this.r -= 1;
    } 


      this.x += this.dx;
      this.y += this.dy;
      this.draw();
      }

}

var circleArray = [];

var randomFunc = function(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function init() {
  circleArray = [];  
  for(let i = 0; i < 1600; i++){
  var x = Math.random() * (window.innerWidth - (r * 2)) + r;
  var y = Math.random() * (window.innerHeight - (r * 2)) + r;
  var r = randomFunc(3,10);
  var dx = (Math.random() - 0.5) ;
  var dy = (Math.random() - 0.5) ;
    circleArray.push(new Circle(x,y,dx,dy,r));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,window.innerWidth,window.innerHeight);
  
  for(let i =  0; i < circleArray.length; i++){
    circleArray[i].update();
  }
 
}

init();
animate();