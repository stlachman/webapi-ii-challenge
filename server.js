const express = require("express");

const server = express();

const postRoutes = require("./api/posts-router.js");

server.use(express.json());

server.use("/api/posts", postRoutes);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog</h>
    <p>Welcome to the Lambda Blog</p>
  `);
});

module.exports = server;
