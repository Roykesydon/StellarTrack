let flag;
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
function connect(){
    remove_line();
    let country;
    let la;
    if(flag) {
        country=document.getElementById("country").value;
        if(country=="Taiwan") la=23.5;
        else if(country=="America") la=40;
        else if(country=="England") la=50;
        else if(country=="Australia") la=-35;
        else if(country=="Singapore") la=0;
    }
    else if(!flag) {
        la=parseInt(document.getElementById("latitude").value);
        document.getElementById("latitude").value="";
    }
    document.getElementById("result").innerHTML=la;
    createline(la);
} 