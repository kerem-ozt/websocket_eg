const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var roomsrv;

app.use(express.static('public'))
app.get('/', function(req, res) {
  res.send('./public/index.html')
})
app.get('/oda2', function(req, res) {
  res.send('./public/index2.html')
})

io.on('connection', (socket) => {

  console.log('a user connected', socket.id);
  
  socket.on('create', function (room) {
    roomsrv = room;
    socket.join(room);
    console.log(`room ${room} was created`);
    console.log(io.sockets.adapter.rooms)
    io.sockets.in(room).emit('connectToRoom', "You are in "+room);
  });
  
  socket.on('chat', data => {
    console.log('2:',data)
    //io.sockets.emit('chat', data)
    io.sockets.in(roomsrv).emit('chat', data);
  })

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
