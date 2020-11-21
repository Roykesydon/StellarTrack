var country;
var long;
var la;
function disConutry(){
    document.getElementById("choose1").style.display="none";
    document.getElementById("choose2").style.display="inline";
}
function disLoc(){
    document.getElementById("choose1").style.display="inline";
    document.getElementById("choose2").style.display="none";
}
function B(){
    country=document.getElementById("country").value;
    long=document.getElementById("longitude").value;
    la=document.getElementById("latitude").value;
    if(country!="NULL"){
        document.getElementById("result").innerHTML=country;

    }    
    else document.getElementById("result").innerHTML=long+" "+la;
    document.getElementById("country").value=NULL;
} 
