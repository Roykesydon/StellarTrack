

function start(){
    setInterval(function(){ $("#rightStar").fadeToggle(2000);
    $("#leftStar").fadeToggle(2000); }, 2000);
}

window.addEventListener("load",start,false);