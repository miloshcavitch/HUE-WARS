var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function star(layer){
  switch(layer){
    case 0:
      this.thesize = 3;
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
    ctx.fillStyle = 'white';
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


function spawnFunc(el, i){
  var ahora = Date.now();
  if (ahora >= el.spawnTimer + el.then){
    console.log("now!");
    el.then = ahora;
    el.spawnTimer = Math.round(Math.random() * 5000);//next spawn will be between 0 and 5 seconds


    //having trouble with this one
    starLayers[i].push(new star(i));//adds new star object to end of array.
    //having trouble
  }
}
function spawner(obj, i){
  var ahora = Date.now();
  if (ahora >= obj.spawnTimer + obj.then){
    obj.then = ahora;
    obj.spawnTimer = Math.round(Math.random() * 300);
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

}

setInterval(update, 20);
