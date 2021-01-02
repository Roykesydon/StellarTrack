let flag;
let choose_season=0;
let city="default";
let la="23.5";
function disConutry(){
    flag=0;
    document.getElementById("choose1").style.display="none";
    document.getElementById("choose2").style.display="block";
}
$(document).ready(function(){
    $("#button1").click(function(){
        $("#choose1").empty();
        $("#choose1").append("<select name='country' id='country'>");
        $.getJSON("https://roykesydon.github.io/StellarTrack/Star/country.json", function(result){
            $.each(result, function(i, field){
                $("select").append("<option value='"+i+"'>"+field+"</option>");
            });
        });
        // $("#choose1").append("  <div class='dropdown'>\
        // <button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' id='selected_list'>\
        //   Dropdown button\
        // </button><div class='dropdown-menu' name='country' id='country'>");
        // $.getJSON("https://roykesydon.github.io/StellarTrack/Star/country.json", function(result){
        //     $.each(result, function(i, field){
        //         $("#country").append("<a class='dropdown-item' value='"+i+"'  >"+field+"</a>");
        //     });
        // });
    $("#choose1").append("</div></div>");
    flag=1;
    $("#choose1").css("display", "block");
    $("#choose2").css("display", "none");
    /*document.getElementById("choose1").style.display="block";
    document.getElementById("choose1").innerHTML="<select name='country' id='country'>"+"<option value='Taiwan'>台灣 台北</option>"+
    "<option value='England'>英國 倫敦</option>"+"<option value='Egypt'>埃及 開羅</option>";
    document.getElementById("choose2").style.display="none";*/
    });
});
function show_spring(){
    choose_season=0;
}
function show_summer(){
    console.log('show_summer!');
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
    
    if(flag==1) {
        country=document.getElementById("country").value;
        if(country=="Taiwan") la=23.5;
        // else if(country=="America") la=40;
        else if(country=="England") la=50;
        else if(country=="Egypt") la=30;
        // else if(country=="Singapore") la=0;
        city=country;
    }
    else if(flag==0) {
        la=parseInt(document.getElementById("latitude").value);
        //document.getElementById("latitude").value="";
        city="default";
    }
    document.getElementById("result").innerHTML="<br>緯度:"+la;
    if(choose_season==0) document.getElementById("result").innerHTML+="<br>你現在選的季節是:<font style='color:red'>春秋</font>";
    if(choose_season==1) document.getElementById("result").innerHTML+="<br>你現在選的季節是:<font style='color:red'>夏</font>";
    if(choose_season==2) document.getElementById("result").innerHTML+="<br>你現在選的季節是:<font style='color:red'>冬</font>";
    createline(la);
    update();
    console.log('choose_season '+choose_season);
    console.log('city '+city);
    create_sun(la,choose_season,city);
    let M=90-la;
    document.getElementById("myCanvas").style.transform="rotate("+M+"deg)";
} 
function getLocation(){
    navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position){
    document.getElementById("result").innerHTML="<br>當前座標:緯度: " + position.coords.latitude.toFixed(1) + 
    "<br />經度: " + position.coords.longitude.toFixed(1)+"<br> 按下Present以顯示當前位置太陽軌跡圖";
    la=position.coords.latitude.toFixed(1);
    flag=2;
    city="default";
    document.getElementById("choose1").style.display="none";
    document.getElementById("choose2").style.display="none";
}
function light_number(){
    document.getElementById("button").innerHTML=(document.getElementById("luminance").value/100).toFixed(2);
}