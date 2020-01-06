var express=require('express');
var app=express();
//console.log(app);


app.use(express.static('public'));

app.use(function(req,res,next){
    console.log('有人登入');
    next();
})
var engine=require('ejs-locals');
app.engine('ejs',engine);
//設定樣板在views 資料夾
app.set('views','./views');
//設定使用樣板
app.set('view engine','ejs');


app.get('/',function(req,res){
    // res.send('index.html');
    // res.send(/index.html);
    res.render('index',{'show':false,
    'title':'<h1>Benny</h1>',
     'BOSS':'Benny',
     'course':['lin','KK','YOYO']});
})
app.get('/user',function(req,res){
    // res.send('index.html');
    // res.send(/index.html);
    res.render('user');
})

//監聽port
var port=process.env.PORT||3000;
app.listen(port);