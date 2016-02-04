var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var worldColor = colorRay[Math.round(Math.random() * 764)];
function star(layer){
  switch(layer){
    case 0:
      this.thesize = 5;
      this.speed = 6;
      break;
    case 1:
      this.thesize = 2;
      this.speed = 4;
      break;
    case 2:
      this.thesize = 1;
      this.speed = 2;
      break;
  }
  this.posY = 0;
  this.posX = Math.round(Math.random() * canvas.width);
  this.updateStar = function(){
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.thesize, this.thesize);
    ctx.fillStyle = colorRay[Math.round(Math.random() * 764)];;
    ctx.fill();
    ctx.closePath();
    this.posY += this.speed;
  }
}
var initStarOne = new star(0);
var initStarOneTwo = new star(0);
var initStarTwo = new star(1);
var initStarTwoTwo = new star(1);
var initStarThree = new star(2);
var starLayers = [[initStarOne, initStarOneTwo],[initStarTwo, initStarTwoTwo],[initStarThree]];
var starSpawnTimer = [{spawnTimer: 0, then: 0},
                      {spawnTimer: 0, then: 0},
                      {spawnTimer: 0, then: 0}];



function spawner(obj, i){
  var ahora = Date.now();
  if (ahora >= obj.spawnTimer + obj.then){
    obj.then = ahora;
    obj.spawnTimer = Math.round(Math.random() * 200);
    starLayers[i].push(new star(i));
  }
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

function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
  spawner(starSpawnTimer[0], 0);
  spawner(starSpawnTimer[1], 1);
  spawner(starSpawnTimer[2], 2);
  starLayers[0].forEach(LayerTraverse);
  starLayers[1].forEach(LayerTraverse);
  starLayers[2].forEach(LayerTraverse);
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

setInterval(update, 20);
