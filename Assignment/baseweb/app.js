import http from "http";
import { router } from "./src/router/Router.js";

const hostname = "127.0.0.1";
const port = 3000;
export const baseURL = `http://${hostname}:${port}/`;

// create server
const server = http.createServer((req, res) => {
  try {
    router(req, res);
  } catch (e) {
    console.log(e);
  }
});

// start server on port 3000
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
