const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog</h>
    <p>Welcome to the Lambda Blog</p>
  `);
});

module.exports = server;
