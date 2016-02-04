$(document).ready(function(){
  for (var i = 0; i < 2000; i++){
    updateStars();
  }
});
function engine(){
  updateStars();
  testChar.updateGFX();
}

setInterval(engine, 20);
