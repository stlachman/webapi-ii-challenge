const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog</h>
    <p>Welcome to the Lambda Blog</p>
  `);
});

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
