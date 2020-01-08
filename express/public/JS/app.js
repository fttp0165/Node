var context=document.getElementById("context");
var send=document.getElementById("send");
//console.log("is OK");

send.addEventListener('click',function(e){
    e.preventDefault();
    var str = context.value;
    console.log(str);
 })