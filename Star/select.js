var flag;
function disConutry(){
    flag=0;
    document.getElementById("choose1").style.display="none";
    document.getElementById("choose2").style.display="block";
}
function disLoc(){
    flag=1;
    document.getElementById("choose1").style.display="block";
    document.getElementById("choose1").innerHTML="<select name='country' id='country'>"+"<option value='Taiwan'>台灣</option>"+
    "<option value='America'>美國</option>"+"<option value='England'>英國</option>"+"<option value='Australia'>澳洲</option></select>";
    document.getElementById("choose2").style.display="none";
}
function connect(){
    let country;
    let long;
    let la;
    if(flag) {
        country=document.getElementById("country").value;
        document.getElementById("result").innerHTML=country;
    }
    else if(!flag) {
        long=parseInt(document.getElementById("longitude").value);
        la=parseInt(document.getElementById("latitude").value);
        document.getElementById("longitude").value="";
        document.getElementById("latitude").value="";
        document.getElementById("result").innerHTML=long+" "+la;
    }
} 