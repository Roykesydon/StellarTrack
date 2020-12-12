let c = document.getElementById("myCanvas");
let earth = c.getContext("2d");
let pole = c.getContext('2d');
let Northline = c.getContext('2d');
let Southline = c.getContext('2d');
let Equator = c.getContext('2d');
function update(){
    if(choose_season==0) {
        earth.beginPath();
        earth.arc(200, 200, 150 ,0, 2*Math.PI, false);
        earth.strokeStyle = "white";
        earth.lineWidth = 2;
        earth.stroke();
        pole.beginPath();
        pole.lineWidth = 2;
        pole.strokeStyle = "white";
        pole.moveTo(200,0);
        pole.lineTo(200,400);
        pole.stroke();
        Northline.beginPath();
        Northline.lineWidth = 2;
        Northline.strokeStyle = "white";
        Northline.moveTo(60, 145);
        Northline.lineTo(339, 145);
        Northline.stroke();
        Equator.beginPath();
        Equator.lineWidth = 2;
        Equator.strokeStyle = "red";
        Equator.moveTo(50, 200);
        Equator.lineTo(350, 200);   
        Equator.stroke();
        Southline.beginPath();
        Southline.lineWidth = 2;
        Southline.strokeStyle = "white";
        Southline.moveTo(60, 255);
        Southline.lineTo(339, 255);
        Southline.stroke();
    }
    else if(choose_season==1){
        earth.beginPath();
        earth.arc(200, 200, 150 ,0, 2*Math.PI, false);
        earth.strokeStyle = "white";
        earth.lineWidth = 2;
        earth.stroke();
        pole.beginPath();
        pole.lineWidth = 2;
        pole.strokeStyle = "white";
        pole.moveTo(200,0);
        pole.lineTo(200,400);
        pole.stroke();
        Northline.beginPath();
        Northline.lineWidth = 2;
        Northline.strokeStyle = "red";
        Northline.moveTo(60, 145);
        Northline.lineTo(339, 145);
        Northline.stroke();
        Equator.beginPath();
        Equator.lineWidth = 2;
        Equator.strokeStyle = "white";
        Equator.moveTo(50, 200);
        Equator.lineTo(350, 200);
        Equator.stroke();
        Southline.beginPath();
        Southline.lineWidth = 2;
        Southline.strokeStyle = "white";
        Southline.moveTo(60, 255);
        Southline.lineTo(339, 255);
        Southline.stroke();
    }
    else if(choose_season==2){
        earth.beginPath();
        earth.arc(200, 200, 150 ,0, 2*Math.PI, false);
        earth.strokeStyle = "white";
        earth.lineWidth = 2;
        earth.stroke();
        pole.beginPath();
        pole.lineWidth = 2;
        pole.strokeStyle = "white";
        pole.moveTo(200,0);
        pole.lineTo(200,400);
        pole.stroke();
        Northline.beginPath();
        Northline.lineWidth = 2;
        Northline.strokeStyle = "white";
        Northline.moveTo(60, 145);
        Northline.lineTo(339, 145);
        Northline.stroke();
        Equator.beginPath();
        Equator.lineWidth = 2;
        Equator.strokeStyle = "white";
        Equator.moveTo(50, 200);
        Equator.lineTo(350, 200);
        Equator.stroke();
        Southline.beginPath();
        Southline.lineWidth = 2;
        Southline.strokeStyle = "red";
        Southline.moveTo(60, 255);
        Southline.lineTo(339, 255);
        Southline.stroke();
    }
}
