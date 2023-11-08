const express = require('express');
const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server);

const cors = require('cors');

const PORT = 3001;

const router = require('./router');



app.use(cors());
app.use(express.json());
//app.use(router);


app.get('/', (req, res) => {
  res.send('<h1>Helou Güorld</h1>');
});



server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

// server needs to be exported for the tests to work
module.exports = server;
