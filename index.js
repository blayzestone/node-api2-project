const express = require("express");

const server = express();

server.use(express.json());

const postsRoute = require("./posts/postsRoute");

server.use("/api/posts", postsRoute);

server.listen(8000, () => {
  console.log(`\n Listening on port 8000 \n`);
});