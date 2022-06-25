import http from "http";
import { router } from "./src/router/Router.js";

const hostname = "127.0.0.1";
const port = 8080;
export const baseURL = `http://${hostname}:${port}/`;

// create server
const server = http.createServer((req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    router(req, res);
    res.statusCode = 200;
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(e);
  }
});

// start server on port 8080
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
