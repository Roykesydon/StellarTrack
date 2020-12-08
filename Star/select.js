let flag;
let choose_season=0;
let city;
function disConutry(){
    flag=0;
    document.getElementById("choose1").style.display="none";
    document.getElementById("choose2").style.display="block";
}
function disLoc(){
    flag=1;
    document.getElementById("choose1").style.display="block";
    document.getElementById("choose1").innerHTML="<select name='country' id='country'>"+"<option value='Taiwan'>台灣 台北</option>"+
    "<option value='America'>美國 華盛頓哥倫比亞特區</option>"+"<option value='England'>英國 倫敦</option>"+"<option value='Australia'>澳洲 坎培拉</option>"
    +"<option value='Singapore'>新加坡 新加坡市</option></select>";
    document.getElementById("choose2").style.display="none";
}
function show_spring(){
    choose_season=0;
}
function show_summer(){
    console.log('show_summer!')
    choose_season=1;
    console.log('choose_season '+choose_season);
}
function show_winter(){
    choose_season=2;
}
function connect(){
    remove_line();
    remove_sun();
    remove_house();
    remove_ground();
    let country;
    let la;
    if(flag) {
        country=document.getElementById("country").value;
        if(country=="Taiwan") la=23.5;
        else if(country=="America") la=40;
        else if(country=="England") la=50;
        else if(country=="Australia") la=-35;
        else if(country=="Singapore") la=0;
        city=country;
    }
    else if(!flag) {
        la=parseInt(document.getElementById("latitude").value);
        // document.getElementById("latitude").value="";
        city="default";
    }
    document.getElementById("result").innerHTML=la;
    createline(la);
    console.log('choose_season '+choose_season);
    console.log('city '+city);
    create_sun(la,choose_season,city);
} 
function getLocation(){
    remove_line();
    remove_sun();
    remove_house();
    remove_ground();
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        document.getElementById("result").innerHTML="Geolocation is not supported by this browser.";
    }
}
function showPosition(position){
    document.getElementById("result").innerHTML="緯度: " + position.coords.latitude.toFixed(1) + 
    "<br />經度: " + position.coords.longitude.toFixed(1);
    createline(position.coords.latitude.toFixed(1));
    create_sun(position.coords.latitude.toFixed(1),choose_season,"default")	
}