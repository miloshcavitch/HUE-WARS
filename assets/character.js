function spawnChar(){
  this.Xcenter = canvas.width/2;
  this.Ycenter = canvas.height - 50;
  this.thesize = 30;
  this.animationI = 0;
  this.updatePos = function(){
    //to be added later
  }
  this.updateGFX = function(){
    ctx.beginPath()
    ctx.rect(this.Xcenter - this.thesize/2, this.Ycenter + this.thesize/2, this.thesize, this.thesize);
    ctx.fillStyle = colorRay[Math.round(Math.random() * 764)];
    ctx.fill();
    ctx.closePath;
  }
}
var testChar = new spawnChar();
testChar.Ycenter = canvas.height/2;
