var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
// var multer = require('multer');//用来上传文件的包，还没安装

var models = require('./models')
var User = models.User;

mongoose.connect('mongodb://localhost/BISHE');
console.log("database connected!")


var app = express();
// app.set('trust prox', 1)
app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie:{ 
        maxAge: 600000000,
        secure : true
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(multer());   //模块加载顺序问题  放到app.get。。。这些之前就可以了
// init data. Use "get" to simplify  上传文件包 

app.get('/', function (req, res) {
    res.send('Hello World')
});



// 注册写入数据库
app.post('/signUp', function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        userimg:  req.body.userimg
    });
    User.findOne({"username":user.username},function(err,doc){
        if(err){
            res.json({
                result:'FAIL',
                err:err
            });
        }else if(doc !== null){
            res.json({
                result:'FAIL',
                err:'user already exist!'
            });
        }else if(doc === null){
            user.save();
            res.json({
                result:'SUCCESS'
            });
        }
    });
});


//登陆
app.post('/signIn',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({"username":req.body.username},function(err,doc){
        if(doc == null){
            res.json({
                result:'FAIL',
                msg:'user not exist!',
                session:req.session
            });
        }else if(doc.password != password){
            res.json({
                result:'FAIL',
                msg:'uncorrect password!',
                session:req.session
            });
        }else{
            req.session.user = doc;
            res.json({
                result:'SUCCESS',
                session:req.session
                
            });
            req.session.save();
        }
    });
});

//登出
app.get('/signOut',function(req,res){
    // if(!req.session.user){
        req.session = null;
        res.json({
            result:'SUCCESS',
            // msg:'user havent sign in!',
            data:req.session
        });
    // }else{
        // req.session.destory();
    // }
});

// 用户名查询
app.post('/searchUser', function (req, res) {
    User.findOne({"username":req.body.username},function(err,doc){
        if(err){
            res.json({
                result:'FAIL',
                err:err
            });
        }else if(doc !== null){
            res.json({
                result:'SUCCESS',
                data:doc
            });
        }else if(doc === null){
            res.json({
                result:'FAIL',
                msg:'user not exist'
            });
        }
    });
});

// 所有用户
app.get('/allUsers',function(req,res){
    User.find({},function(err,docs){
        res.json({
            result:'SUCCESS',
            data:docs
        });
    });
});


app.listen(3000, () => {
    console.log('app listening on port 3000.')
})