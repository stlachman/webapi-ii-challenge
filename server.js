const express = require("express");
const cors = require("cors");
const server = express();

const postRoutes = require("./api/posts-router.js");

server.use(express.json());
server.use(cors());

server.use("/api/posts", postRoutes);

module.exports = server;
