const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/send.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('chat message', msg);
  });
  socket.on('ping', function () {
    socket.emit('pong');
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('ping', function () {
    socket.emit('pong');
  });
});


http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});