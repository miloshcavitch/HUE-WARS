var charColorIndex = 0;
function spawnChar(){
  this.Xcenter = canvas.width/2;
  this.Ycenter = canvas.height/2;
  this.unit = 4;//pixel size
  this.theheight = 16 ;
  this.thewidth = 15;
  this.animationI = 0;
  this.lastColorCycle = 0;
  this.colorTimer = 10;
  this.rainbowIndex = 0;
  this.blendColor = '#FF0000';
  this.mouseColorP = '#FFFFFF';
  this.mouseColorS = '#000000';
  this.leftCenter = this.Xcenter - this.unit/2;
  this.topPos = this.Ycenter - this.theheight/2;
  this.staticRectPos = [{xPos: this.leftCenter, yPos: this.topPos, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP},//tip
                        {xPos: this.leftCenter - this.unit, yPos: this.topPos + 3 * this.unit, xWidth: 3 * this.unit, yHeight: this.unit * 7, elColor: this.mouseColorP},
                        {xPos: this.leftCenter - this.unit * 2, yPos: this.topPos + 10 * this.unit, xWidth: 5 * this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorP},
                        {xPos: this.leftCenter - this.unit * 4, yPos: this.topPos + 12 * this.unit, xWidth: 9 * this.unit, yHeight: 4 * this.unit, elColor: this.mouseColorP},
                        //wings
                        {xPos: this.leftCenter - this.unit * 7, yPos: this.topPos + 15 * this.unit, xWidth: 15 * this.unit, yHeight: this.unit, elColor: this.mouseColorP},
                        {xPos: this.leftCenter - 7 * this.unit, yPos: this.topPos + 10 * this.unit, xWidth: this.unit, yHeight: 2* this.unit, elColor: this.mouseColorS},
                        {xPos: this.leftCenter + 7 * this.unit, yPos: this.topPos + 10 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS},
                        {xPos: this.leftCenter - 7 * this.unit, yPos: this.topPos + 12 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP},
                        {xPos: this.leftCenter + 7 * this.unit, yPos: this.topPos + 12 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP},
                        {xPos: this.leftCenter - 4 * this.unit, yPos: this.topPos + 9 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP},
                        {xPos: this.leftCenter + 4 * this.unit, yPos: this.topPos + 9 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP},
                        {xPos: this.leftCenter - 4 * this.unit, yPos: this.topPos + 7 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS},
                        {xPos: this.leftCenter + 4 * this.unit, yPos: this.topPos + 7 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS},
                        //back
                        {xPos: this.leftCenter, yPos: this.topPos+ 17 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorP},//tail
                        {xPos: this.leftCenter - this.unit, yPos: this.topPos + 16 * this.unit, xWidth: 3 * this.unit, yHeight: this.unit, elColor: this.mouseColorP},
                        {xPos: this.leftCenter - 2 * this.unit, yPos: this.topPos + 15 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorS},
                        {xPos: this.leftCenter + 2 * this.unit, yPos: this.topPos + 15 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorS},
                        {xPos: this.leftCenter - 3 * this.unit, yPos: this.topPos + 16 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS},
                        {xPos: this.leftCenter + 3 * this.unit, yPos: this.topPos + 16 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS}];
  this.colorInput = function(){
    if (charColorIndex != this.rainbowIndex){
      this.rainbowIndex = charColorIndex;
      this.mouseColorP = "\'" + colorRay[this.rainbowIndex] + "\'";
      if (this.rainbowIndex + 382 >= 765){
        this.mouseColorS = "\'" + colorRay[765 - this.rainbowIndex - 382] + "\'";
      } else {
        this.mouseColorS = "\'" + colorRay[this.rainbowIndex];
      }
    }
  }
  this.staticShipRender = function(){
    this.colorInput();
    this.staticRectPos.forEach(function(el){
      ctx.beginPath();
      ctx.rect(el.xPos, el.yPos, el.xWidth, el.yHeight);
      ctx.fillStyle = "\'" + el.elColor + "\'";
      ctx.fill();
      ctx.closePath;
    })
  }


  this.colorCycle = function(){
    if (ahora >= this.lastColorCycle + this.colorTimer){
      this.rainbowIndex += 15;
      this.lastColorCycle = ahora;
      if (this.rainbowIndex >= 765){
        this.rainbowIndex = 0;
      }
      this.blendColor = colorRay[this.rainbowIndex];
    }
  }
  this.updatePos = function(l, u, r, d){
    this.staticRectPos.forEach(function(el){
      if (l == true){
        el.xPos -= 5;
        console.log("left");
      }
      if (u == true){
        el.yPos -= 5;
      }
      if (r == true){
        el.xPos += 5;
      }
      if (d == true){
        el.yPos += 5;
      }
    })
  }


  this.update = function(){
    this.updatePos(l, u, r, d);
    this.updateGFX();
  }
  this.updateGFX = function(){
    this.staticShipRender();
    //this.colorCycle();
    //ctx.beginPath();
    //ctx.rect(this.Xcenter - this.thewidth/2, this.Ycenter + this.theheight/2, this.thewidth, this.theheight);
    //ctx.fillStyle = this.blendColor;
    //ctx.fill();
    //ctx.closePath;
  }
}


var testChar = new spawnChar();
testChar.Ycenter = canvas.height/2;
