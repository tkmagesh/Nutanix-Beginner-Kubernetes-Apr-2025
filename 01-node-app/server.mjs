// server.mjs
import { createServer } from "node:http";
import { hostname } from "node:os";
const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Hello World from ${hostname()}! - [Ver 2.0]\n`);
});

// starts a simple http server locally on port 3000
server.listen(3000,  () => {
  console.log("Listening on localhost:3000");
});
