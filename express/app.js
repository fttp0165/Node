var express=require('express');
var app=express();
var engine=require('ejs-locals');
app.engine('ejs',engine);
//console.log(app);
var bodyParser=require('body-parser');

//增加靜態檔案路徑
app.use(express.static('public'));

//增加body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
{extended:false}))



app.use(function(req,res,next){
    console.log('有人登入');
    next();
})


app.get('/',function(req,res){
    // res.send('index.html');
     res.send('進入首頁');
})

app.get('/search',function(req,res){
   res.render('search');
})
app.post('/searchList',function(req,res){
    console.log(req.body);
    //顯示searchText 的值
    //console.log(req.body.searchText);
    //轉址
    res.redirect('search');
    //由路由決定轉址 /searchList
    //res.render('search');
})

app.post('/searchAJAX',function(req,res){
    console.log(req.body);
    res.send('hello');
    
    //顯示searchText 的值
    console.log(req.body.searchList);
    //轉址
   // res.redirect('search');
    //由路由決定轉址 /searchList
    //res.render('search');
})

//設定樣板在views 資料夾
app.set('views','./views');
//設定使用樣板
app.set('view engine','ejs');


// app.get('/',function(req,res){
//     // res.send('index.html');
//     // res.send(/index.html);
//     res.render('index',{'show':false,
//     'title':'<h1>Benny</h1>',
//      'BOSS':'Benny',
//      'course':['lin','KK','YOYO']});
// })



// app.get('/user',function(req,res){
//     // res.send('index.html');
//     // res.send(/index.html);
//     res.render('user');
// })

//監聽port
var port=process.env.PORT||3000;
app.listen(port);