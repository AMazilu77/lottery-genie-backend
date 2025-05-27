require('dotenv').config({ path: '.env' });
console.log("JWT_KEY in startup:", process.env.JWT_KEY);

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const debug = require("debug")("node-angular");

const postsRoutes = require("./routes/posts");
const userRoutes = require('./routes/user');
const winningRoute = require('./routes/index');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
  console.log('Djinn has connected to the railway database');
}).catch((err) => {
  console.log(err, 'No Connection!! Mongo database failed!');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/winning", winningRoute);

// app.use(express.static(__dirname + '/dist/The-Lottery-Djinni'));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/dist/The-Lottery-Djinni/index.html'));
// });

const normalizePort = val => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : (port >= 0 ? port : false);
};

const port = normalizePort(process.env.PORT || '3000');
app.set("port", port);

const server = http.createServer(app);

server.on("error", error => {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
});

server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  console.log(`Server running on ${bind}`);
});

server.listen(port);
