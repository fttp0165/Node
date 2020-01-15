var context=document.getElementById("context");
var send=document.getElementById("send");
//console.log("is OK");

send.addEventListener('click',function(e){
    e.preventDefault();//終止原本表單 submit 行為
    var str = context.value;
    console.log(str);
    
    //開啟XML設定
    var xhr=new XMLHttpRequest();
    xhr.open('post','/searchAJAX');
    // 設定取得資料格式
    
    xhr.setRequestHeader("Content-type",
    "application/x-www-form-urlencoded");
    //content=1234&title=hello
    //將資料格式送出去
    var data='context='+str;
    xhr.send(data);
    //console.log(data);
    //接資料回來
    xhr.onload=function(){
        console.log(xhr.responseText);
    }

 })