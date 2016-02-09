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
  this.frameCount = 0;
  this.blendColor = '#FF0000';
  this.mouseColorP = '#FFFFFF';
  this.mouseColorS = '#FF0000';
  this.leftCenter = this.Xcenter - this.unit/2;
  this.topPos = this.Ycenter - this.theheight/2;
  this.staticRectPos = [{xPos: this.leftCenter, yPos: this.topPos, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP},//tip
                        {xPos: this.leftCenter - this.unit, yPos: this.topPos + 3 * this.unit, xWidth: 3 * this.unit, yHeight: this.unit * 7, elColor: this.mouseColorP},
                        {xPos: this.leftCenter - this.unit * 2, yPos: this.topPos + 10 * this.unit, xWidth: 5 * this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorP, cs: 0},
                        {xPos: this.leftCenter - this.unit * 4, yPos: this.topPos + 12 * this.unit, xWidth: 9 * this.unit, yHeight: 4 * this.unit, elColor: this.mouseColorP, cs: 0},
                        //wings
                        {xPos: this.leftCenter - this.unit * 7, yPos: this.topPos + 15 * this.unit, xWidth: 15 * this.unit, yHeight: this.unit, elColor: this.mouseColorP, cs: 0},
                        {xPos: this.leftCenter - 7 * this.unit, yPos: this.topPos + 10 * this.unit, xWidth: this.unit, yHeight: 2* this.unit, elColor: this.mouseColorS, cs: 1},
                        {xPos: this.leftCenter + 7 * this.unit, yPos: this.topPos + 10 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS, cs: 1},
                        {xPos: this.leftCenter - 7 * this.unit, yPos: this.topPos + 12 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP, cs: 0},
                        {xPos: this.leftCenter + 7 * this.unit, yPos: this.topPos + 12 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP, cs: 0},
                        {xPos: this.leftCenter - 4 * this.unit, yPos: this.topPos + 9 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP, cs: 0},
                        {xPos: this.leftCenter + 4 * this.unit, yPos: this.topPos + 9 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorP, cs: 0},
                        {xPos: this.leftCenter - 4 * this.unit, yPos: this.topPos + 7 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS, cs: 1},
                        {xPos: this.leftCenter + 4 * this.unit, yPos: this.topPos + 7 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS, cs: 1},
                        //back
                        {xPos: this.leftCenter, yPos: this.topPos+ 17 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorP, cs: 0},//tail
                        {xPos: this.leftCenter - 2 * this.unit, yPos: this.topPos + 16 * this.unit, xWidth: 5 * this.unit, yHeight: this.unit, elColor: this.mouseColorP, cs: 0},
                        {xPos: this.leftCenter - 2 * this.unit, yPos: this.topPos + 15 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorS, cs: 1},
                        {xPos: this.leftCenter + 2 * this.unit, yPos: this.topPos + 15 * this.unit, xWidth: this.unit, yHeight: 3 * this.unit, elColor: this.mouseColorS, cs: 1},
                        {xPos: this.leftCenter - 3 * this.unit, yPos: this.topPos + 16 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS, cs: 1},
                        {xPos: this.leftCenter + 3 * this.unit, yPos: this.topPos + 16 * this.unit, xWidth: this.unit, yHeight: 2 * this.unit, elColor: this.mouseColorS, cs: 1}];
  this.colorInput = function(){
    if (scrollColor != this.rainbowIndex){
      this.rainbowIndex = scrollColor;
      this.mouseColorP = colorRay[this.rainbowIndex];
      if (this.rainbowIndex + 382 >= 765){
        this.mouseColorS = colorRay[765 - this.rainbowIndex - 382];
      } else {
        this.mouseColorS = colorRay[382 + this.rainbowIndex];
      }
    }
  }

  this.staticShipRender = function(){
    this.colorInput();
    //this.selectedColorHighlight();
    var tempC;
    if (this.frameCount % 3 == 0){
      for (var i = 0; i < this.staticRectPos.length; i++){
          this.staticRectPos[i].elColor = colorRay[Math.round(Math.random() * 764)];//this.mouseColorP;
      }
    }
    this.staticRectPos.forEach(function(el){
      ctx.beginPath();
      ctx.rect(el.xPos, el.yPos, el.xWidth, el.yHeight);
      ctx.strokeStyle = colorRay[scrollColor];
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.closePath();
    })

    this.staticRectPos.forEach(function(el){
      ctx.beginPath();
      ctx.rect(el.xPos, el.yPos, el.xWidth, el.yHeight);
      ctx.fillStyle = el.elColor;
      ctx.fill();
      ctx.closePath;
    });
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
    if (l == true){
      this.Xcenter -= 5;
    }
    if (u == true){
      this.Ycenter -= 5;
    }
    if (r == true){
      this.Xcenter += 5;
    }
    if (d == true){
      this.Ycenter += 5;
    }
    this.staticRectPos.forEach(function(el){
      if (l == true){
        el.xPos -= 5;
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
  /*  if (this.Xcenter + this.thewidth/2 >= canvas.width){
      this.staticRectPos.forEach(function(el){
        el.xPos -= 10;
      });
    }
    if (this.Xcenter - this.thewidth/2 <= 0){
      this.staticRectPos.forEach(function(el){
        el.xPos -= 10;
      });
    }
    */
  }

  this.selectedColorHighlight = function(){
  ctx.beginPath();
  ctx.arc(this.Xcenter, this.Ycenter + this.theheight/2 * this.unit + (this.unit), this.thewidth * this.unit, 0, Math.PI*2)
  //ctx.globalAlpha = 0.2;
  ctx.fillStyle = 'red';//this.mouseColorP;
  ctx.fill();
  //ctx.globalAlpha = 1;
  ctx.closePath();
  //console.log(this.Xcenter);
  }


  this.exhaustColors = [];

  this.initExhaust = function(){
    for (var i = 0; i < 20; i++){
      var xDirection = (Math.random() * 10) - 5;
      var yDirection = (Math.random() * 10) - 5;
      var alphSpeed = Math.random() * -0.1;
      this.exhaustColors.push({xPos: 0, yPos: 0, xD: xDirection, yD: yDirection, elColor: 'red', alpha: 1, alphaSpeed: alphSpeed})
    }
  }
  this.updateExhaust = function(){
    //console.log(this.Xcenter + this.exhaustColors[2].yPos)
    this.exhaustColors.forEach(function(el){
      el.xPos += el.xD * vel.speed;
      el.yPos += el.yD * vel.speed;
      el.alpha += el.alphaSpeed;
      /*
      if (el.alpha <= 0){
        el.xPos = 0;
        el.yPos = 0;
        el.alpha = 1;
      }*/
    });
  }

  var testParticle = {xPos: 0, yPos: 0, xD: 0, yD: 1, elColor: 'red', alpha: 1};
  this.renderExhaust = function(){
    ctx.beginPath();
    ctx.rect(this.Xcenter + testParticle.xPos -this.unit/2, this.Ycenter + testParticle.yPos + (this.theheight * this.unit), this.unit, this.unit);
    ctx.fillStyle = colorRay[scrollColor];
    ctx.globalAlpha = testParticle.alpha;
    ctx.fill();
    ctx.closePath();
    testParticle.yPos += vel.speed * 10;
    testParticle.alpha -= 1;
    if (testParticle.yPos >= vel.speed * 100){
      testParticle.yPos = 0;
      testParticle.alpha = 1;
    }
    ctx.globalAlpha = 1;
    this.updateExhaust();
    this.exhaustColors.forEach(function(el){
      ctx.beginPath();
      ctx.globalAlpha = el.alpha;
      ctx.rect(el.xPos + this.Xcenter -this.unit/2, el.yPos + this.Ycenter + (this.theheight * this.unit), this.unit/2, this.unit);
      ctx.fillStyle = el.elColor;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.closePath();
    });
  }
  this.update = function(){
    this.frameCount++;
    this.updatePos(l, u, r, d);
    this.updateGFX();
  }
  this.updateGFX = function(){
    this.renderExhaust();
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
testChar.initExhaust();

testChar.Ycenter = canvas.height/2;
