// Imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')
const users = require('./routes/users');
const posts = require('./routes/posts');
const jwt = require('jsonwebtoken');

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Promise libary
mongoose.Promise = require('bluebird');

// Connect To Database
mongoose.connect(config.database, {
  useMongoClient: true
});

// On Connection
mongoose.connection.on('connected', () => {
  //console.log('Connected to database ' + config.database)
  console.log('Connected to database ' + config.database)
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error : ' + err);
});

// CORS Middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Set Static Folder
app.use(express.static(path.join(__dirname, './angular-src/dist')));

app.use('/users', users);
app.use('/posts', posts);

// Start Server
const port = 3000;
server.listen(port, () => {
  console.log('Server startet on port ' + port);
});

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './angular-src/dist/index.html'));
});

// IO Connection
io.use(function(socket, next){
  // Authentication
  if (socket.handshake.query && socket.handshake.query.token){
    // todo : token has "JWT " infront of it - dosent work withit here, why elsewhere?
    jwt.verify(socket.handshake.query.token.substring(4), 'My Secret', function(err, decoded) {
      if(err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  }
  next(new Error('Authentication error'));
})

// Connection now authenticated to receive further events
.on('connection', function(socket) {
  console.log('new socket connection established')

  // Broadcast new message upon reciving one
  // todo : save msg to database send as object (user, msg, date)
  socket.on('send message', function (data) {
    io.emit('receive message', {text : data});
  });
});



module.exports = app; // export for testing
