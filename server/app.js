var express = require('express')
var mongoose = require('mongoose')

var bodyParser = require('body-parser');
// var multer = require('multer');

var models = require('./models')
var User = models.User;

mongoose.connect('mongodb://localhost/BISHE');
console.log("database connected!")


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(multer());   //模块加载顺序问题  放到app.get。。。这些之前就可以了
// init data. Use "get" to simplify 

app.get('/', function (req, res) {
  res.send('Hello World')
});




app.post('/init', function(req, res) { 
    var user = new User({ 
        username : req.body.username,
        password : req.body.password 
    }); 
    user.save(); 
    res.send('Data inited'); 
});

app.get('/users', function(req, res) { 
    User.find(function(err, doc) { 
        res.json(doc); 
    }); 
});
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})