var canvRect = canvas.getBoundingClientRect();
var l, u, r, d, i, d;
var scrollColor = 380;
var mouseX = 0;
var vel = new velocity();
$(document).ready(function(){
  for (var i = 0; i < 1000; i++){
    updateStars();
  }
  $(document).on("mousemove", function(){
    canvRect = canvas.getBoundingClientRect();
    var xValue = event.pageX;
    mouseX = event.pageX;
  });
  $(document).keydown(function(e) {
    switch(e.which) {
        case 65:
        case 37: // left
        l = true;
        break;

        case 87:
        case 38:
        u = true; // up
        break;

        case 68:
        case 39:
        r = true; // right
        break;

        case 40:
        case 83:
        d = true; // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  $(document).keyup(function(e){
    switch(e.which){
      case 65:
      case 37:
      l = false;
      break;

      case 87:
      case 38:
      u = false;
      break;

      case 39:
      case 68:
      r = false;
      break;

      case 40:
      case 83:
      d = false;
      break;

      default: return;
    }
    e.preventDefault();
  });
});
$('#myCanvas').bind('mousewheel', function(e){
    if(e.originalEvent.wheelDelta /120 > 0) {
        scrollColor += 10;
        if (scrollColor > 765){
          scrollColor = 10;
        }
        console.log(scrollColor);
    }
    else{
        scrollColor -= 10;
        if (scrollColor < 5){
          scrollColor = 760;
        }
        console.log(scrollColor);
    }
    e.preventDefault();
});
$('#myCanvas').click(function(){
  //testChar.lastShotFrame = testChar.frameCount;
  //testChar.renderGunshot();
  activeShots.push(new shot(testChar.Xcenter, testChar.Ycenter, 0, -12, scrollColor, 7, 'rainbow'));
});
function engine(){
  ahora = Date.now();
  vel.mouseSpeed(mouseX);
  vel.incrementCount();
  updateStars();
  shotsRender();
  testChar.update();
}

setInterval(engine, 20);
