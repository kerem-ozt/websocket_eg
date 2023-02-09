const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log(msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });

app.get('/', (req, res) => {
  res.sendFile( __dirname +'/public/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});