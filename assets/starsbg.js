var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var worldColor = colorRay[Math.round(Math.random() * 764)];
var s = 1;
function star(x){
  switch(x){
    case 16:
      this.thesize = Math.random()*0.3 + 0.3;
      this.speed = this.thesize * s;
      break;
    case 8:
      this.thesize = Math.random()*0.6 + 0.6;
      this.speed = this.thesize * s;
      break;
    case 4:
      this.thesize = Math.random() * 1.2 + 1.2;
      this.speed = this.thesize * s;
      break;
    case 2:
      this.thesize = Math.random() * 2.4 + 2.4;
      this.speed = this.thesize * s;
      break;
    case 1:
      this.thesize = Math.random() * 4.8 + 4.8;
      this.speed = this.thesize * s;
      break;
    default:
      this.thesize = Math.random() * 4.8;
      this.speed = this.thesize * s;
  }
  this.posY = 0;
  this.posX = Math.round(Math.random() * canvas.width);
  this.updateStar = function(){
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.thesize, this.thesize * 1.5);
    ctx.fillStyle = colorRay[Math.round(Math.random() * 764)];;
    ctx.fill();
    ctx.closePath();
    this.posY += this.speed;
  }
}
var starLayers = [];
var starSpawnTimer = {spawnTimer: 0, then: 0};

function spawner(obj){//hopefully this will be the old one, see new one below
  var ahora = Date.now();
  if (ahora >= obj.spawnTimer + obj.then){
    obj.then = ahora;
    obj.spawnTimer = Math.round(Math.random() * 20);
    starLayers.push(new star());
  }
}
//new one
function spacedSpawner(){
    var spaceStat = Math.random() * 31;
    var x;
    if (spaceStat > 15){
      x = 16;
    }
    if (spaceStat <= 15 && spaceStat > 7){
      x = 8;
    }
    if (spaceStat <= 7 && spaceStat > 3){
      x = 4;
    }
    if (spaceStat <= 3 && spaceStat > 1){
      x = 2;
    }
    if (spaceStat <= 1){
      x = 1;
    }
    starLayers.push(new star(x))
}
function LayerTraverse(el){//runs updateStar for all the stars
  if (el.posY >= canvas.height){
    el = new star(0);//trouble here

  } else {
    el.updateStar();
  }
}
var fpsCounter = 0;
var lastSecond = 0;
var fpsString = '';

function updateStars(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
//  spaceBackground();
  ctx.fillStyle = spaceColor;//variable can be found in rainbowray.js
  ctx.fill();
  ctx.closePath();
  spacedSpawner(starSpawnTimer);
  starLayers.forEach(LayerTraverse);
  //counts frames per second for debugging, should be 50
  fpsCounter++;
  if (Date.now() >= lastSecond + 1000){
    fpString = fpsCounter + " FPS";
    fpsCounter = 0;
    lastSecond = Date.now();
  }
  ctx.font = "15px Arial"
  ctx.fillText(fpString, 10, 20);

}
