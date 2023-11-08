const express = require('express');
const app = express();

const http = require('http');
const { Server } = require('socket.io');

const cors = require('cors');
app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"] //frontend URL PORT
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_group", (data) => {
    socket.join(data) //data should be the id of the group
  })

  socket.on("send_message", (data) => {
    //socket.emit("receive_message", data)
    socket.to(data.group).emit("receive_message", data) //broadcast emits to everyone except yourself


  })
})





const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}!`)
})