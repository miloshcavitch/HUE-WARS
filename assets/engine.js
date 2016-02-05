var canvRect = canvas.getBoundingClientRect();
var l, u, r, d;
$(document).ready(function(){
  for (var i = 0; i < 1000; i++){
    updateStars();
  }
  $(document).on("mousemove", function(){
    canvRect = canvas.getBoundingClientRect();
    var xValue =event.pageX;
    if (xValue >= canvRect.left && xValue <= canvRect.right){
      charColorIndex =  Math.round((Math.abs(canvRect.left - xValue)/canvas.width * 765));
    }
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

      default: return;
    }
    e.preventDefault();
  });
});

function engine(){
  ahora = Date.now();
  updateStars();
  testChar.update();
}

setInterval(engine, 20);
