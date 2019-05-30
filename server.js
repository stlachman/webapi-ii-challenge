const express = require("express");
const cors = require("cors");
const server = express();

const postRoutes = require("./api/posts-router.js");

server.use(express.json());
server.use(cors());

server.use(express.static(path.join(__dirname, "client/build")));

server.use("/api/posts", postRoutes);

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = server;
