var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

var useronline = {};



app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news',  'hello world' );
  socket.on('connected', function (data) {
    console.log(data);
    console.log(socket);
  });
});