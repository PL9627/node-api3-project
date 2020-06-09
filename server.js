const express = require("express");

const server = express();

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.ip} ${req.method} ${req.url}`);

  next();
}

module.exports = server;
