var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
// var multer = require('multer');//用来上传文件的包，还没安装


var models = require('./models')
var User = models.User;
var Room = models.Room;
var api = require('./api')
mongoose.connect('mongodb://localhost/BISHE');
mongoose.Promise = global.Promise
console.log("database connected!")


var app = express();
// app.set('trust prox', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000000,
        secure: false
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(multer());   //模块加载顺序问题  放到app.get。。。这些之前就可以了
// init data. Use "get" to simplify  上传文件包 

app.use('/api', api)


// app.listen(3000, () => {
//     console.log('app listening on port 3000.')
// })
var io = require('socket.io').listen(app.listen(3000, () => {
    console.log('app listening on port 3000.')
}));


var map = {};
io.on('connection', function (socket) {
    // console.log(socket.id)
    socket.emit('news', 'hello world');

    socket.on('connected', function (data) {
        socket.username = data.username;
        // console.log(data);
        map[data.username] = socket.id;
        console.log(map);
        socket.emit('online', map);
        socket.broadcast.emit('online', map);

    });

    socket.on('disconnect', function (data) {
        console.log(socket.username + " " + "disconnect")
        delete map[socket.username];
        console.log(map)
        socket.broadcast.emit('online', map);

    });
    socket.on('v_disconnect',function(data){
        console.log(data + " " +"disconnect")
        delete map[socket.username];
        console.log(map)
        socket.broadcast.emit('online', map);
    })
    socket.on('sendmsg', function (data) {
        
        console.log(data)
        var id = map[data.to];
        if (id === undefined) {
            socket.emit('toast', '对方不在线!')
            console.log("发送失败")
        } else {
            socket.broadcast.to(id).emit('newmessage', {
                from: socket.username,
                to: data.to,
                msg: data.msg
            });
            console.log(data)
        }
        // socket.broadcast.emit('newmessage',{
        //     from:socket.username,
        //     to:data.to,
        //     msg:data.msg
        // })
    });
    socket.on('addFriend', function(data){
        var id = map[data];
        socket.broadcast.to(id).emit('newFriend',"you have new friend!")
    })
});

