var express=require('express');
var app=express();
var user=require('./router/user');

app.use('/user',user);



//監聽port
var port=process.env.PORT||3000;
app.listen(port);