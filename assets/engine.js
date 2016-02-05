$(document).ready(function(){
  for (var i = 0; i < 1000; i++){
    updateStars();
  }
});

function engine(){
  ahora = Date.now();
  updateStars();
  testChar.updateGFX();
}

setInterval(engine, 20);
