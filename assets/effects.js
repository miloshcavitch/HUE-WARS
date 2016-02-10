var shot = function(xPos, yPos, xD, yD, colorIndex, size, type){
  this.xPos = xPos;
  this.yPos = yPos;
  this.xD = xD;
  this.yD = yD;
  if (type == 'rainbow'){
    this.colorIndex = Math.floor(Math.random() * 764);
  } else{
    this.colorIndex = colorIndex;
  }
  this.elSize = size;
  this.type = type;
  this.flickerSineX = 0;
}

var activeShots = [];

var shotController = function(){
  activeShots.forEach(function(el){
    console.log("running");
    el.xPos += el.xD;
    el.yPos += el.yD;
    el.flickerSineX += 0.5;
    if (el.type == 'rainbow'){
      el.colorIndex += 15;
      if (el.colorIndex >= 765){
        el.colorIndex = 0;
      }
    }
    if (el.xPos > canvas.width + el.elSize || el.xPos < 0 - el.elSize || el.yPos > canvas.height + el.elSize || el.yPos < 0 - el.elSize){
      activeShots.splice(activeShots.indexOf(el), 1);
    }
  });
}

var shotsRender = function(){
  shotController();
  activeShots.forEach(function(el){
    /*
    ctx.beginPath();//whitesine
    ctx.globalAlpha = Math.sin(el.flickerSineX) * 0.25;//oscillates from 0 to 0.25
    ctx.arc(el.xPos, el.yPos, el.elSize * 1.2, 0, 2 * Math.PI);
    ctx.fillStyle = colorRay[el.colorIndex];
    ctx.fill();
    ctx.closePath();
    */
    ctx.beginPath()//outercircle
    ctx.globalAlpha = 0.3;
    ctx.arc(el.xPos, el.yPos, el.elSize * 1.4, 0, 2 * Math.PI);
    ctx.fillStyle = colorRay[el.colorIndex];
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();//innercircle
    ctx.globalAlpha = 1;
    ctx.arc(el.xPos, el.yPos, el.elSize, 0, 2 * Math.PI);
    ctx.fillStyle = colorRay[el.colorIndex];
    ctx.fill();
    ctx.closePath();
  });
  ctx.globalAlpha = 1;
}
