// var createError = require('http-errors');
var express = require('express');
var engine=require('ejs-locals');
var bodyParser=require('body-parser');
var app = express();

//============================================

//firebase set

//============================================

var admin = require("firebase-admin");

var serviceAccount = require("./nodetest-741a5-firebase-adminsdk-6bfl1-de3c0fac7f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodetest-741a5.firebaseio.com"
});
//============================================



app.engine('ejs',engine);
//設定樣板在views 資料夾
app.set('views','./views');
//設定使用樣板
app.set('view engine','ejs');

//增加靜態檔案路徑
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//增加body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//============================================


var fireData=admin.database();
// console.log(fireData);

//  fireData.ref('todos').once('value',function(snapshot){
//   console.log(snapshot.val());
// });

// fireData.ref('todos').set({'title':'hello'}).then(function(){
//   fireData.ref('todos').once('value',function(snapshot){
//     console.log(snapshot.val());
//   })
// });




//路由
app.get('/',function(req,res){
  fireData.ref('todos').once('value',function(snapshot){
    var data =snapshot.val();
    res.render('index',{"todolist":data});
   // console.log(data);
  })
  //  res.send('進入首頁');

})


//新增
app.post('/addTodo',function(req,res){
  var content=req.body.content;
  var contentRef=fireData.ref('todos').push();
  contentRef.set({"content":content}).then(function(){
    fireData.ref('todos').once('value',function(snapshot){
      res.send(
        {
          "success":true,
          "result":snapshot.val(),
          "message":"資料讀取成功"
        }
      );
    })
  })
})

// 刪除邏輯

app.post("/removeTodo",function(req,res){
  var _id=req.body.id;
  fireData.ref('todos').child(_id).remove()
  .then(function(){
    fireData.ref('todos').once('value',function(snapshot){
      res.send(
        {
          "sucess":true,
          "result":snapshot.val(),
          "message":"資料刪除成功"
        }
      )
    })
  })
})
var port=process.env.PORT||3000;
app.listen(port);