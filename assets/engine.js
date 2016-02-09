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
        case 37: // left
        l = true;
        break;

        case 38:
        u = true; // up
        break;

        case 39:
        r = true; // right
        break;

        case 40:
        d = true; // down
        break;

        case 87:
        i = true;
        break;

        case 83:
        d = true;
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  $(document).keyup(function(e){
    switch(e.which){
      case 37:
      l = false;
      break;

      case 38:
      u = false;
      break;

      case 39:
      r = false;
      break;

      case 40:
      d = false;
      break;

      case 87:
      i = false;
      break;

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
function engine(){
  ahora = Date.now();
  vel.mouseSpeed(mouseX);
  vel.incrementCount();
  updateStars();
  testChar.update();
}

setInterval(engine, 20);
