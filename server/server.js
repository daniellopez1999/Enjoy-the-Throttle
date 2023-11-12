const express = require('express');
const app = express();
const router = require('./router.js')
const cookieParser = require('cookie-parser');
const http = require('http');
const session = require('express-session');
const { Server } = require('socket.io');

const cors = require('cors');
const corsConfig = {
  // REMOVE-START
  origin: 'http://localhost:3000',
  credentials: true,
  // REMOVE-END
};
app.use(cors(corsConfig));
app.use(express.json());

app.use(session({
  name: 'token',
  saveUninitialized: false,
  resave: false,
  secret: 'secretTest',
  cookie: {
    maxAge: 1000*60*60*24,
    httpOnly: false,
    sameSite: true,
    secure: false,
  }
}));
app.use(express.json());
app.use(cookieParser())
app.use(router)


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"], //frontend URL PORT
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log('SOOOOOOOOCKET',data);
    io.emit('send_message', data);
  })
})





const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}!`)
})